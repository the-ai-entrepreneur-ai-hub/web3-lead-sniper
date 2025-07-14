# Web3 Data Aggregator - Enhanced Backend

A fully automated Web3 lead generation system that scrapes data from 7 sources, enriches it with contact information, analyzes it with AI, and stores everything in Airtable.

## 🚀 Features

- **7 Data Sources**: CryptoRank, CoinMarketCap, DappRadar, ICODrops, Zealy, DAO Maker, Polkastarter
- **Smart Deduplication**: Domain-based duplicate detection
- **Contact Enrichment**: LinkedIn profiles and email addresses via Hunter.io
- **AI Analysis**: Project summaries and competitor analysis via Gemini
- **Automated Scheduling**: Daily and weekly data collection
- **Free Tier Optimized**: Stays within free limits of all services

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **Redis** server running
3. **API Keys** for all services (see `.env` file)

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Validate all API keys
npm run validate-all
```

## 🔧 Configuration

Ensure your `.env` file contains all required API keys:

```env
AIRTABLE_API_TOKEN=your_token
AIRTABLE_BASE_ID=your_base_id
GEMINI_API_KEY=your_key
COINMARKETCAP_API_KEY=your_key
CRYPTORANK_API_KEY=your_key
DAPPRADAR_API_KEY=your_key
HUNTER_IO_API_KEY=your_key
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 🚀 Usage

### Option 1: Automated System (Recommended)

1. **Start the main server** (includes scheduler):
   ```bash
   npm start
   ```

2. **Start the worker** (in a separate terminal):
   ```bash
   npm run worker
   ```

The system will automatically run:
- **Daily** at 02:00 UTC
- **Weekly** on Mondays at 03:00 UTC

### Option 2: Manual Execution

Run the complete pipeline once:
```bash
npm run ingest
```

### Option 3: API Triggers

Trigger ingestion via API:
```bash
curl -X POST http://localhost:3006/api/v1/leads/start-ingestion
```

## 📊 Data Flow

```
Scrapers → Data Normalization → Enrichment → AI Analysis → Airtable Storage
```

1. **Scrapers**: Collect data from 7 Web3 sources
2. **Normalization**: Standardize data format
3. **Enrichment**: Add LinkedIn profiles and emails
4. **AI Analysis**: Generate summaries and competitor analysis
5. **Storage**: Save to Airtable with deduplication

## 🗃️ Airtable Schema

The system populates the following fields in your Airtable 'Leads' table:

| Field | Source | Description |
|-------|--------|-------------|
| Project Name | Scraped | Name of the Web3 project |
| Website | Scraped | Project website URL |
| Status | System | Always set to "New Lead" |
| Source | System | Which scraper found this project |
| Twitter | Scraped | Twitter profile URL |
| LinkedIn | Enriched | LinkedIn company page |
| Email | Enriched | Contact email via Hunter.io |
| Telegram | Scraped | Telegram group/channel |
| Lead Summary | AI Generated | Project description and value proposition |
| Competitor Analysis | AI Generated | Key competitors and market analysis |

## 🔍 Monitoring

### Check Scheduler Status
```bash
curl http://localhost:3006/api/v1/scheduler/status
```

### View Logs
- Server logs: Check console output from `npm start`
- Worker logs: Check console output from `npm run worker`

## 🛡️ Error Handling

The system includes robust error handling:

- **Scraper Failures**: Individual scrapers fail gracefully without stopping the pipeline
- **API Rate Limits**: Automatic retry with exponential backoff
- **Network Issues**: Timeout handling and retry logic
- **Duplicate Prevention**: Domain-based deduplication prevents duplicate entries

## 📈 Performance Metrics

Target performance (as per PRD):
- **Email Enrichment Rate**: >40%
- **LinkedIn Enrichment Rate**: >60%
- **System Uptime**: >98%
- **Processing Time**: <1 hour for daily run

## 🔧 Troubleshooting

### Common Issues

1. **Redis Connection Error**
   ```bash
   # Start Redis server
   redis-server
   ```

2. **API Key Validation Failures**
   ```bash
   npm run validate-all
   ```

3. **Puppeteer Issues**
   ```bash
   # Install additional dependencies (Linux)
   sudo apt-get install -y libgbm-dev
   ```

### Debug Mode

For detailed logging, set environment variable:
```bash
DEBUG=true npm start
```

## 🚦 Free Tier Limits

The system is designed to stay within free tier limits:

- **Hunter.io**: 25 requests/month
- **Gemini**: 15 requests/minute, 1500/day
- **Airtable**: 1,200 records/base
- **CoinMarketCap**: 333 requests/day
- **Other APIs**: Various limits handled with rate limiting

## 📝 Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| Start Server | `npm start` | Main server with scheduler |
| Start Worker | `npm run worker` | Background job processor |
| Manual Ingest | `npm run ingest` | One-time pipeline run |
| Validate Keys | `npm run validate-all` | Test all API connections |
| Legacy Validate | `npm run validate` | Test CryptoRank & DappRadar only |

## 🤝 Contributing

1. Test your changes with `npm run validate-all`
2. Run a manual ingestion with `npm run ingest`
3. Check that the scheduler works with `npm start`

## 📄 License

ISC License - see package.json for details.
