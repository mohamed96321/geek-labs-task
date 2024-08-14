const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Scrape tweets from a given Twitter account URL.
 * 
 * @param {string} url - The URL of the Twitter account to scrape.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of tweets.
 */
async function scrapeTwitterAccount(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let tweets = [];
        $('[data-testid="tweet"]').each((index, element) => {
            const tweetText = $(element).text();
            tweets.push(tweetText);
        });

        return tweets;
    } catch (error) {
        console.error(`Error scraping ${url}: ${error.message}`);
        return [];
    }
}

/**
 * Count the mentions of any stock symbol (e.g., $TSLA, $AAPL) in a list of tweets.
 * 
 * @param {Array<string>} tweets - An array of tweets.
 * @returns {Object} - An object with stock symbols as keys and their mention counts as values.
 */
function countTickerMentions(tweets) {
    const tickerCounts = {};
    const tickerRegex = /\$[A-Za-z]{1,5}\b/g;  // Matches $ followed by 1-5 alphanumeric characters

    tweets.forEach(tweet => {
        const tickers = tweet.match(tickerRegex);
        if (tickers) {
            tickers.forEach(ticker => {
                tickerCounts[ticker] = (tickerCounts[ticker] || 0) + 1;
            });
        }
    });

    return tickerCounts;
}

module.exports = { scrapeTwitterAccount, countTickerMentions };
