const fetcher = require('./fetcher_news_via_search_engine');

class news_govviet extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_chinhphu",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "span#ctl00_mainContent_bodyContent_lbHeadline",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "span#ctl00_mainContent_bodyContent_lbDate",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "span#ctl00_mainContent_bodyContent_lbBody",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_govviet',
      'VN',
      'cn.news.chinhphu.vn/Home',
      'duckduckgo');
  }
}
module.exports = news_govviet;