const scraper = require('../web_scraper')
const fetcher = require('./fetcher_news_common')

class news_govhk extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
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
      },
      delay,
      pageLoaddelay,
      'news_govhk',
      'HK')
  }
  /**
   * 
   * @param {String} keyword 
   */
  setKeyword(keyword) {
    let url = "https://www.news.gov.hk/chi/search_result.html?query=" + encodeURI(keyword) + "&&date_v=fromto&date_last=%2330&s_date=01012019&e_date=&page=";
    this.updateStartURL(url)

  }
  async getPages() {
    try {
      let page_num_sitemap = {
        "_id": "pages_govhk",
        "startUrl": this.sitemap['startUrl'],
        "selectors": [{
          "id": "num_pages",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "span.btnMaxNamber",
          "multiple": false,
          "regex": "\\d+",
          "delay": 0
        }]
      };
      let pages = 0;
      let result = await scraper(page_num_sitemap, {
        delay: this.delay,
        pageLoadDelay: this.pageLoadDelay,
        browser: 'headless'
      });
      pages = result[0]['num_pages'];
      if (pages == undefined) {
        Promise.reject('cannot fetch page numbers');
        // cannot fetch page number
      }
      return pages;
    } catch (error) {
      console.error("Failed when fetching pages number");
      throw (error);
    };
  }

  async run() {
    try {
      let pages = await this.getPages();
      this.updateStartURL(this.sitemap['startUrl'] + '[1-' + pages + ']')
      return await super.run();
    } catch (error) {
      console.log(error);      
    }
  }
}
module.exports = news_govhk;