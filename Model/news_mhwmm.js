const Scraper = require("../web_scraper");

module.exports = news_mhwmm;

function news_mhwmm(options) {
  this.locale = "MM";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "https://duckduckgo.com/?q=site%3Ahttps%3A%2F%2Fwww.mhwmm.com%2FCh%2FNewsView.asp+" + encodeURI(this.keyword) + "&t=hk&ia=web"
  this.news_sitemap = {
    "_id": "news_mhwmm",
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
      "selector": "td td td[width] center",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date",
      "type": "SelectorText",
      "parentSelectors": ["detail"],
      "selector": ".top_m_txt01 center",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["detail"],
      "selector": "td td td td [width] tr:nth-of-type(7) td",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_mhwmm");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Error Occured when fetching news_mhwmm");
      console.error(error);
      return undefined;
    }
  }
  return this;
}