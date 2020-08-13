const fetcher = require('./fetcher_news_via_search_engine');


class news_udn extends fetcher {

  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_udn",
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
          "selector": ".shareBar__info--author span,time.article-content__time,time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.article,section.article-content__editor,main,div#story_body_content",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_udn',
      'TW',
      'udn.com',
      'duckduckgo');
  }
}
module.exports = news_udn;