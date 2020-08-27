const fetch = require('./fetcher_news_via_search_engine')

class news_binhduong extends fetch {
  constructor(delay, pageLoaddelay, engine = 'bing') {
    super({
        "_id": "news_binhduong",
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
          "selector": "div.ngaycapnhat",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div#newscontents",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      "news_binhduong",
      "VN",
      "baobinhduong.vn/cn/",
      "duckduckgo"
    );
    this.description = '平陽報/binhduong News'
  }
}


module.exports = news_binhduong;