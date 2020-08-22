const fetcher = require('./fetcher_news_common');

class news_sanwah extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_sanwah",
        "startUrl": [],
        "selectors": [{
          "id": "ele",
          "type": "SelectorElementClick",
          "parentSelectors": ["_root"],
          "selector": "div.news",
          "multiple": false,
          "delay": "500",
          "clickElementSelector": "a.next",
          "clickType": "clickMore",
          "discardInitialElements": "do-not-discard",
          "clickElementUniquenessType": "uniqueHTMLText"
        }, {
          "id": "title_search",
          "type": "SelectorText",
          "parentSelectors": ["ele"],
          "selector": "h2 a",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date_search",
          "type": "SelectorText",
          "parentSelectors": ["ele"],
          "selector": "span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "link",
          "type": "SelectorLink",
          "parentSelectors": ["ele"],
          "selector": "h2 a",
          "multiple": true,
          "delay": 0
        }, {
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": "div.h-title,div#ArticleTit,div#Title",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": "div.mainCon,div#p-detail,div.content,div#Content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": "div.laiyuan,span.h-time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_xinhua',
      'CN')
      this.updateStartURL = '新華網/news xinhua'
  }
  setKeyword(keyword) {
    this.updateStartURL("http://so.news.cn/#search/0/" + encodeURI(keyword) + "/1/")
  }
}
module.exports = news_sanwah;