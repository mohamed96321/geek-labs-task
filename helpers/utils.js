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

    for (const [stockSymbol, totalMentions] of Object.entries(aggregatedMentions)) {
        console.log(`'${stockSymbol}' was mentioned '${totalMentions}' times in the last '${timeInterval}' minutes.`);
    }
}

module.exports = { scrapeAllAccounts };
