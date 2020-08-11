const Scraper = require("../web_scraper");

module.exports = news_mmgpmedia;

function news_mmgpmedia(options) {
  this.locale = "MM";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "http://www.mmgpmedia.com/search?searchword=" + encodeURI(this.keyword) + "&ordering=newest&searchphrase=all&limit=0"
  this.news_sitemap = {
    "_id": "news_mmgpmedia",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "ele",
      "type": "SelectorElement",
      "parentSelectors": ["_root"],
      "selector": "div.result-item",
      "multiple": true,
      "delay": 0
    }, {
      "id": "link",
      "type": "SelectorLink",
      "parentSelectors": ["ele"],
      "selector": "a",
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
      "selector": "time",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["link"],
      "selector": "section[itemprop='articleBody']",
      "multiple": true,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_mmgpmedia");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Occured Error when fetching news_mmgpmedia");
      console.error(error);
      return undefined;
    }
  }
  return this;
}