const webscraper = require('web-scraper-headless')

const sitemap = {

};
const options = {
  delay: 3000,
  pageLoadDelay: 3000,
  browser: 'headless'
} // optional delay, pageLoadDelay and browser
console.log("scraping")

let debug = require('debug');
debug.enable('filter:index,fetcher:index,web-scraper-headless:job,web-scraper-headless:scraper,web-scraper-headless:index,web-scraper-headless:chrome-headless-browser')
// webscraper(sitemap, {
//   delay: 20,
//   pageLoadDelay: 3000,
//   browser: 'headless'
// }).then(function (ret) {
//   console.log(ret);
// })
async function run() {
  const apple = require('./Model/news_'+'govhk');
  fetcher = new apple(20, 4000);
  fetcher.setKeyword('人');
  let result = await fetcher.run();
  console.log(result);
}
run();
// webscraper(sitemap, options).then(function (ret) {
//     console.log(ret);
// }).catch(function (err) {
//     console.log(err);
// }); 
