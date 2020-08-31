const fetcher = require('./fetcher_news_via_search_engine');

class news_01 extends fetcher {
  constructor(delay, pageLoaddelay, engine = 'bing') {
    super({
        "_id": "news_01",
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
          "selector": ".pubdate time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "article",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_01',
      'HK',
      'www.hk01.com',
      engine,
      'jsdom')
    this.description = '香港01/Hongkong 01'
  }
}
module.exports = news_01;