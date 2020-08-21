let fetcher_common = require('./fetcher_common');
const debug = require('debug')('fetcher:index');
class fetcher_url_duckduckgo extends fetcher_common {

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
          "selector": "div.results",
          "multiple": false,
          "delay": "500",
          "clickElementSelector": "a.result--more__btn",
          "clickType": "clickMore",
          "discardInitialElements": "do-not-discard",
          "clickElementUniquenessType": "uniqueHTMLText"
        }, {
          "id": "ele",
          "type": "SelectorElement",
          "parentSelectors": ["more"],
          "selector": "div.result__body",
          "multiple": true,
          "delay": 0
        }, {
          "id": "link",
          "type": "SelectorLink",
          "parentSelectors": ["ele"],
          "selector": "a.result__a",
          "multiple": false,
          "delay": 0
        }, {
          "id": "snippet",
          "type": "SelectorText",
          "parentSelectors": ["ele"],
          "selector": "div.result__snippet",
          "multiple": false,
          "regex": "",
          "delay": 0
        }]
      },
      delay,
      pageLoaddedlay,
      "url_duckduckgo")
  }
  /**
   * 
   * @param {string} siteurl 
   * @param {string} keyword 
   */
  setSite(siteurl, keyword, options) {
    if (!options) {
      this.updateStartURL("https://duckduckgo.com/?q=" + encodeURI('site:') + encodeURI(siteurl) + "+" + encodeURI(keyword));
    } else {
      let timeOption = options['timeLimit'];
      switch (timeOption) {
        case 'year':
          timeOption = '&df=y';
          break;
        case 'day':
          timeOption = '&df=d';
          break;
        case 'week':
          timeOption = '&df=w';
          break;
        case 'month':
          timeOption = '&df=m';
          break;
        default:
          timeOption = '';
          break;
      }
      this.updateStartURL("https://duckduckgo.com/?q=" + encodeURI('site:') + encodeURI(siteurl) + "+" + encodeURI(keyword) + timeOption);
    }
  }
}
module.exports = fetcher_url_duckduckgo;