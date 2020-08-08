const Scraper = require("web-scraper-headless");

module.exports = news_sanwah;

function news_sanwah(options) {
  this.locale = "CN";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "http://so.news.cn/#search/0/" + encodeURI(this.keyword) + "/1/";
  this.news_sitemap = {
    "_id": "news_sanwah",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "ele",
      "type": "SelectorElementClick",
      "parentSelectors": ["_root"],
      "selector": "div.news",
      "multiple": false,
      "delay": "500",
      "clickElementSelector": "a.next",
      "clickType": "clickMore",
      "discardInitialElements": "do-not-discard",
      "clickElementUniquenessType": "uniqueHTMLText"
    }, {
      "id": "title_search",
      "type": "SelectorText",
      "parentSelectors": ["ele"],
      "selector": "h2 a",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date_search",
      "type": "SelectorText",
      "parentSelectors": ["ele"],
      "selector": "span",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "link",
      "type": "SelectorLink",
      "parentSelectors": ["ele"],
      "selector": "h2 a",
      "multiple": true,
      "delay": 0
    }, {
      "id": "title",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "div.h-title,div#ArticleTit,div#Title",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "div.mainCon,div#p-detail,div.content,div#Content",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "div.laiyuan,span.h-time",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_cn");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Occured Error when fetching news_cn");
      console.error(error);
      return undefined;
    }
  }
  return this;
}