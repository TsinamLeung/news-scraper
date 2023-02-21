const puppeteer = require('puppeteer')

class fetcher_search_bar {

  constructor(bar_selector, search_bar_url, timeout = 1200000, headless = false, showLog = false) {
    this.bar_selector = bar_selector
    this.search_bar_url = search_bar_url
    this.timeout = timeout
    this.headless = headless
    this.showLog = showLog
  }
  /**
   * 
   * @returns if success return result page html 
   * @param {string} keyword 
   */
  async excuteSearch(keyword) {
    if(this.showLog) {
      console.log("Starting browser 正在啟動瀏覽器")
      console.log("Do not operate the Browser within 120 Sesconds, Otherwise unexcepted error would occured")
      console.log("瀏覽器啟動後 在2分鐘內請不要操控 否則可能導致不可預料的錯誤")
      console.log("You could stop fetching by terminate browser or terminal")
      console.log("你可關閉瀏覽器或終端窗口以停止爬取")
    }
    const browser = await puppeteer.launch({
      timeout: this.timeout,
      headless: this.headless
    })
    try {
      const page = await browser.newPage()
      console.log(`loading ${this.search_bar_url}`)
      await page.goto(this.search_bar_url, {
          timeout: this.timeout,
          waitUntil: 'domcontentloaded'
        })
        .then(response => {
          if (!response.ok())
            throw Error("Cannot load url")
        })
      await page.addScriptTag({
        content: `document.querySelector('${this.bar_selector}').value = "${keyword}"`
      })
      await page.tap(this.bar_selector)
      await page.keyboard.press('Enter')
      await page.waitForNavigation({
        waitUntil: "domcontentloaded",
        timeout: this.timeout
      })
      let content = ""
      await page.content().then(str => {
        content = str
      })
      console.log("returning broswer result")
      return {
        url: page.url(),
        html: content
      }
    } catch (error) {
      console.error("Failed to Fetch by browser")
      await browser.close()
      console.error(error)
    } finally {
      await browser.close()
    }
  }
}

module.exports = fetcher_search_bar