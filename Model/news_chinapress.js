const Scraper = require("../web_scraper");

module.exports = news_chinapress;

function news_chinapress(options) {
  this.locale = "MY";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "https://duckduckgo.com/?q=site%3Awww.chinapress.com.my%2F+" + encodeURI(this.keyword) + "&t=hk&ia=web"
  this.news_sitemap = {
    "_id": "news_chinapress",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "more",
      "type": "SelectorElementClick",
      "parentSelectors": ["_root"],
      "selector": "div.results",
      "multiple": false,
      "delay": "500",
      "clickElementSelector": "a.result--more__btn",
      "clickType": "clickMore",
      "discardInitialElements": "do-not-discard",
      "clickElementUniquenessType": "uniqueHTMLText"
    }, {
      "id": "ele",
      "type": "SelectorElement",
      "parentSelectors": ["more"],
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
      "id": "date",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "a time",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "conttent",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "div.entry-content p",
      "multiple": true,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_zaobao");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Occured Error when fetching news_zaobao");
      console.error(error);
      return undefined;
    }
  }
  return this;
}