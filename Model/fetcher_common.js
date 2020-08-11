const Scraper = require("../web_scraper");


class fetcher_common {
  /**
   * 
   * @param {Object} sitemap 
   * @param {number} delay 
   * @param {number} pageLoaddedlay 
   * @param {String} name 
   */
  constructor(sitemap, delay, pageLoaddedlay, name) {
    this.sitemap = sitemap;
    this.delay = delay;
    this.pageLoaddelay = pageLoaddedlay;
    this.name = name;
  }
  /**
   * 
   * @param {String} url 
   */
  updateStartURL(url){
    this.sitemap["startUrl"] = url;
  }
  async run() {
    if(this.sitemap["startUrl"] == []) {
      throw('Empty URL!');
    }
    console.info("fetching " + this.name);
    try {
      let results = await Scraper(this.sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return results;
    } catch (error) {
      console.error("Occured Error when fetching " + this.name);
      console.error(error);
      return undefined;
    }
  }
}
module.exports = fetcher_common;