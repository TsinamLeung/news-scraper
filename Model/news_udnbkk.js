const fetcher = require('./fetcher_news_via_search_engine');


class news_udnbkk extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_udnbkk",
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
          "selector": "td#article_content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "p.xg1",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_udnbkk',
      'TH',
      'www.udnbkk.com',
      'duckduckgo');
      this.description ='泰國世界日報/thai udnbkk'
  }

}
module.exports = news_udnbkk;