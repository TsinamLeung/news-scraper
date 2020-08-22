const fetcher = require('./fetcher_news_via_search_engine');

class news_mhwmm extends fetcher {

  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_mhwmm",
        "startUrl": [],
        "selectors": [{
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "td td td[width] center",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": ".top_m_txt01 center",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "td td td td [width] tr:nth-of-type(7) td",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_mhwmm',
      'MM',
      'www.mhwmm.com/Ch/NewsView.asp',
      'duckduckgo');
      this.description = '缅华网/mhwmm'
  };
}
module.exports = news_mhwmm;