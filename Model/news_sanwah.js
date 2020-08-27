const fetcher = require('./fetcher_news_via_search_engine');

class news_sanwah extends fetcher {
  constructor(delay, pageLoaddelay, engine = 'bing') {
    super({
        "_id": "news_sanwah",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.h-title,div#ArticleTit,div#Title",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.mainCon,div#p-detail,div.content,div#Content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.laiyuan,span.h-time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_xinhua',
      'CN',
      'xinhuanet.com',
      'duckduckgo')
      this.description = '新華網/news xinhua'
  }

}
module.exports = news_sanwah;