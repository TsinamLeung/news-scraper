const fetcher = require('./fetcher_news_via_search_engine');


class news_singtao extends fetcher {
  constructor(delay, pageLoaddelay, engine = 'bing') {
    super({
        "_id": "news_singtao",
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
          "selector": "span.date",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".paragraphs",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_singtao',
      'HK',
      'std.stheadline.com article',
      engine,
      'jsdom')
      this.description = '星島日報/singtao daily'
  }
}
module.exports = news_singtao;