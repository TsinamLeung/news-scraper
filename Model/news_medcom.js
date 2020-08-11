const Scraper = require("../web_scraper");
const ddg = require("./url_duckduckgo");
const Sitemap = require("web-scraper-headless/extension/scripts/Sitemap");
module.exports = news_medcom;

function news_medcom(options) {
  this.locale = "ID";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoaddelay = options.pageLoaddelay;
  this.baseurl = "www.medcom.id/cn"
  this.news_sitemap = {
    "_id": "news_medcom",
    "startUrl": [],
    "selectors": [{
      "id": "title",
      "type": "SelectorText",
      "parentSelectors": ["_root"],
      "selector": "h1",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date",
      "type": "SelectorText",
      "parentSelectors": ["_root"],
      "selector": "div.info_ct",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "content",
      "type": "SelectorText",
      "parentSelectors": ["_root"],
      "selector": "div[itemprop='articleBody']",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  };
  this.run = async function () {
    console.info("fetching news_medcom list via duckduckgo");
    let url_fetcher = new ddg({
      site: this.baseurl,
      delay: 20,
      pageLoaddelay: 5000,
      keyword: this.keyword
    });
    let lists = await url_fetcher.run();
    let results = [];
    for (i in lists) {
      try {
        sitemap = this.news_sitemap;
        sitemap['startUrl'] = [lists[i]['link-href']]
        let result = await Scraper(sitemap, {
          delay: this.delay,
          pageLoaddelay: this.pageLoaddelay,
          browser: 'headless'
        });
        results.push(result);
      } catch (error) {
        console.error("Error Occured when fetching " + list[i]['link-href'])
        console.error(error);
      }
    }
    return results;
  }
  return this;
}