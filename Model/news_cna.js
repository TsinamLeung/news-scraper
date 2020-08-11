const Scraper = require("../web_scraper");

module.exports = news_cna;

function news_cna(options) {
  this.locale = "TW";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "https://www.cna.com.tw/search/hysearchws.aspx?q=" + encodeURI(this.keyword);
  this.news_sitemap = {
    "_id": "cna",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "each",
      "type": "SelectorElement",
      "parentSelectors": ["_root"],
      "selector": ".mainList li",
      "multiple": true,
      "delay": 0
    }, {
      "id": "title_site",
      "type": "SelectorText",
      "parentSelectors": ["each"],
      "selector": "h2",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date_site",
      "type": "SelectorText",
      "parentSelectors": ["each"],
      "selector": "div",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "detail",
      "type": "SelectorLink",
      "parentSelectors": ["each"],
      "selector": "a",
      "multiple": false,
      "delay": 0
    }, {
      "id": "title",
      "type": "SelectorText",
      "parentSelectors": ["detail"],
      "selector": "h1 span",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date",
      "type": "SelectorText",
      "parentSelectors": ["detail"],
      "selector": ".updatetime span",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["detail"],
      "selector": "div.paragraph ",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_cna");
    try {
      let result = await Scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoaddelay: this.pageLoaddelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Occured Error when fetching news_cna");
      console.error(error);
      return undefined;
    }
  }
  return this;
}