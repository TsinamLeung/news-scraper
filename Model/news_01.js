const fetcher = require('./fetcher_news_via_search_engine');

class news_01 extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_01",
        "startUrl": ["https://www.hk01.com/search?q=%E4%BA%BA"],
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
      'duckduckgo');
      this.description = '香港01/Hongkong 01'
  }
}
module.exports = news_01;