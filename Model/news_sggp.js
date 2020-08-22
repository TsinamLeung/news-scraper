const fetcher = require('./fetcher_news_via_search_engine');


class news_sggp extends fetcher {

  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_sggp",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "h1.article-title",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".meta-info time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_sggp',
      'VN',
      'cn.sggp.org.vn',
      'duckduckgo');
      this.description = '西貢解放日報/saigon online'
  }
}
module.exports = news_sggp;