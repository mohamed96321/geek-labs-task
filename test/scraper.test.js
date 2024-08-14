const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const { scrapeTwitterAccount } = require('../helpers/scraper');

describe('Twitter Scraper', function() {
    beforeEach(function() {
        sinon.stub(axios, 'get').resolves({
            data: `
                <div data-testid="tweet">This is a tweet with $TSLA.</div>
                <div data-testid="tweet">Another tweet with $AAPL.</div>
                <div data-testid="tweet">Yet another tweet with $TSLA and $GOOGL.</div>
            `
        });
    });

    afterEach(function() {
        axios.get.restore();
    });

    it('should return an array of tweets', async function() {
        const tweets = await scrapeTwitterAccount('https://twitter.com/someaccount');
        expect(tweets).to.be.an('array').that.includes('This is a tweet with $TSLA.');
    });

    it('should handle errors gracefully', async function() {
        axios.get.restore();
        sinon.stub(axios, 'get').rejects(new Error('Network error'));

        const tweets = await scrapeTwitterAccount('https://twitter.com/someaccount');
        expect(tweets).to.be.an('array').that.is.empty;
    });
});
