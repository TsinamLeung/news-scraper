const fetcher = require('./fetcher_news_via_search_engine');

class news_hhua extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
      "_id": "news_hhua",
      "startUrl": [],
      "selectors": [{
        "id": "title",
        "type": "SelectorText",
        "parentSelectors": ["_root"],
        "selector": "span[itemprop='headline']",
        "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".post-published b",
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
      'news_hhua',
      'ID',
      'koran.harianinhuaonline.com',
      'duckduckgo');
      this.description = '印華日日報/Harian InHua'
    }
    
  }
  module.exports = news_hhua;