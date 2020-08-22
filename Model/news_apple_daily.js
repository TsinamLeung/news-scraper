const fetcher = require("./fetcher_news_via_search_engine");

class news_apple_daily extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_apple",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".text_medium span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".timestamp-container div",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".article_body section",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_apple',
      'HK',
      "hk.appledaily.com",
      'duckduckgo');
      this.description = '蘋果日報/Apple Daily'
  }

}
module.exports = news_apple_daily;