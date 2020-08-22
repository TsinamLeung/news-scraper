const fetcher = require('./fetcher_news_via_search_engine');


class news_ltn extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_ltn",
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
          "selector": "span.time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.text",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_ltn',
      'TW',
      'news.ltn.com.tw',
      'duckduckgo');
      this.description = '自由時報/news ltn'
  }

}
module.exports = news_ltn;