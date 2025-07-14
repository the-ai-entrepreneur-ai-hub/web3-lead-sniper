const cron = require('node-cron');
const { addJobToQueue } = require('./queue');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

/**
 * Schedules automated lead ingestion jobs
 * Daily at 02:00 and Weekly on Mondays at 03:00
 */
function scheduleIngestion() {
  console.log('[Scheduler] Initializing automated scheduling...');

  // Daily ingestion at 02:00 (2 AM)
  cron.schedule('0 2 * * *', async () => {
    console.log('[Scheduler] Starting daily ingestion at', new Date().toISOString());
    try {
      await addJobToQueue('start-ingestion', { 
        type: 'daily',
        timestamp: new Date().toISOString()
      });
      console.log('[Scheduler] Daily ingestion job queued successfully');
    } catch (error) {
      console.error('[Scheduler] Error queuing daily ingestion:', error.message);
    }
  }, {
    scheduled: true,
    timezone: "UTC"
  });

  // Weekly ingestion on Mondays at 03:00 (3 AM)
  cron.schedule('0 3 * * 1', async () => {
    console.log('[Scheduler] Starting weekly ingestion at', new Date().toISOString());
    try {
      await addJobToQueue('start-ingestion', { 
        type: 'weekly',
        timestamp: new Date().toISOString()
      });
      console.log('[Scheduler] Weekly ingestion job queued successfully');
    } catch (error) {
      console.error('[Scheduler] Error queuing weekly ingestion:', error.message);
    }
  }, {
    scheduled: true,
    timezone: "UTC"
  });

  console.log('[Scheduler] Scheduled jobs:');
  console.log('  - Daily ingestion: 02:00 UTC');
  console.log('  - Weekly ingestion: Monday 03:00 UTC');
}

/**
 * Manually trigger ingestion (for testing/debugging)
 */
async function triggerManualIngestion() {
  console.log('[Scheduler] Triggering manual ingestion...');
  try {
    await addJobToQueue('start-ingestion', { 
      type: 'manual',
      timestamp: new Date().toISOString()
    });
    console.log('[Scheduler] Manual ingestion job queued successfully');
  } catch (error) {
    console.error('[Scheduler] Error queuing manual ingestion:', error.message);
    throw error;
  }
}

/**
 * Get status of scheduled jobs
 */
function getScheduleStatus() {
  const tasks = cron.getTasks();
  return {
    totalTasks: tasks.size,
    tasks: Array.from(tasks.entries()).map(([key, task]) => ({
      key,
      running: task.running,
      destroyed: task.destroyed
    }))
  };
}

module.exports = {
  scheduleIngestion,
  triggerManualIngestion,
  getScheduleStatus
};
