const fetcher = require('./fetcher_news_via_search_engine');


class news_medcom extends fetcher {

  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_medcom",
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
          "selector": "div.info_ct",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div[itemprop='articleBody']",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_medcom',
      'ID',
      'www.medcom.id/cn',
      'duckduckgo');
  }
}
module.exports = news_medcom;