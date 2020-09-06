const path = require('path')
const fetcher_common = require('./fetcher_common')
const {
  encode
} = require('punycode')
class Fetcher_search_engine extends fetcher_common {
  constructor(sitemap = {}, delay = 20, pageLoadedlay = 3000, name, browser = 'jsdom', baseUrl = '') {
    super(sitemap, delay, pageLoadedlay, name, browser)
    this.baseUrl = baseUrl
    this.speficiedSite = ''
    this.options = {}
    this.keyword = ''
    this.args = []
  }
  setSite(site) {
    this.speficiedSite = site
    this.updateStartURL(this.generateUrl())
  }
  setOptions(options) {
    this.options = options
    this.updateStartURL(this.generateUrl())
  }
  setQuery(query) {
    this.keyword = query
    this.updateStartURL(this.generateUrl())
  }
  generateUrl() {
    return `${this.baseUrl}${encodeURI('site:')}${encodeURI(this.speficiedSite)}+${encodeURI(this.keyword)}&${this.args.join('&')}`
  }
  async run() {
    const result = await super.run()
    return result
  }
}
module.exports = Fetcher_search_engine