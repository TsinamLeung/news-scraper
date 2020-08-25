const fetcher_news_common = require('./fetcher_news_common');
const ddg = require("./fetcher_url_duckduckgo");
const debug = require('debug')('fetcher:index');
class fetcher_news_via_search_engine extends fetcher_news_common {
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
    this.description = ''
    switch (search_engine) {
      case 'duckduckgo':
        this.engine = new ddg(20, 5000);
        break;
      default:
        this.engine = undefined;
        break;
    }
    this.stopflag = false;
  }
  setOptions(options) {
    this.options = options;
    this.engine.setSite(this.site, this.keyword, options);
  }
  /**
   * 
   * @param {String} keyword 
   */
  setKeyword(keyword) {
    this.keyword = keyword;
    this.engine.setSite(this.site, keyword, this.options);
  }
  async fetchUrlList() {
    if (this.keyword == '' || this.keyword == undefined) {
      throw ('No keyword specfied!');
    }
    try {
      let urls = await this.engine.run();
      console.info("there're " + urls.length + " url");
      return urls;
    } catch (error) {
      console.error("Occured Error when fetching urls");
      console.error(error);
      return [];
    }
  }
  async fetchResultByUrl(url) {
    try {
      this.updateStartURL(url);
      let result = await super.run();
      if (result.length === 0) {
        return result;
      } else {
        //extract the first Result
        result = result[0];
        result['link-href'] = url;
        debug("fetchresultbyurl %O ", result);
        return result;
      }
    } catch (error) {
      console.error("Occured Error when fetching result via search engine " + url);
      console.error(error);
    }
  }
  async run() {
    console.info("fetching " + this.name + " via " + this.engine.name);
    try {
      let results = [];
      let list = await this.fetchUrlList();
      for (let i in list) {
        try {
          if (this.stopflag) {
            console.log("Fetching Interrupted [fetcher_news_via_search_engine] Current Progress: " + i + " of" + list.length);
            this.stopflag = false;
            break;
          }
          let result = await this.fetchResultByUrl(list[i]['link-href'])
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