const fetcher = require('./fetcher_news_via_search_engine');


class news_shinmin extends fetcher {

  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_shinimn",
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
          "selector": "span.datestamp",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "conttent",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.group-content-body",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_shinmin',
      'SG',
      'www.shinmin.sg',
      'duckduckgo');
  }
}
module.exports = news_shinmin;