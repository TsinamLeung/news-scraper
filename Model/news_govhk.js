const scraper = require('../web_scraper')
const fetcher = require('./fetcher_news_via_search_engine')

class news_govhk extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_govhk",
        "startUrl": [""],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "h1.news-title",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "span.news-date",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".newsdetail-content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_govhk',
      'HK',
      'www.news.gov.hk/chi',
      'duckduckgo')
  }
}
module.exports = news_govhk;