const fetcher = require('./fetcher_news_via_search_engine');

class news_guangming extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_guangming",
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
          "selector": ".clearfix span.date",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.entry-content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_guangming',
      'MY',
      'guangming.com.my',
      'duckduckgo');
  }

}
module.exports = news_guangming;