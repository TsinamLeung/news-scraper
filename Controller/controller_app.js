const debug = require('debug');
const fs = require('fs');
const parser = require('./filter');

function listAllSource() {
  let results = fs.readddirSync('../Model/');
  list = results.filter(function (value, index, array) {
    return value.match(/^news_/g);
  });
  return list;
}

async function fetchNews(keyword, name, delay, pageLoaddelay) {
  let newsFetcher = require('../Model/' + name);
  let fetcher = new newsFetcher(delay, pageLoaddelay);
  fetcher.setKeyword(keyword);
  let rawData = await fetcher.run();
  let results = [];
  //filter element with null field
  rawData.filter(function (value, _index, _array) {
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
  return results;
}

async function fetchAllNews(keyword, delay, pageLoaddelay) {
  let fetcher_list = listAllSource();
  let results = [];
  fetcher_list.forEach(async function (value, _index, _arr) {
    let result = await fetchNews(keyword, delay, pageLoaddelay);
    results = results.concat(result);
  });
  return results;
}

function turnOnDebugMsg() {
  debug.enable('filter:index,fetcher:index,web-scraper-headless:scraper,web-scraper-headless:index,web-scraper-headless:chrome-headless-browser');
}

function turnOffDebugMsg() {
  debug.disable();
}

exports.listAllNews = listAllSource;
exports.fetchNews = fetchNews;
exports.fetchAllNews = fetchAllNews;
exports.turnOnDebugMsg = turnOnDebugMsg;
exports.turnOffDebugMsg = turnOffDebugMsg;