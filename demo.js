const webscraper = require('web-scraper-headless')

// visit github and retrieve last commit of all trending repo. 
// The sitemap depends on the actual DOM of github, so it might get outdated
const page_getter_govhk_sitemap = {
    "_id": "page_total_govhk",
    "startUrl": ["https://www.news.gov.hk/chi/search_result.html?query=狗&date_v=&date_last=&s_date=&e_date=&page="],
    "selectors": [{
        "id": "total",
        "type": "SelectorText",
        "parentSelectors": ["_root"],
        "selector": "span.btnMaxNamber",
        "multiple": false,
        "regex": "\\d+",
        "delay": 0
    }]
}
const sitemap = {"_id":"test","startUrl":["https://duckduckgo.com/?q=site%3Ahttp%3A%2F%2Fwww.people.com.cn%2F+炎&t=hk&ia=web"],"selectors":[{"id":"scr","type":"SelectorElementClick","parentSelectors":["_root"],"selector":"div.results","multiple":true,"delay":2000,"clickElementSelector":"a.result--more__btn","clickType":"clickMore","discardInitialElements":"do-not-discard","clickElementUniquenessType":"uniqueText"},{"id":"each","type":"SelectorElement","parentSelectors":["scr"],"selector":"div.result__body","multiple":true,"delay":0},{"id":"text","type":"SelectorText","parentSelectors":["each"],"selector":"a.result__a","multiple":false,"regex":"","delay":0}]};
const options = {
    delay: 3000,
    pageLoadDelay: 3000,
    browser: 'headless'
} // optional delay, pageLoadDelay and browser
console.log("scraping")

let debug = require('debug');


debug.enable('app:fetcher,web-scraper-headless:job,web-scraper-headless:scraper,web-scraper-headless:index,web-scraper-headless:chrome-headless-browser')

async function run() {
    const news = require('./Model/news_khmer')({
        keyword: "人",
        delay: 200,
        pageLoadDelay: 2000
    });
    let result  = await news.run();
    console.log(result);
}
run();
// webscraper(sitemap, options).then(function (ret) {
//     console.log(ret);
// }).catch(function (err) {
//     console.log(err);
// }); 