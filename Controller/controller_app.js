const path = require('path')
const debug = require('debug')
const parser = require('./filter')
// config loader
const loader = require('./loader')
// enable lowdb
const Datastore = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(__dirname, '..', 'db', 'db.json'))

const ParallelJobManager = require('./controller_parallel')
const listFetcherManager = new ParallelJobManager(2)

const db = Datastore(adapter)

let tracer = {}

// initialized lowdb
if (!db.has('news_data').value()) {
  db.set('news_data', []).write()
} else {
  db.unset('news_data')
    .write()
  db.set('news_data', []).write()
}


function listAllSource() {
  try {
    return loader.listAvailbleFetcher()
  } catch (error) {
    console.error(error)
  }
}
/**
 * 
 * @param {string} keyword 
 * @param {string} newsName 
 * @param {string} options 
 * options a json ``{timeLimit :'any' }`` timeLimit could be ``week`` ``day`` ``month`` ``year``
 */
async function fetchUrlList(keyword, newsName, options = {
  timeLimit: 'any'
}, engine = 'duckduckgo') {
  const fetcher = loader.getFetcher(newsName, 20, 500, engine)
  await listFetcherManager.getResource(3000, 100)
  fetcher.setOptions(options)
  fetcher.setKeyword(keyword)
  const results = await fetcher.fetchUrlList()
  // remove duplicate
  const sResults = new Set(results)
  console.log(newsName + " Fetching Over")
  listFetcherManager.releaseResource()
  return [...sResults]
}
async function fetchSingleResultByUrl(url, newsName) {
  tracer[url] = {
    status: 'running'
  }
  try {
    const fetcher = loader.getFetcher(newsName, 20, 500)
    const fetcherInfo = loader.getFetcherInfo(newsName)

    if (!fetcher || !fetcherInfo) {
      console.log("no " + newsName + " fetcher loaded!")
      tracer[url] = {
        status: 'failed'
      }
      return []
    }
    let rawData = await fetcher.fetchResultByUrl(url)
    if (rawData.length === 0) {
      console.log('[No result]failed Fetching: \x1B[31m'+ url + '\x1B[0m')
      tracer[url] = {
        status: 'failed'
      }
      return rawData
    }
    if (!parser.nullVerify(rawData, newsName)) {
      console.log('[Null Verify Not passed]failed Fetching: \x1B[31m'+ url + '\x1B[0m')
      tracer[url] = {
        status: 'failed'
      }
      return rawData
    }
    parser.parseDate(rawData, newsName)
    parser.parseContent(rawData, newsName)
    const result = {
      title: parser.getTitle(rawData, newsName),
      date: parser.getDate(rawData, newsName),
      content: parser.getContent(rawData, newsName),
      name: newsName,
      locale: fetcherInfo.locale,
      url: parser.getUrl(rawData, newsName),
      description: fetcherInfo.description
    }
    console.info("Pushing " + result.title + " to Database")
    // push into db
    db.get('news_data')
      .push(result)
      .write()
    tracer[url] = {
      status: "completed"
    }
    return result
  } catch (error) {
    console.error(error)
    tracer[url] = {
      status: 'failed'
    }
    return []
  }
}



function turnOnDebugMsg() {
  debug.enable('filter:index,web-scraper-headless:scraper,web-scraper-headless:index,web-scraper-headless:chrome-headless-browser')
}

function turnOnResultFeedback() {
  debug.enable('fetcher:index' + ',filter:index,web-scraper-headless:scraper,web-scraper-headless:index,web-scraper-headless:chrome-headless-browser')
}

function turnOffDebugMsg() {
  debug.disable()
}
exports.fetchSingleResultByUrl = fetchSingleResultByUrl
exports.fetchUrlList = fetchUrlList
exports.listAllNews = listAllSource
exports.turnOnDebugMsg = turnOnDebugMsg
exports.turnOffDebugMsg = turnOffDebugMsg
exports.turnOnResultFeedback = turnOnResultFeedback
exports.db = db
exports.tracer = tracer
