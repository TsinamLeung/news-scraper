const ListFetcher = require('../Model/fetcher_url_babykingdom')
const ThreadFetcher = require('../Model/fetcher_thread_babykingdom')
const Fourm_filter = require('./fourm_filter')

const path = require('path')
const YAML = require('yaml')
const CSV = require('json-2-csv')
const fs = require('fs')

async function doRun() {
  const configFile = fs.readFileSync('F:\\LWPlace\\Programming\\WEB\\Crawler\\fourm_crawler\\config_babykingdom.yaml', 'utf-8')
  const config = YAML.parse(configFile)
  const keyword = config.keyword
  const outputLocation = config.save_location || './'
  const date = new Date()
  const outputName = `${keyword}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
  const outputType = config.save_type || 'txt'
  const outputDelimiter = outputType == 'txt' ? '\t' : outputType == 'csv' ? ',' : ','
  const outputHeader = ['subject', 'user', 'content', 'post_time', 'url']
  const outputPath = path.join(outputLocation, `${outputName}.${outputType}`)
  // preload header
  try {
    fs.writeFileSync(outputPath, outputHeader.join(outputDelimiter) + '\n', {
      encoding: 'utf-8',
      flag: 'w'
    })
  } catch (error) {
    console.error("Failed to write Header to file")
    console.error(error)
    return
  }

  let working = 0
  let maxParallel = 2

  /**
   * result: {subject:string, user:string, post_time:string, content:string}
   */

  if (!keyword) {
    console.log("Please Spcify Keyword 請指定關鍵字")
    return
  }
  const list = new ListFetcher()
  const thread = new ThreadFetcher(babykingdom_sitemap)
  try {
    const urls = await list.fetchUrlList(keyword)
    for (let url of urls) {
      while (working >= maxParallel) {
        await new Promise(resolve => setTimeout(resolve, 1000)).then()
      }
      working += 1
      //dispatch job
      thread.fetchThread(url).then(result => {
        let data = []
        for (let each of result) {
          data.push({
            ...each,
            url: url
          })
        }
        try {

          data = data.filter(val => {
            if (!val) return false
            return !Fourm_filter.isNull(thread.name, val)
          })

          data = data.map(val => {
            return {
              subject: Fourm_filter.generalParse(Fourm_filter.parseSubject(thread.name, val)),
              user: Fourm_filter.generalParse(Fourm_filter.parseUser(thread.name, val)),
              content: Fourm_filter.generalParse(Fourm_filter.parseContent(thread.name, val)),
              post_time: Fourm_filter.generalParse(Fourm_filter.parsePostTime(thread.name, val)),
              url: val.url
            }
          })
        } catch (error) {
          console.error("Failed to Parsing babykingdom's data ")
          console.error(error)
        }

        if (data.length > 0) {
          try {
            console.log('\x1b[33m%s\x1b[0m', `Outputing ${data[0].subject}`)
            //end of data processing
            CSV.json2csvAsync(data, {
              delimiter: {
                field: outputDelimiter
              },
              prependHeader: false,
              excelBOM: true,
            }).then(dataString => {
              fs.writeFileSync(outputPath, dataString + '\n', {
                encoding: 'utf-8',
                flag: 'a',
              })
            })
          } catch (error) {
            console.error("Failed to output babykingdom's data")
            console.error(error)
            return
          }
        }

        //end of data output
        working -= 1

      })

    } // end of for (let url of urls)
    while (working >= maxParallel) {
      await new Promise(resolve => setTimeout(resolve, 1000)).then()
    }
  } catch (error) {
    console.error("Failed to fetching babykingdom")
    console.error(error)
  }
}


const babykingdom_sitemap = {
  "_id": "babykingdom_thread",
  "startUrl": [""],
  "selectors": [{
    "id": "subject",
    "type": "SelectorText",
    "parentSelectors": ["_root"],
    "selector": "a.thread-subject",
    "multiple": false,
    "regex": "",
    "delay": 0
  }, {
    "id": "page",
    "type": "SelectorText",
    "parentSelectors": ["_root"],
    "selector": ".btn-group.pagination-select button",
    "multiple": false,
    "regex": "",
    "delay": 0
  }, {
    "id": "post",
    "type": "SelectorElement",
    "parentSelectors": ["_root"],
    "selector": "div[id^=post_]",
    "multiple": true,
    "delay": 0
  }, {
    "id": "user",
    "type": "SelectorText",
    "parentSelectors": ["post"],
    "selector": ".username",
    "multiple": false,
    "regex": "",
    "delay": 0
  }, {
    "id": "content",
    "type": "SelectorHTML",
    "parentSelectors": ["post"],
    "selector": "[id^=postmessage]",
    "multiple": false,
    "regex": "",
    "delay": 0
  }, {
    "id": "post_time",
    "type": "SelectorText",
    "parentSelectors": ["post"],
    "selector": "[id^=authorposton] span",
    "multiple": false,
    "regex": "",
    "delay": 0
  }]
}

(() => {
  try {
    doRun()
  } catch (error) {
    console.error(error)
  }
})()