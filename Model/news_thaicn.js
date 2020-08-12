
const fetcher = require('./fetcher_news_via_search_engine');


class news_thaicn extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_thaicn",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".title_info font",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".main td table:nth-of-type(2) tbody",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_thaicn',
      'TH',
      'www.thaicn.net/news',
      'duckduckgo');
    }
  }
  module.exports = news_thaicn;