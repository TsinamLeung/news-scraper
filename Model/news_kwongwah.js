const fetcher = require('./fetcher_news_via_search_engine');


class news_kwongwah extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_kwongwah",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "h1.entry-title",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".entry-date span",
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
      'news_kwongwah',
      'MY',
      'www.kwongwah.com.my',
      'duckduckgo');
  }
}
module.exports = news_kwongwah;