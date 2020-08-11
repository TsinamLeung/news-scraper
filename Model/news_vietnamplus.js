const Scraper = require("../web_scraper");

module.exports = news_vietnamplus;

function news_vietnamplus(options) {
  this.locale = "VN";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "https://zh.vietnamplus.vn/timkiem/" + encodeURI(this.keyword) + ".vnp"
  this.news_sitemap = {
    "_id": "news_vietnamplus",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "nxt",
      "type": "SelectorLink",
      "parentSelectors": ["_root", "nxt"],
      "selector": "#ctl00_mainContent_ContentList1_pager a",
      "multiple": true,
      "delay": 0
    }, {
      "id": "each",
      "type": "SelectorElement",
      "parentSelectors": ["_root", "nxt"],
      "selector": ".zone--timeline article",
      "multiple": true,
      "delay": 0
    }, {
      "id": "detail",
      "type": "SelectorLink",
      "parentSelectors": ["each"],
      "selector": "a.story__title",
      "multiple": false,
      "delay": 0
    }, {
      "id": "title",
      "type": "SelectorText",
      "parentSelectors": ["detail"],
      "selector": "h1",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date",
      "type": "SelectorText",
      "parentSelectors": ["detail"],
      "selector": ".source time",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["detail"],
      "selector": "div.content",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_vietnamplus");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Error Occured when fetching news_vietnamplus");
      console.error(error);
      return undefined;
    }
  }
  return this;
}