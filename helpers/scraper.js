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
 * Count the mentions of a specific ticker in a list of tweets.
 * 
 * @param {Array<string>} tweets - An array of tweets.
 * @param {string} ticker - The stock symbol to search for.
 * @returns {number} - The number of mentions.
 */
function countTickerMentions(tweets, ticker) {
    return tweets.filter(tweet => tweet.includes(ticker)).length;
}

module.exports = { scrapeTwitterAccount, countTickerMentions };
