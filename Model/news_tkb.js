const Scraper = require("web-scraper-headless");

module.exports = news_tkb;

function news_tkb(options) {
  this.location = "HK";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "https://duckduckgo.com/?q=site%3Ahttp%3A%2F%2Fwww.takungpao.com.hk+" + this.keyword + "&ia=web"
  this.news_sitemap = {
    "_id": "site_daigongbau",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "news",
      "type": "SelectorElement",
      "parentSelectors": ["more_result"],
      "selector": "div.result__body",
      "multiple": true,
      "delay": 0
    }, {
      "id": "more_result",
      "type": "SelectorElementClick",
      "parentSelectors": ["_root"],
      "selector": "div.results",
      "multiple": false,
      "delay": "1000",
      "clickElementSelector": "a.result--more__btn",
      "clickType": "clickMore",
      "discardInitialElements": "do-not-discard",
      "clickElementUniquenessType": "uniqueHTML"
    }, {
      "id": "link",
      "type": "SelectorLink",
      "parentSelectors": ["news"],
      "selector": "a.result__a",
      "multiple": false,
      "delay": 0
    }, {
      "id": "title",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "h1.tkp_con_title",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "time",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "h2.tkp_con_author span",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "div.tkp_content",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_TaKungPau");
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