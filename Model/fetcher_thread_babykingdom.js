const fetcher = require('./fetcher_common')

class Fetcher_thread_babykingdom extends fetcher {
  constructor(sitemap, delay = 100, pageLoadDelay = 2000) {
    super(sitemap, delay, pageLoadDelay, 'babykingdom', 'jsdom')
  }
  /**
   * 
   * @param {string} url 
   * 
   */
  async fetchThread(url) {
    /**
     * 
     * @param {string} baseURL 
     * @param {number} page 
     */
    function generatePage(baseURL, page = 1) {
      const ret = []
      if (page <= 1) return ret
      const urlParser = new URL(baseURL)
      for (let i = 2; i <= page; i++) {
        urlParser.searchParams.set('page', '' + i)
        ret.push(urlParser.toString())
      }
      return ret
    }

    console.log(`[fetcher_thread_babykingdom] fetching thread: ${url}`)
    const result = []
    const firstpage = await this.fetchSinglePage(url) // it should return Array

    // firstpage {subject,page,post_time,user}
    /*
    content:'如果餵人奶係未只可以食薑食蛋飲薑醋，但豬手豬腳唔食得？因為會塞奶？？<br>\n<img src="https://www.baby-kingdom.com/static/image/common/android_v2.gif?v=3.11.5&amp;b=201" onload="thumbImg(this)" alt="">'
    page:'\n\n\n\n\n\n\n\n 1 / 1 \n\n\n\n\n\n\n\n\n'
    post_time:'20-8-19 13:54'
    subject:'坐月餵人奶 可以食薑醋？'
    user:'\n蘇微\n\n'
    */

    if (firstpage.length == 0) {
      console.log(`fetcher_thread_babykingdom] failed fetching thread ${url}`)
      return []
    }
    let rawpage = firstpage[0].page || ''
    for(let val of firstpage) {
      result.push(val)
    }

    // "1 / 1"  .btn-group.pagination-select button
    rawpage = rawpage.trim().replace(/[\t ]/g, '')
    let page = rawpage.match(/(?<=\/)\d+/)
    if (!page) {
      console.log("fetcher_thread_babykingdom] pagination failed")
    } else {
      page = +page.shift()
      const followPages = generatePage(url, page)
      if (followPages.length > 0) {
        const parallelLimit = 3
        let working = 0
        for (let eachUrl of followPages) {
          while (working >= parallelLimit) {
            // wait
            await new Promise(resolve => {
              setTimeout(resolve, 1000)
            }).then()
          }
          working += 1
          this.fetchSinglePage(eachUrl)
            .then(res => {
              for(let val of res) {
                result.push(val)
              }
              working -= 1
            })
        }
        while (working >= parallelLimit) {
          // wait until all tasks finished
          await new Promise(resolve => {
            setTimeout(resolve, 1000)
          }).then()
        }
      }
    }
    return result
  }

  async fetchSinglePage(url, retrytime = 3) {
    this.updateStartURL(url)
    try {
      return await this.run()
    } catch (error) {
      console.error(error)
      console.log(`[fetcher_thread_babykingdom] retrying fetching thread ${url}`)
      if (retrytime > 0)
        return await this.fetchSinglePage(url, retrytime - 1)
      else
        return []
    }
  }
}

module.exports = Fetcher_thread_babykingdom