const JSDOM = require('jsdom').JSDOM

class Fourm_filter {

  /**
   * 
   * @param {string} name 
   * @param {Object} data 
   * @returns {string}
   */
  static getContent(name, data) {
    if (!data) return ''
    switch (name) {
      default:
        return data.content || ''
    }
  }
  /**
   * 
   * @param {string} name 
   * @param {Object} data 
   * @returns {string}
   */
  static getUser(name, data) {
    if (!data) return ''
    switch (name) {
      default:
        return data.user || ''
    }
  }
  /**
   * 
   * @param {string} name 
   * @param {Object} data 
   * @returns {string}
   */
  static getPostTime(name, data) {
    if (!data) return ''
    switch (name) {
      default:
        return data.post_time || ''
    }
  }
  /**
   * 
   * @param {string} name 
   * @param {Object} data 
   * @returns {string}
   */
  static getSubject(name, data) {
    if (!data) return ''
    switch (name) {
      default:
        return data.subject
    }
  }
  /**
   * 
   * @param {string} name 
   * @param {Object} data 
   */
  static parseContent(name, data) {
    switch (name) {
      case 'babykingdom': {
        const content = this.getContent(name, data)
        const jsdom = new JSDOM(content)
        const contentElement = jsdom.window.document.body.firstChild // if not <span> then #text
        const firstC = contentElement.firstChild
        if (!firstC) return contentElement.textContent
        if (firstC.nodeName == 'DIV') { // <div class='quote'>
          if (firstC.classList.contains('quote')) {
            contentElement.removeChild(firstC)
          }
        }
        return contentElement.textContent
      }
    }
    return this.getContent(name, data)
  }
  /**
   * 
   * @param {string} name 
   * @param {Object} data 
   */
  static parsePostTime(name, data) {
    return this.getPostTime(name, data)
  }
  /**
   * 
   * @param {string} name 
   * @param {Object} data 
   */
  static parseSubject(name, data) {
    return this.getSubject(name, data)
  }
  /**
   * 
   * @param {string} name 
   * @param {Object} data 
   */
  static parseUser(name, data) {
    return this.getUser(name, data)
  }
  /**
   * 
   * @param {string} name 
   * @param {Object} data 
   */
  static isNull(name, data) {
    if (!data) return true
    return (!this.getContent(name, data) || !this.getPostTime(name, data) || !this.getSubject(name, data) || !this.getUser(name, data))
  }
  /**
   * do this at the end of parsing
   * @param {string} input
   */
  static generalParse(input) {
    /**
     * @param {string} s
     */
    if (!input) return ''

    function trimming(s) {
      return s.trim().replace(/[\n,\t"]/g, ' ')
    }
    return trimming(input)
  }

}

module.exports = Fourm_filter