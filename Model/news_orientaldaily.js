const fetcher = require('./fetcher_news_via_search_engine');


class news_orientaldaily extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_orientaldaily",
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
          "selector": ".meta span,#story-stream-block-356856 .meta span",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "div.article,div#\\\"article_story_1\\\"",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_orientaldaily',
      'MY',
      'www.orientaldaily.com.my/news',
      'duckduckgo');
      this.description ='東方日報/oriental daily'
  }

}
module.exports = news_orientaldaily;