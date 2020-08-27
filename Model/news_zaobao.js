const fetcher_ddg = require('./fetcher_news_via_search_engine');

class news_zaobao extends fetcher_ddg {
  constructor(delay, pageLoaddelay, engine = 'bing') {
    super({
        "_id": "news_zaobao",
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
          "selector": "span.datestamp,h4.date-published",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "conttent",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.body-content,div.article-content-container,article-content-rawhtml",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_zaobao',
      'SG',
      'www.zaobao.com.sg',
      engine,
      'jsdom')
      this.description = '聯合早報/lianhe zaobao'
  }
}
module.exports = news_zaobao;