const Scraper = require("web-scraper-headless");

module.exports = news_apple_daily;
/**
 * 
 * @param {*} options 
 * {keyword: string,delay: number,pageLoadDelay: number}
 */
function news_apple_daily(options) {
  this.location = "HK";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "https://hk.appledaily.com/search/" + encodeURI(this.keyword) + "?q=" + encodeURI(this.keyword);
  this.news_sitemap = {
    "_id": "news_apple",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "detail",
      "type": "SelectorElement",
      "parentSelectors": ["nxt_pge"],
      "selector": "div.gsc-result",
      "multiple": true,
      "delay": 0
    }, {
      "id": "nxt_pge",
      "type": "SelectorElement",
      "parentSelectors": ["_root"],
      "selector": "div.gsc-results",
      "multiple": false,
      "delay": 0
    }, {
      "id": "link",
      "type": "SelectorLink",
      "parentSelectors": ["detail"],
      "selector": ".gsc-thumbnail-inside a",
      "multiple": false,
      "delay": 0
    }, {
      "id": "title",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": ".text_medium span",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": ".timestamp-container div",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": ".article_body section",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_apple_daily");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Occured Error when fetching news_apple_daily");
      console.error(error);
      return undefined;
    }
  }
  return this;
}