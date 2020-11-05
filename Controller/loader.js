const path = require('path')
const fetcher_via_search_engine = require(path.join(__dirname, '..', 'Model', 'fetcher_news_via_search_engine'))
const YAML = require('yaml')
const fs = require('fs')
class Loader {
  constructor() {
    this.fetchers = {}
    this.loadConfig()
  }
  loadConfig() {
    const file = fs.readFileSync(path.join(__dirname, '..', 'Model', 'config_fetcher.yaml'), 'utf-8')
    console.log('loading fetchers')
    const fetchers = YAML.parse(file)
    console.log('fetchers loaded')
    this.fetchers = fetchers
  }
  listAvailbleFetcher() {
    const list = []
    for (const name in this.fetchers) {
      if (this.fetchers.hasOwnProperty(name)) {
        list.push({
          value: name,
          label: this.fetchers[name].locale + " " + this.fetchers[name].description
        })
      }
    }
    return list
  }
  getFetcherInfo(name) {
    return this.fetchers[name]
  }
  getFetcher(name, delay = 20, pageLoaddelay = 500, engine = 'bing', browser = 'jsdom') {
    const fetcher = this.fetchers[name]
    if (!(!fetcher)) {
      return new fetcher_via_search_engine(JSON.parse(fetcher.sitemap), fetcher.delay || delay, fetcher.pageLoaddelay || pageLoaddelay, name, fetcher.locale, fetcher.base, engine, fetcher.browser || browser)
    } else {
      console.log('no fetcher for ' + name);
    }
  }
}
module.exports = new Loader()