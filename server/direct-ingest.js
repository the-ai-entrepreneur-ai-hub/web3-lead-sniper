const puppeteer = require('puppeteer');
const { runAllScrapers } = require('./src/services/scrapers');
const { enrichLead } = require('./src/services/enrichment');
const { analyzeLead } = require('./src/services/ai');
const { createLead } = require('./src/services/airtable');

const run = async () => {
  console.log('🚀 Starting direct lead generation (bypassing Redis queue)...');
  
  let browser;
  try {
    // Launch browser
    console.log('🌐 Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Run scrapers
    console.log('📊 Running all scrapers...');
    const allProjects = await runAllScrapers();
    console.log(`📈 Found ${allProjects.length} total projects from all sources.`);

    // Filter valid projects
    const validProjects = allProjects.filter(project => 
      project.Website && project.Website !== 'N/A'
    );
    console.log(`✅ ${validProjects.length} projects have valid websites and will be processed.`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    // Process first 10 projects to avoid hitting rate limits
    const projectsToProcess = validProjects.slice(0, 10);
    console.log(`🎯 Processing first ${projectsToProcess.length} projects to avoid rate limits...`);

    for (let i = 0; i < projectsToProcess.length; i++) {
      const project = projectsToProcess[i];
      try {
        console.log(`\n[${i + 1}/${projectsToProcess.length}] Processing: ${project['Project Name']} (${project.Source})`);
        
        // Enrichment step
        console.log('  🔍 Enriching with LinkedIn and email data...');
        const enrichedLead = await enrichLead(project, browser);
        console.log(`  ✅ Enrichment complete - LinkedIn: ${enrichedLead.LinkedIn ? '✓' : '✗'}, Email: ${enrichedLead.Email ? '✓' : '✗'}`);
        
        // AI Analysis step
        console.log('  🤖 Analyzing with AI...');
        const analyzedLead = await analyzeLead(enrichedLead);
        
        // Check if AI analysis was successful
        if (analyzedLead['Lead Summary'] && !analyzedLead['Lead Summary'].startsWith('Error')) {
          console.log('  ✅ AI analysis complete');
          
          // Create in Airtable
          console.log('  💾 Saving to Airtable...');
          await createLead(analyzedLead);
          console.log(`  ✅ Successfully saved: ${project['Project Name']}`);
          successCount++;
        } else {
          console.log(`  ⚠️  Skipping ${project['Project Name']} - AI analysis failed`);
          skipCount++;
        }
        
        // Add delay to respect rate limits
        if (i < projectsToProcess.length - 1) {
          console.log('  ⏳ Waiting 3 seconds to respect rate limits...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        
      } catch (error) {
        console.error(`  ❌ Failed to process ${project['Project Name']}:`, error.message);
        errorCount++;
      }
    }

    // Final summary
    console.log('\n📊 Pipeline Summary:');
    console.log(`  Total projects found: ${allProjects.length}`);
    console.log(`  Valid projects: ${validProjects.length}`);
    console.log(`  Processed: ${projectsToProcess.length}`);
    console.log(`  Successfully saved: ${successCount}`);
    console.log(`  Skipped (AI failed): ${skipCount}`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`  Success rate: ${((successCount / projectsToProcess.length) * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Pipeline error:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
    console.log('\n🏁 Direct ingestion completed.');
    process.exit(0);
  }
};

run().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
