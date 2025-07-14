# CoinMarketCap New Coins Scraper

This Apify Actor automates the process of finding newly listed cryptocurrencies on CoinMarketCap. It navigates to the "New Cryptocurrencies" page, scrolls to load the desired number of coins, then visits each coin's detail page to extract key information and all available social media links.

## Key Features

- **Reliable Scraping**: Uses Apify Proxy to automatically rotate IP addresses, dramatically reducing the chance of being blocked.
- **Human-Like Behavior**: Employs `puppeteer-extra-plugin-stealth` and randomized delays to mimic a real user, bypassing many anti-bot systems.
- **Efficient**: Blocks unnecessary requests like ads, tracking scripts, and images to save bandwidth and speed up the scraping process.
- **Fully Automated**: Handles scrolling, navigating to detail pages, and extracting data without any manual intervention.

---

## How to Use

This actor is designed to be very simple to run.

1.  Navigate to the actor's page in your Apify Console.
2.  Click on the **Input** tab.
3.  Fill in the configuration options to tell the actor what to do.
4.  Click the **"Start"** button.

---

## Input Configuration

The actor's behavior is controlled by the following settings in the **Input** tab:

| Field | Description | Example Value |
| --- | --- | --- |
| **Max Items to Scrape** | The total number of new coins you want the actor to find and scrape. The actor will scroll down the "New" page until it has found this many coins. | `25` |
| **Max Concurrency** | How many coin detail pages the actor should scrape at the same time. A lower number is slower but gentler on the website. | `3` |
| **Run in Headless Mode** | If checked, the Chrome browser will run invisibly in the background (faster). If unchecked, you will see the browser window open and watch the actor work (good for debugging). | `checked` |
| **Use Residential Proxies** | Use higher-quality residential proxies from the Apify Proxy pool. This is more reliable for very difficult websites but may incur higher costs on your Apify plan. | `unchecked` |

---

## Output Data

Once the actor has finished successfully, you can find the results in the **Dataset** tab. The data will be available for download in formats like JSON, CSV (Excel), and HTML.

Each row in the dataset will contain the following information for a single coin:

```json
{
  "name": "ExampleCoin",
  "symbol": "EXC",
  "url": "https://coinmarketcap.com/currencies/examplecoin/",
  "added": "5 hours ago",
  "socials": {
    "Website": "https://examplecoin.com/",
    "Twitter": "https://x.com/examplecoin",
    "Telegram": "https://t.me/examplecoin",
    "Source Code": "https://github.com/examplecoin/..."
  },
  "scrapedAt": "2025-07-14T08:00:00.123Z"
}