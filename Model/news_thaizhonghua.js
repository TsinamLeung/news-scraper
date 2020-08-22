const fetcher = require('./fetcher_news_via_search_engine');


class news_thaizhonghua extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_thaizhonghua",
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
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.td-post-content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".td-post-title time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_thaizhonghua',
      'TH',
      'www.thaizhonghua.com',
      'duckduckgo');
      this.description = '泰國中華網/thai china news'
  }
}
module.exports = news_thaizhonghua;