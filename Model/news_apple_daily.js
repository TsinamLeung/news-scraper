const fetcher_news_common = require("./fetcher_news_common");

class news_apple_daily extends fetcher_news_common {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_apple",
        "startUrl": [],
        "selectors": [{
          "id": "detail",
          "type": "SelectorElement",
          "parentSelectors": ["nxt_pge"],
          "selector": "div.gsc-result",
          "multiple": true,
          "delay": 0
        }, {
          "id": "nxt_pge",
          "type": "SelectorElement",
          "parentSelectors": ["_root"],
          "selector": "div.gsc-results",
          "multiple": false,
          "delay": 0
        }, {
          "id": "link",
          "type": "SelectorLink",
          "parentSelectors": ["detail"],
          "selector": ".gsc-thumbnail-inside a",
          "multiple": false,
          "delay": 0
        }, {
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": ".text_medium span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": ".timestamp-container div",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": ".article_body section",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_apple',
      'HK');
  }


  /**
   * 
   * @param {String} keyword 
   */
  setKeyword(keyword) {
    this.updateStartURL("https://hk.appledaily.com/search/" + encodeURI(keyword) + "?q=" + encodeURI(keyword));
  }
}
module.exports = news_apple_daily;