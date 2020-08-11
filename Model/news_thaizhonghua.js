const Scraper = require("../web_scraper");

module.exports = news_thaizhonghua;

function news_thaizhonghua(options) {
  this.locale = "TH";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "https://duckduckgo.com/?q=site%3Awww.thaizhonghua.com+" + encodeURI(this.keyword) + "&t=hk&ia=web";
  this.news_sitemap = {
    "_id": "news_thaizhonghua",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "scroll",
      "type": "SelectorElementClick",
      "parentSelectors": ["_root"],
      "selector": "div.results",
      "multiple": false,
      "delay": "1000",
      "clickElementSelector": "a.result--more__btn",
      "clickType": "clickMore",
      "discardInitialElements": "do-not-discard",
      "clickElementUniquenessType": "uniqueHTMLText"
    }, {
      "id": "ele",
      "type": "SelectorElement",
      "parentSelectors": ["scroll"],
      "selector": "div.result__body",
      "multiple": true,
      "delay": 0
    }, {
      "id": "link",
      "type": "SelectorLink",
      "parentSelectors": ["ele"],
      "selector": "a.result__a",
      "multiple": false,
      "delay": 0
    }, {
      "id": "title",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "h1",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "div.td-post-content",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": ".td-post-title time",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_thaizhonghua");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Occured Error when fetching news_thaizhonghua");
      console.error(error);
      return undefined;
    }
  }
  return this;
}