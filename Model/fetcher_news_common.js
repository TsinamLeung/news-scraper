let fetcher_common = require('./fetcher_common');

class fetcher_news_common extends fetcher_common {
  /**
   * 
   * @param {Object} sitemap 
   * @param {number} delay 
   * @param {number} pageLoaddedlay 
   * @param {String} name 
   * @param {String} locale 
   */
  constructor(sitemap, delay, pageLoaddedlay, name ,locale) {
    super(sitemap,delay,pageLoaddedlay,name);
    this.locale = locale;
  }
  /**
   * 
   * @param {String} keyword 
   */
  setKeyword(keyword) {
    
  }
}
module.exports = fetcher_news_common;