const debug = require('debug');
const fs = require('fs');
const parser = require('./filter');
const csv = require('./controller_csv');


function listAllSource() {
  try {
    let results = fs.readdirSync(__dirname + '/../Model/');
    list = results.filter(function (value, index, array) {
      return value.match(/^news_/g);
    });
    return list;
  } catch (error) {
    console.error(error);
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
  csv.outputCSV(result, name);
  return results;
}

async function fetchAllNewsThenOutput(keyword, delay, pageLoaddelay) {
  let fetcher_list = listAllSource();
  let results = [];
  for (i in fetcher_list) {
    let result = await fetchNews(keyword, fetcher_list[i], delay, pageLoaddelay);
    results = results.concat(result);
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

exports.listAllNews = listAllSource;
exports.fetchNews = fetchNews;
exports.fetchAllNews = fetchAllNewsThenOutput;
exports.turnOnDebugMsg = turnOnDebugMsg;
exports.turnOffDebugMsg = turnOffDebugMsg;
exports.turnOnResultFeedback = turnOnResultFeedback;
