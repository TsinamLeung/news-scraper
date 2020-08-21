const fetcher = require("./fetcher_news_via_search_engine");

class news_cna extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "cna",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "h1 span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".updatetime span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.paragraph ",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_cna',
      'TW',
      'www.cna.com.tw',
      'duckduckgo')
  }
}
module.exports = news_cna;