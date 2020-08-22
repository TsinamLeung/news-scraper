const fetcher = require('./fetcher_news_via_search_engine');

class news_jianhua extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
      "_id": "news_jianhua",
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
        "selector": ".td-post-date-no-dot time",
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
    'news_jianhua',
    'KH',
    'jianhuadaily.com',
    'duckduckgo');
    this.description = '柬華日報/jianhua_daily'
  }
  
}
module.exports = news_jianhua;