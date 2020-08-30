const Fetcher = require('./fetcher_search_engine');
const debug = require('debug')('fetcher:index');
class fetcher_url_duckduckgo extends Fetcher {

  /**
   * 
   * @param {number} delay 
   * @param {number} pageLoaddedlay 
   */
  constructor(delay, pageLoaddedlay) {
    super({
        "_id": "url_duckduckgo",
        "startUrl": [],
        "selectors": [{
          "id": "more",
          "type": "SelectorElementClick",
          "parentSelectors": ["_root"],
          "selector": "div.links_main",
          "multiple": true,
          "delay": "1200",
          "clickElementSelector": "a.result--more__btn",
          "clickType": "clickMore",
          "discardInitialElements": "do-not-discard",
          "clickElementUniquenessType": "uniqueHTML"
        }, {
          "id": "link",
          "type": "SelectorLink",
          "parentSelectors": ["more"],
          "selector": "a.result__a",
          "multiple": false,
          "delay": 0
        }, {
          "id": "snippet",
          "type": "SelectorText",
          "parentSelectors": ["more"],
          "selector": "div.result__snippet",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["more"],
          "selector": "a",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]

      },
      delay,
      pageLoaddedlay,
      "url_duckduckgo",
      'headless',
      'https://duckduckgo.com/?q=')
  }
  setOptions(options) {
    super.setOptions(options)
    const timeLimit = options['timeLimit']
    switch (timeLimit) {
      case 'year':
        this.args.push('&df=y')
        break
      case 'day':
        this.args.push('&df=d')
        break
      case 'week':
        this.args.push('&df=w')
        break
      case 'month':
        this.args.push('&df=m')
        break
    }
  }
}
module.exports = fetcher_url_duckduckgo;