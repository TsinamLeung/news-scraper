const fetcher = require('./fetcher_news_via_search_engine');


class news_sggp extends fetcher {

  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_sggp",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": "h1.article-title",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": ".meta-info time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["link"],
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
  }
}
module.exports = news_sggp;