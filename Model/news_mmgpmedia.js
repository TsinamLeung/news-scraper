const fetcher = require('./fetcher_news_via_search_engine');

class news_mmgpmedia extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_mmgpmedia",
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
          "selector": "time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "section[itemprop='articleBody']",
          "multiple": true,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_mmgpmedia',
      'MM',
      'www.mmgpmedia.com',
      'duckduckgo'
    );
    this.description = '金鳳凰網/mmgpmedia'
  }

}
module.exports = news_mmgpmedia;