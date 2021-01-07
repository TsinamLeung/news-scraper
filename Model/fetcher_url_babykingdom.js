const fetcher_search_bar = require('./fetcher_search_bar')
const JSDOM = require('jsdom').JSDOM

class fetcher_url_babykingdom {
  constructor() {

  }
  /**
   * @param {string} keyword
   * @returns {string[]} array of url strings
   * @async
   */
  async fetchUrlList(keyword) {
    /**
     * 
     * @param {JSDOM} jsdom 
     * @param {string} selector css selector  
     * @returns {string[]}
     */
    function linkExtractor(jsdom, selector) {
      const ret = []
      for (let each of jsdom.window.document.querySelectorAll(selector)) {
        ret.push(each.getAttribute('href'))
      }
      return ret
    }

    function listSelector() {
      return 'h3.xs3 a'
    }

    // load page with JSDOM
    /**
     * 
     * @param {string} url 
     */
    async function loadOtherPage(url) {
      console.log(`[babykingdom search]loding page ${url}`)
      try {
        const jsdom = await JSDOM.fromURL(url)
        return await linkExtractor(jsdom, listSelector())
      } catch (error) {
        console.error("[Error][babykingdom search][loadOtherPage] JSDOM.fromURL")
        console.error(error)
      }
    }

    const content = await new fetcher_search_bar('#srchtxt', 'https://www.baby-kingdom.com/search.php').excuteSearch(keyword)
    const baseUrl = content.url
    const firstpageHtml = content.html
    const jsdom = new JSDOM(firstpageHtml)
    const urls = linkExtractor(jsdom, listSelector())
    const pages = []
    for (let each of jsdom.window.document.querySelectorAll('.btn-group.pagination-select option')) {
      if (!baseUrl) throw ('no base url for pagination!')
      const urlParser = new URL(baseUrl)
      urlParser.searchParams.set('page', each.getAttribute('value'))
      pages.push(urlParser.toString())
    }
    pages.shift() // remove the first page

    let parallelJob = 0
    for (let pageUrl of pages) {
      while (parallelJob > 3)
        await new Promise(resolve => setTimeout(resolve, 1500)).then()
      parallelJob += 1
      loadOtherPage(pageUrl)
        .then(ret => {
          if (!(!ret)) {
            ret.map(val => {
              urls.push(val)
              return val
            })
          }
          parallelJob -= 1
        })
    }
    while (parallelJob > 0)
      await new Promise(resolve => setTimeout(resolve, 1500)).then()
    // wait all the task finish their work
    return urls
  }
}

module.exports = fetcher_url_babykingdom