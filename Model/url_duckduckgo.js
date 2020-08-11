const Scraper = require("../web_scraper");

module.exports = url_duckduckgo;

function url_duckduckgo(options) {
  this.locale = "None";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.site = options.site;
  this.baseurl = "https://duckduckgo.com/?q=" + encodeURI("site:") + encodeURI(this.site) + "+" + encodeURI(this.keyword) + "&t=hk&ia=web"
  this.news_sitemap = {
    "_id": "url_duckduckgo",
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
    }]
  };
  this.run = async function () {
    console.info("fetching url_duckduckgo");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Occured Error when fetching news_duckduckgo");
      console.error(error);
      return undefined;
    }
  }
  return this;
}