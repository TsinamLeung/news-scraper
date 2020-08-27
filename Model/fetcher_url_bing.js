let Fetcher = require('./fetcher_search_engine');
const debug = require('debug')('fetcher:index');
class fetcher_url_bing extends Fetcher {

  /**
   * 
   * @param {number} delay 
   * @param {number} pageLoaddedlay 
   */
  constructor(delay, pageLoaddedlay) {
    super({
        "_id": "url_bing",
        "startUrl": [],
        "selectors": [{
          "id": "ele",
          "type": "SelectorElement",
          "parentSelectors": ["_root"],
          "selector": "#b_results li.b_algo",
          "multiple": true,
          "delay": 0
        }, {
          "id": "title",
          "type": "SelectorText",
          "parentSelectors": ["ele"],
          "selector": "h2 a",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "snippet",
          "type": "SelectorText",
          "parentSelectors": ["ele"],
          "selector": "p",
          "multiple": false,
          "regex": "",
          "delay": 0
        }, {
          "id": "link",
          "type": "SelectorLink",
          "parentSelectors": ["ele"],
          "selector": "h2 a",
          "multiple": false,
          "delay": 0
        }, {
          "id": "result_num",
          "type": "SelectorText",
          "parentSelectors": ["_root"],
          "selector": "span.sb_count",
          "multiple": false,
          "regex": "\\b.+\\d\\b",
          "delay": 0
        }, {
          "id": "next",
          "type": "SelectorLink",
          "parentSelectors": ["_root"],
          "selector": "a.sb_pagN",
          "multiple": false,
          "delay": 0
        }]
      },
      delay,
      pageLoaddedlay,
      'jsdom',
      'https://www.bing.com/search?q=')
  }
  resolveTimeLimit(timeLimit = 'any') {
    let ret = 'filters='
    switch (timeLimit) {
      case 'day':
        ret += 'ex1%3a"ez1"'
        break
      case 'week':
        ret += 'ex1%3a"ez2"'
        break
      case 'month':
        ret += 'ex1%3a"ez3"'
        break
      default:
        ret = ''
        break
    }
    return ret
  }
  setResultLimit(limit = 0) {
    this.resultLimit = limit
  }
  setOptions(options) {
    const timeLimit = options.timeLimit
    const resultLimit = options.resultLimit
    this.args.push(this.resolveTimeLimit(timeLimit))
    this.setResultLimit(parseInt(resultLimit))
    super.setOptions(options)
  }
  async run() {
    console.info('Fetching url list via bing: Fetchting First Page')
    const firstPage = await super.run()
    if (firstPage.length == 0) {
      console.info('no result fetched on bing')
      return []
    }
    if (firstPage.length == 1) {
      console.info('no result fetched on bing')
      if (firstPage[0].result_num == null) {
        return []
      }
    }
    const nextPage = new URL(firstPage[0]['next-href'])
    const resultLength = firstPage[0].result_num.replace(',', '') + 0
    const rNumPerPage = (nextPage.searchParams.get('first') - 1) || 0
    const pageNum = Math.floor(resultLength / rNumPerPage)
    console.info(`there're ${resultLength} result of bing`)
    console.info(`there're ${pageNum} pages of bing`)
    if (this.resultLimit == 0) {
      this.resultLimit = 20000
      // 先限到2萬 反正太多你都攞唔嗮。
    }
    let offset = rNumPerPage // first next page should be rNumperpage + 1
    let urls = []
    if (offset > 0) {
      while (offset < this.resultLimit && offset / rNumPerPage <= pageNum) {
        nextPage.searchParams.set('first', offset + 1)
        urls.push(nextPage.toString())
        offset += rNumPerPage
      }
      this.updateStartURL(urls)
      console.info("bing:fetching another page")
      const totalResult = await super.run()
      return firstPage.concat(totalResult).map(it => ({
        title: it.title,
        snippet: it.snippet,
        'link-href': it['link-href']
      }))
    }
    return firstPage.map(it => ({
      title: it.title,
      snippet: it.snippet,
      'link-href': it['link-href']
    }))
  }
}
module.exports = fetcher_url_bing;

// function test() {

//   const bing = new fetcher_url_bing(20, 3000)
//   bing.setSite('www.hk01.com')
//   bing.setQuery("武漢")
//   bing.setOptions({
//     resultLimit: 100
//   })
//   // bing.setOptions({
//   //   timeLimit: 'day'
//   // })
//   console.log(bing.generateUrl())
//   bing.run().then(ret => {
//     console.log(ret)
//     console.log(ret.length)
//   })
// }