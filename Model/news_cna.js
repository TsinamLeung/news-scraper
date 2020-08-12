const fetcher = require("./fetcher_news_common");

class news_cna extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "cna",
        "startUrl": [this.baseurl],
        "selectors": [{
          "id": "each",
          "type": "SelectorElement",
          "parentSelectors": ["_root"],
          "selector": ".mainList li",
          "multiple": true,
          "delay": 0
        }, {
          "id": "title_site",
          "type": "SelectorText",
          "parentSelectors": ["each"],
          "selector": "h2",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date_site",
          "type": "SelectorText",
          "parentSelectors": ["each"],
          "selector": "div",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "detail",
          "type": "SelectorLink",
          "parentSelectors": ["each"],
          "selector": "a",
          "multiple": false,
          "delay": 0
        }, {
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["detail"],
          "selector": "h1 span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["detail"],
          "selector": ".updatetime span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["detail"],
          "selector": "div.paragraph ",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_cna',
      'TW')
  }
  setKeyword(keyword) {
    this.updateStartURL("https://www.cna.com.tw/search/hysearchws.aspx?q=" + encodeURI(keyword));
  }
}
module.exports = news_cna;