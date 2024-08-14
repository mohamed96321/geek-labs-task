const { twitterAccounts, timeInterval } = require('./config');
const { scrapeTwitterAccount, countTickerMentions } = require('./scraper');

/**
 * Scrape all Twitter accounts and count mentions of stock symbols.
 */
async function scrapeAllAccounts() {
    const aggregatedMentions = {};

    for (const account of twitterAccounts) {
        const tweets = await scrapeTwitterAccount(account);
        const mentions = countTickerMentions(tweets);

        for (const [ticker, count] of Object.entries(mentions)) {
            aggregatedMentions[ticker] = (aggregatedMentions[ticker] || 0) + count;
        }
    }

    console.log('Stock symbol mentions in the last', timeInterval, 'minutes:');
    for (const [ticker, count] of Object.entries(aggregatedMentions)) {
        console.log(`${ticker}: ${count} mentions`);
    }
}

module.exports = { scrapeAllAccounts };
