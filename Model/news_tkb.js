const fetcher = require('./fetcher_news_via_search_engine');

class news_tkb extends fetcher {

  constructor(delay, pageLoaddelay) {
    super({
        "_id": "site_daigongbau",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "h1.tkp_con_title",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "time",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "h2.tkp_con_author span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.tkp_content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_tkb',
      'HK',
      'www.takungpao.com.hk',
      'duckduckgo');
      this.description = '大公報/takungpao'
  }
}
module.exports = news_tkb;