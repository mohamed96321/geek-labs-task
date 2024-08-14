const { twitterAccounts, ticker, timeInterval } = require('./config');
const { scrapeTwitterAccount, countTickerMentions } = require('./scraper');

/**
 * Scrape all Twitter accounts and count mentions of the stock symbol.
 */
async function scrapeAllAccounts() {
    let totalMentions = 0;

    for (const account of twitterAccounts) {
        const tweets = await scrapeTwitterAccount(account);
        totalMentions += countTickerMentions(tweets, ticker);
    }

    console.log(`'${ticker}' was mentioned '${totalMentions}' times in the last '${timeInterval}' minutes.`);
}

module.exports = { scrapeAllAccounts };
