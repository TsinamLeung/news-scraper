# usage

```javascript
// json参數必需
const news = require('./Model/news_tkb')({ keyword: "炎", delay: 800, pageLoadDelay: 2000 });
async function run() {
    let ret = await news.run();
    console.log(ret);
} 

run();
```