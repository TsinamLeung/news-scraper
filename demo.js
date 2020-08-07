const webscraper = require('web-scraper-headless')

// visit github and retrieve last commit of all trending repo. 
// The sitemap depends on the actual DOM of github, so it might get outdated
const page_getter_govhk_sitemap = { "_id": "page_total_govhk", "startUrl": ["https://www.news.gov.hk/chi/search_result.html?query=狗&date_v=&date_last=&s_date=&e_date=&page="], "selectors": [{ "id": "total", "type": "SelectorText", "parentSelectors": ["_root"], "selector": "span.btnMaxNamber", "multiple": false, "regex": "\\d+", "delay": 0 }] }
const sitemap = {
    "_id": "news_gov_hk",
    "startUrl": ["https://www.news.gov.hk/chi/search_result.html?query=%E4%BA%BA&date_v=%23-1&date_last=%2330&s_date=&e_date=&page=1"],
    "selectors": [{
        "id": "content",
        "type": "SelectorElement",
        "parentSelectors": ["_root", "nxt_pge"],
        "selector": "div.result-card",
        "multiple": true,
        "delay": 0
    }, {
        "id": "details",
        "type": "SelectorLink",
        "parentSelectors": ["content"],
        "selector": ".d-inline a",
        "multiple": false,
        "delay": 0
    }, {
        "id": "title",
        "type": "SelectorText",
        "parentSelectors": ["content"],
        "selector": ".d-inline a",
        "multiple": false,
        "regex": "",
        "delay": 0
    }, {
        "id": "date",
        "type": "SelectorText",
        "parentSelectors": ["content"],
        "selector": ".d-flex div span:nth-of-type(2)",
        "multiple": false,
        "regex": "",
        "delay": 0
    }, {
        "id": "news_title",
        "type": "SelectorText",
        "parentSelectors": ["details"],
        "selector": "h1.news-title",
        "multiple": false,
        "regex": "",
        "delay": 0
    }, {
        "id": "news_date",
        "type": "SelectorText",
        "parentSelectors": ["details"],
        "selector": "span.news-date",
        "multiple": false,
        "regex": "",
        "delay": 0
    }, {
        "id": "news_content",
        "type": "SelectorText",
        "parentSelectors": ["details"],
        "selector": ".newsdetail-content",
        "multiple": false,
        "regex": "",
        "delay": 0
    }, {
        "id": "nxt_pge",
        "type": "SelectorLink",
        "parentSelectors": ["_root", "nxt_pge"],
        "selector": "a.card-pager-next",
        "multiple": true,
        "delay": 0
    }]
}
const options = {
    delay: 40,
    pageLoadDelay: 2000,
    browser: 'headless'
} // optional delay, pageLoadDelay and browser
console.log("scraping")

let debug = require('debug');


debug.enable('app:fetcher,web-scraper-headless:job,web-scraper-headless:scraper,web-scraper-headless:index,web-scraper-headless:chrome-headless-browser')


const news = require('./Model/news_tkb')({ keyword: "炎", delay: 800, pageLoadDelay: 2000 });
async function run() {
    let ret = await news.run();
    console.log(ret);
} 
run();