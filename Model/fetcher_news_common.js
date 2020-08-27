let fetcher_common = require('./fetcher_common');
const debug = require('debug')('fetcher:index')
class fetcher_news_common extends fetcher_common {
  /**
   * 
   * @param {Object} sitemap 
   * @param {number} delay 
   * @param {number} pageLoaddedlay 
   * @param {String} name 
   * @param {String} locale 
   */
  constructor(sitemap, delay, pageLoaddedlay, name, locale, browser = 'jsdom') {
    super(sitemap, delay, pageLoaddedlay, name, browser);
    this.locale = locale;
  }
  /**
   * 
   * @param {String} keyword
   * Every child class should rewrite thisfunction  
   */
  setKeyword(keyword) {

  }
}
module.exports = fetcher_news_common;