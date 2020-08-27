const fetcher = require('./fetcher_news_via_search_engine')

class news_cctime extends fetcher {
  constructor(delay, pageLoaddelay, engine = 'bing') {
    super({
        "_id": "news_cctime",
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
          "selector": ".time-ago span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.description",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_cctime',
      'KH',
      'cc-times.com/posts',
      engine,
      'jsdom')
    this.description = "柬中時報/cc-times"
  }
}
module.exports = news_cctime;