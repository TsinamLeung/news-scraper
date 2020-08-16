const fetcher_news_common = require('./fetcher_news_common');
const ddg = require("./fetcher_url_duckduckgo");
class fetcher_news_via_search_engine extends fetcher_news_common {
  stopflag = false;
  /**
   * 
   * @param {Object} sitemap 
   * @param {number} delay 
   * @param {number} pageLoaddedlay 
   * @param {String} name 
   * @param {String} locale 
   * @param {String} site 
   * @param {String} search_engine 
   */
  constructor(sitemap, delay, pageLoaddedlay, name, locale, site, search_engine) {
    super(sitemap, delay, pageLoaddedlay, name);
    this.locale = locale;
    this.site = site;
    switch (search_engine) {
      case 'duckduckgo':
        this.engine = new ddg(20, 5000);
        break;
      default:
        this.engine = undefined;
        break;
    }
  }
  /**
   * 
   * @param {String} keyword 
   */
  setKeyword(keyword) {
    this.keyword = keyword;
    this.engine.setSite(this.site, keyword);
  }
  async run() {
    if (this.keyword == '' || this.keyword == undefined) {
      throw ('No keyword specfied!');
    }
    console.info("fetching " + this.name + " via " + this.engine.name);
    try {
      let lists = await this.engine.run();
      let results = [];
      console.info("thers're " + lists.length + " url")
      for (let i in lists) {
        try {
          if (this.stopflag) {
            console.log("Fetching Interrupted [fetcher_news_via_search_engine] Current Progress: " + i + " of" + lists.length);
            this.stopflag = false;
            break;
          }
          this.updateStartURL(lists[i]['link-href']);
          let result = await super.run();
          //extract the first Result
          result = result[0];
          result['link-href'] = lists[i]['link-href'];
          results.push(result);
        } catch (error) {
          console.error("Error Occured when fetching " + list[i]['link-href']);
          console.error(error);
        }
      }
      return results;
    } catch (error_eng) {
      console.error("Error Occured when fetching lists of " + this.name + " via " + this.engine.name);
      console.error(error_eng);
      return undefined;
    }
  }
}
module.exports = fetcher_news_via_search_engine;