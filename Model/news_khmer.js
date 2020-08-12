const fetcher = require('./fetcher_news_via_search_engine');

class news_khmer extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_khmer",
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
          "selector": "time",
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
        }]
      },
      delay,
      pageLoaddelay,
      'news_khmer',
      'KH',
      'khmerdaily.info',
      'duckduckgo');
  }
}
module.exports = news_khmer;