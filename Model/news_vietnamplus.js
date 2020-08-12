const fetcher = require('./fetcher_news_via_search_engine');


class news_vietnamplus extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_vietnamplus",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["detail"],
          "selector": "h1",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["detail"],
          "selector": ".source time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["detail"],
          "selector": "div.content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_vietnamplus',
      'VN',
      'zh.vietnamplus.vn',
      'duckduckgo');
  }
}
module.exports = news_vietnamplus;