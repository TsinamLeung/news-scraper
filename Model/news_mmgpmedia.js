const fetcher = require('./fetcher_news_common');

class news_mmgpmedia extends fetcher {
  constructor(delay, pageLoaddelay) {
    super({
        "_id": "news_mmgpmedia",
        "startUrl": [],
        "selectors": [{
          "id": "ele",
          "type": "SelectorElement",
          "parentSelectors": ["_root"],
          "selector": "div.result-item",
          "multiple": true,
          "delay": 0
        }, {
          "id": "link",
          "type": "SelectorLink",
          "parentSelectors": ["ele"],
          "selector": "a",
          "multiple": false,
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
          "selector": "time",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "content",
          "type": "SelectorText",
          "parentSelectors": ["link"],
          "selector": "section[itemprop='articleBody']",
          "multiple": true,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddelay,
      'news_mmgpmedia',
      'MM'
    );
  }
  /**
   * 
   * @param {String} keyword 
   */
  setKeyword(keyword) {
    this.updateStartURL("http://www.mmgpmedia.com/search?searchword=" + encodeURI(keyword) + "&ordering=newest&searchphrase=all&limit=0")
  }
}
module.exports = news_mmgpmedia;