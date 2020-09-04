let Fetcher = require('./fetcher_search_engine');
const {
  prototype
} = require('web-scraper-headless/extension/scripts/Queue');
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
          "selector": "a",
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
      'url_bing',
      'jsdom',
      'https://www.bing.com/search?count=50&q=')
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
    this.resultLimit = +limit
  }
  setOptions(options) {
    const timeLimit = options.timeLimit
    const resultLimit = options.resultLimit
    this.args.push(this.resolveTimeLimit(timeLimit))
    this.setResultLimit(0 + resultLimit)
    super.setOptions(options)
  }
  resultFilter(result) {
    return result.map(it => ({
      link: it.link,
      snippet: it.snippet,
      'link-href': it['link-href']
    }))
  }
  pushResult(res) {
    this.resultQueue = this.resultQueue.concat(this.resultFilter(res))
  }
  async run() {

    function generatePagenationUrl(baseURL, resultLength) {
      // process the other page
      const nextPage = new URL(baseURL)
      const rNumPerPage = (nextPage.searchParams.get('first') - 1) || 0
      const pageNum = Math.floor(resultLength / rNumPerPage)
      console.info(`there're ${resultLength} result of bing`)
      console.info(`there're ${pageNum} pages of bing`)
      if (this.resultLimit == 0) {
        this.resultLimit = 20000
        // 先限到2萬 反正太多你都攞唔嗮。
      }

      let offset = rNumPerPage // first next page should be rNumperpage + 1
      const urls = []
      if (offset > 0) {
        while (offset < this.resultLimit && offset / rNumPerPage <= pageNum) {
          nextPage.searchParams.set('first', offset + 1)
          urls.push(nextPage.toString())
          offset += rNumPerPage
        }
      }
      return urls
    }

    //first page fetching
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
    const urls = generatePagenationUrl.call(this, firstPage[0]['next-href'], +(firstPage[0].result_num.replace(',', '')))
    if (urls.length > 0) {
      console.info("bing:fetching another page")
      let totalResult = []
      let running = 0
      while (urls.length > 0) {
        const url = urls.shift()
        this.updateStartURL(url)
        running += 1
        const runFunc = async () => {
          await super.run().then(ret => {
            totalResult = totalResult.concat(ret)
            running -= 1
          }).catch(() => {
            running -= 1
          })
        }
        if (running >= 10) {
          await runFunc()
        } else {
          runFunc()
        }
      }
      while (running > 0) {
        await new Promise(resolve => {
          setTimeout(resolve, 500)
        }).then()
      }
      return this.resultFilter(firstPage.concat(totalResult))
    }
    return this.resultFilter(firstPage)
  }
}

module.exports = fetcher_url_bing;

// function test() {

//   const bing = new fetcher_url_bing(20, 3000)
//   bing.setSite('www.hk01.com')
//   bing.setQuery("武漢")
//   bing.setOptions({
//     resultLimit: 800
//   })
//   // bing.setOptions({
//   //   timeLimit: 'day'
//   // })
//   console.log(bing.generateUrl())
//   bing.run().then(ret => {
//     // console.log(ret)
//     // console.log(ret.length)
//     console.log(bing.popResult().length)
//     console.log(bing.isResultEmpty())
//   })
// }
// console.error = () => {}
// test()