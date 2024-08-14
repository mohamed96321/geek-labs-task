const schedule = require('node-schedule');
const { scrapeAllAccounts } = require('./utils');
const { timeInterval } = require('./config');

/**
 * Start the scraper at the defined time interval.
 */
function startScraper() {
    schedule.scheduleJob(`*/${timeInterval} * * * *`, scrapeAllAccounts);
    console.log(`Scraper started. Running every ${timeInterval} minutes.`);
}

module.exports = { startScraper };
