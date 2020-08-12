const fetcher = require('./fetcher_news_common')

class news_thaiembbeij extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_thaiembbeij",
        "startUrl": [],
        "selectors": [{
          "id": "each",
          "type": "SelectorElement",
          "parentSelectors": ["_root", "nxt"],
          "selector": "div.elementor-post__text",
          "multiple": true,
          "delay": 0
        }, {
          "id": "link",
          "type": "SelectorLink",
          "parentSelectors": ["each"],
          "selector": "a",
          "multiple": false,
          "delay": 0
        }, {
          "id": "nxt",
          "type": "SelectorLink",
          "parentSelectors": ["_root", "nxt"],
          "selector": "a.next",
          "multiple": true,
          "delay": 0
        }, {
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": "h1",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "date",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": "span.elementor-post-info__item--type-date",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": ".elementor-element-7f15827 div",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_thaiembbeij',
      'TH')
  }
  setKeyword(keyword) {
    this.updateStartURL("https://thaiembbeij.org/?s=" + encodeURI(keyword));
  }
}
module.exports = news_thaiembbeij;