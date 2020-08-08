const scraper = require('web-scraper-headless')
const debug = require('debug')('app:fetcher')
module.exports = news_govhk;
/**
 * 
 * @param {*} options 
 * {keyword: string,delay: number,pageLoadDelay: number}
 */
function news_govhk(options) {
  this.locale = "HK";
  this.keyword = options.keyword;
  this.delay = options.delay;
  this.pageLoadDelay = options.pageLoadDelay;
  //Date limited from 2019 to today
  this.baseurl = "https://www.news.gov.hk/chi/search_result.html?query=" + encodeURI(this.keyword) + "&&date_v=fromto&date_last=%2330&s_date=01012019&e_date=&page="
  this.news_sitemap = {
    "_id": "news_govhk",
    "startUrl": [""],
    "selectors": [{
      "id": "news",
      "type": "SelectorElement",
      "parentSelectors": ["_root"],
      "selector": "div.result-card",
      "multiple": true,
      "delay": 0
    }, {
      "id": "details",
      "type": "SelectorLink",
      "parentSelectors": ["news"],
      "selector": ".d-inline a",
      "multiple": false,
      "delay": 0
    }, {
      "id": "news_title",
      "type": "SelectorText",
      "parentSelectors": ["details"],
      "selector": "h1.news-title",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "news_date",
      "type": "SelectorText",
      "parentSelectors": ["details"],
      "selector": "span.news-date",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "news_content",
      "type": "SelectorText",
      "parentSelectors": ["details"],
      "selector": ".newsdetail-content",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "date",
      "type": "SelectorText",
      "parentSelectors": ["news"],
      "selector": ".d-flex div span.mx-2",
      "multiple": false,
      "regex": "",
      "delay": 0
    }, {
      "id": "title",
      "type": "SelectorText",
      "parentSelectors": ["news"],
      "selector": ".d-inline a",
      "multiple": false,
      "regex": "",
      "delay": 0
    }]
  }
  this.page_num_sitemap = {
    "_id": "pages_govhk",
    "startUrl": [this.baseurl],
    "selectors": [{
      "id": "num_pages",
      "type": "SelectorText",
      "parentSelectors": ["_root"],
      "selector": "span.btnMaxNamber",
      "multiple": false,
      "regex": "\\d+",
      "delay": 0
    }]

  }
  this.pages = 0;
  this.getPages = async function () {
    try {
      let result = await scraper(this.page_num_sitemap, {
        delay: this.delay,
        pageLoadDelay: this.pageLoadDelay,
        browser: 'headless'
      });
      this.pages = result[0]['num_pages'];
      if (this.pages == undefined) {
        this.pages = 0;
        throw (new Error("Cannot Get Pages Number"));
      }
      this.news_sitemap['startUrl'] = [this.baseurl + '[1-' + this.pages + ']'];
    } catch (error) {
      console.error("Failed when fetching pages number");
      throw (error);
    };
  }
  this.run = async function () {
    try {
      await this.getPages();
      debug("pages is " + this.pages);
      console.log("Fetching News of GovHK");
      debug("news_sitemap URL " + this.news_sitemap.startUrl)
      let result = await scraper(this.news_sitemap, {
        delay: this.delay,
        pageLoadDelay: this.pageLoadDelay,
        browser: 'headless'
      });
      return result;
    } catch (error) {
      console.error("Error when Fetching news_govhk");
      console.error(error);
      return undefined;
    }
  }
  return this;
}