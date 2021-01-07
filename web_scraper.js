const Queue = require('web-scraper-headless/extension/scripts/Queue')
const Sitemap = require('web-scraper-headless/extension/scripts/Sitemap')
const InMemoryStore = require('web-scraper-headless/extension/scripts/InMemoryStore')
const Scraper = require('web-scraper-headless/extension/scripts/Scraper')
const debug = require('debug')('web-scraper-headless:renew')
const JSDOMBrowser = require('web-scraper-headless/extension/scripts/JSDOMBrowser')
const ChromeHeadlessBrowser = require('web-scraper-headless/extension/scripts/ChromeHeadlessBrowser')
/**
 *
 * @param sitemap
 * @param options
 * @param options.browser jsdom|headless
 * @param options.pageLoadDelay
 * @param options.delay
 * @return {*}
 */
module.exports = function (sitemap, options) {
  return scrape(sitemap, options)
}

function scrape (sitemapInfo, options = {}) {
  return new Promise(function (resolve, reject) {
    // sitemap is created twice, once in node another in the browser context.
    // In node we don't actually need these variables.
    const fakeWindow = {}
    const fakeDocument = {}
    const fake$ = {}
    const q = new Queue()
    const store = new InMemoryStore()
    const sitemap = new Sitemap(sitemapInfo, {$: fake$, document: fakeDocument, window: fakeWindow})

    let BrowserConstructor
    switch (options.browser) {
      case 'jsdom':
        BrowserConstructor = JSDOMBrowser
        debug('Jsdom browser selected')
        break
      case 'headless':
        BrowserConstructor = ChromeHeadlessBrowser
        debug('Chrome headless browser selected')
        break
      default:
        debug('No browser requested so jsdom was selected as default')
        BrowserConstructor = JSDOMBrowser
    }
    const browser = new BrowserConstructor({
      pageLoadDelay: options.pageLoadDelay || 2000
    })
    const s = new Scraper({
      queue: q,
      sitemap,
      browser,
      store,
      delay: options.delay || 500
    }, {})
    s.run(function (err) {
      if (err) {
        console.error(err);
      }
      resolve(store.data)
    })
  })
}
