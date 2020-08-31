const path = require('path')
const debug = require('debug');
const fs = require('fs');
const parser = require('./filter');
const csv = require('./controller_csv');
// config loader
const loader = require('./loader')
// enable lowdb
const Datastore = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {
  trace
} = require('console');

const adapter = new FileSync('db/db.json');

const db = Datastore(adapter);
let tracer = {};

// initialized lowdb
if (!db.has('news_data').value()) {
  db.set('news_data', []).write();
} else {
  db.unset('news_data')
    .write();
  db.set('news_data', []).write();
}

function placeStopFlag() {
  this.stopFlag = true;
}

function listAllSource() {
  try {
    return loader.listAvailbleFetcher()
  } catch (error) {
    console.error(error);
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
  fetcher.setOptions(options);
  fetcher.setKeyword(keyword);
  const results = await fetcher.fetchUrlList();
  return results;
}
async function fetchSingleResultByUrl(url, newsName) {
  tracer[url] = {
    status: 'running'
  };
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
    let rawData = await fetcher.fetchResultByUrl(url);
    if (rawData.length === 0) {
      tracer[url] = {
        status: 'failed'
      }
      return rawData;
    }
    if (!parser.nullVerify(rawData, newsName)) {
      tracer[url] = {
        status: 'failed'
      }
      return rawData
    }
    parser.parseDate(rawData, newsName);
    parser.parseContent(rawData, newsName);
    const result = {
      title: parser.getTitle(rawData, newsName),
      date: parser.getDate(rawData, newsName),
      content: parser.getContent(rawData, newsName),
      name: newsName,
      locale: fetcherInfo.locale,
      url: parser.getUrl(rawData, newsName),
      description: fetcherInfo.description
    };
    // push into db
    db.get('news_data')
      .push(result)
      .write();
    tracer[url] = {
      status: "completed"
    }
    return result;
  } catch (error) {
    console.error(error)
    tracer[url] = {
      status: 'failed'
    }
    return [];
  }
}

async function fetchNews(keyword, name, delay, pageLoaddelay) {
  let newsFetcher = require('../Model/' + name);
  let fetcher = new newsFetcher(delay, pageLoaddelay);
  fetcher.setKeyword(keyword);
  let rawData = await fetcher.run();
  let results = [];
  //filter element with null field
  rawData = rawData.filter(function (value, _index, _array) {
    return parser.nullVerify(value, fetcher.name);
  });

  //parsing process
  rawData.forEach(function (value, _index, _arr) {
    parser.parseDate(value, fetcher.name);
    parser.parseContent(value, fetcher.name);
    results.push({
      title: parser.getTitle(value, fetcher.name),
      date: parser.getDate(value, fetcher.name),
      content: parser.getContent(value, fetcher.name),
      name: fetcher.name,
      locale: fetcher.locale,
      url: parser.getUrl(value, fetcher.name)
    });
  })
  console.log("Fetch finished " + name);
  console.log("outputing CSV of " + name);
  csv.outputCSV(results, name);
  return results;
}

async function fetchAllNewsThenOutput(keyword, delay, pageLoaddelay) {
  let fetcher_list = listAllSource();
  let results = [];
  for (let i in fetcher_list) {
    let result = await fetchNews(keyword, fetcher_list[i], delay, pageLoaddelay);
    results = results.concat(result);
    if (this.stopFlag) {
      this.stopFlag = false;
      console.log("Fetching Interrupted [Controller_app fetchAllNews] Current Progress: " + i + " of" + fetcher_list.length);
      break;
    }
  }
  console.log("Outputing CSV of All Results");
  csv.outputCSV(results, 'news_All');
  return results;
}

function turnOnDebugMsg() {
  debug.enable('filter:index,web-scraper-headless:scraper,web-scraper-headless:index,web-scraper-headless:chrome-headless-browser');
}

function turnOnResultFeedback() {
  debug.enable('fetcher:index' + ',filter:index,web-scraper-headless:scraper,web-scraper-headless:index,web-scraper-headless:chrome-headless-browser');
}

function turnOffDebugMsg() {
  debug.disable();
}
exports.fetchSingleResultByUrl = fetchSingleResultByUrl;
exports.fetchUrlList = fetchUrlList;
exports.listAllNews = listAllSource;
exports.fetchNews = fetchNews;
exports.fetchAllNews = fetchAllNewsThenOutput;
exports.turnOnDebugMsg = turnOnDebugMsg;
exports.turnOffDebugMsg = turnOffDebugMsg;
exports.turnOnResultFeedback = turnOnResultFeedback;
exports.placeStopFlag = placeStopFlag;
exports.stopFlag = false;
exports.db = db;
exports.tracer = tracer;