const Scraper = require("../web_scraper");

module.exports = news_thaiembbeij;

function news_thaiembbeij(options) {
  this.locale = "TH";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "https://thaiembbeij.org/?s=" + encodeURI(this.keyword);
  this.news_sitemap = {
    "_id": "news_thaiembbeij",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "each",
      "type": "SelectorElement",
      "parentSelectors": ["_root", "nxt"],
      "selector": "div.elementor-post__text",
      "multiple": true,
      "delay": 0
    }, {
      "id": "link",
      "type": "SelectorLink",
      "parentSelectors": ["each"],
      "selector": "a",
      "multiple": false,
      "delay": 0
    }, {
      "id": "nxt",
      "type": "SelectorLink",
      "parentSelectors": ["_root", "nxt"],
      "selector": "a.next",
      "multiple": true,
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
      "selector": "span.elementor-post-info__item--type-date",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": ".elementor-element-7f15827 div",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_thaiembbeij");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Occured Error when fetching news_thaiembbeij");
      console.error(error);
      return undefined;
    }
  }
  return this;
}