const fetcher = require('./fetcher_news_via_search_engine');


class news_people_cn extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_people_cn",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "h2,h1",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "span.mT10,div.lai,.box01 div.fl,div.artOri",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.article,#ozoom,div.box_con",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_people_cn',
      'CN',
      'people.com.cn/n1',
      'duckduckgo');
      this.description = '人民網/people cn'
  }
}
module.exports = news_people_cn;