const Scraper = require("web-scraper-headless");

module.exports = news_udn;

function news_udn(options) {
  this.locale = "TW";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "https://duckduckgo.com/?q=site%3Audn.com+" + encodeURI(this.keyword) + "&t=hk&ia=web";
  this.news_sitemap = {
    "_id": "news_udn",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "scrol",
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
      "id": "each",
      "type": "SelectorElement",
      "parentSelectors": ["scrol"],
      "selector": "div.result__body",
      "multiple": true,
      "delay": 0
    }, {
      "id": "detail",
      "type": "SelectorLink",
      "parentSelectors": ["each"],
      "selector": "h2 a",
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
      "selector": ".shareBar__info--author span,time.article-content__time",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["detail"],
      "selector": "div.article,section.article-content__editor",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_udn");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Occured Error when fetching news_udn");
      console.error(error);
      return undefined;
    }
  }
  return this;
}