const fetcher = require('./fetcher_news_via_search_engine')

class news_thaiembbeij extends fetcher {
  constructor(delay, pageLoaddelay, engine = 'bing') {
    super({
        "_id": "news_thaiembbeij",
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
          "selector": "span.elementor-post-info__item--type-date",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".elementor-element-7f15827 div",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_thaiembbeij',
      'TH',
      'thaiembbeij.org/cn',
      engine,
      'jsdom')
      this.description = '泰國駐北京大使館/thai embassy in beijing'
  }

}
module.exports = news_thaiembbeij;