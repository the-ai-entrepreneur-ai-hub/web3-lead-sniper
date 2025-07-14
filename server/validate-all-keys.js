require('dotenv').config();
const axios = require('axios');

const validateCryptoRank = async () => {
  try {
    console.log('🔍 Testing CryptoRank API...');
    await axios.get(`https://api.cryptorank.io/v1/currencies?api_key=${process.env.CRYPTORANK_API_KEY}&limit=1`);
    console.log('✅ CryptoRank API key is valid.');
    return true;
  } catch (error) {
    console.error('❌ CryptoRank API key is invalid or has expired.');
    return false;
  }
};

const validateCoinMarketCap = async () => {
  try {
    console.log('🔍 Testing CoinMarketCap API...');
    await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1', {
      headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY }
    });
    console.log('✅ CoinMarketCap API key is valid.');
    return true;
  } catch (error) {
    console.error('❌ CoinMarketCap API key is invalid or has expired.');
    return false;
  }
};

const validateDappRadar = async () => {
  try {
    console.log('🔍 Testing DappRadar API...');
    await axios.get('https://dappradar.com/api/v2/dapps', {
      headers: {
        'X-BLOBR-KEY': process.env.DAPPRADAR_API_KEY,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
      }
    });
    console.log('✅ DappRadar API key is valid.');
    return true;
  } catch (error) {
    console.error('❌ DappRadar API key is invalid or the request was blocked.');
    return false;
  }
};

const validateHunterIO = async () => {
  try {
    console.log('🔍 Testing Hunter.io API...');
    await axios.get(`https://api.hunter.io/v2/account?api_key=${process.env.HUNTER_IO_API_KEY}`);
    console.log('✅ Hunter.io API key is valid.');
    return true;
  } catch (error) {
    console.error('❌ Hunter.io API key is invalid or has expired.');
    return false;
  }
};

const validateGemini = async () => {
  try {
    console.log('🔍 Testing Gemini API...');
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    await model.generateContent('Test');
    console.log('✅ Gemini API key is valid.');
    return true;
  } catch (error) {
    console.error('❌ Gemini API key is invalid or has expired.');
    return false;
  }
};

const validateAirtable = async () => {
  try {
    console.log('🔍 Testing Airtable API...');
    const Airtable = require('airtable');
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(process.env.AIRTABLE_BASE_ID);
    await base('Leads').select({ maxRecords: 1 }).firstPage();
    console.log('✅ Airtable API key and base are valid.');
    return true;
  } catch (error) {
    console.error('❌ Airtable API key or base ID is invalid.');
    return false;
  }
};

const validateWebScrapingTargets = async () => {
  const targets = [
    { name: 'ICODrops', url: 'https://icodrops.com/category/upcoming-ico/?filter_category=upcoming' },
    { name: 'Zealy', url: 'https://zealy.io/leaderboards' },
    { name: 'DAO Maker', url: 'https://daomaker.com/launchpad' },
    { name: 'Polkastarter', url: 'https://www.polkastarter.com/launchpad' }
  ];

  let allValid = true;
  for (const target of targets) {
    try {
      console.log(`🔍 Testing ${target.name} accessibility...`);
      await axios.get(target.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
        },
        timeout: 10000
      });
      console.log(`✅ ${target.name} is accessible.`);
    } catch (error) {
      console.error(`❌ ${target.name} is not accessible or blocked.`);
      allValid = false;
    }
  }
  return allValid;
};

const validateAllKeys = async () => {
  console.log('🚀 Validating all API keys and services...\n');
  
  const results = await Promise.all([
    validateCryptoRank(),
    validateCoinMarketCap(),
    validateDappRadar(),
    validateHunterIO(),
    validateGemini(),
    validateAirtable(),
    validateWebScrapingTargets()
  ]);

  const validCount = results.filter(Boolean).length;
  const totalCount = results.length;

  console.log('\n📊 Validation Summary:');
  console.log(`✅ Valid: ${validCount}/${totalCount}`);
  console.log(`❌ Invalid: ${totalCount - validCount}/${totalCount}`);

  if (validCount === totalCount) {
    console.log('\n🎉 All services are ready! You can start the lead ingestion process.');
  } else {
    console.log('\n⚠️  Some services are not available. Please check your API keys and network connectivity.');
  }

  process.exit(validCount === totalCount ? 0 : 1);
};

validateAllKeys();
