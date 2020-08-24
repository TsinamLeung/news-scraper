const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const appController = require('./Controller/controller_app');
const {
  getContent
} = require('./Controller/filter');

const port = 3000;
const app = new Koa();
const router = new Router();

app.use(logger())
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  // allow access
  ctx.set('Access-Control-Allow-Origin', '*')
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

appController.outputPath = function () {
  return {
    path: __dirname + '\\output\\'
  };
}

router.get('/', async (ctx, next) => {
  ctx.type = 'text/html;charset=utf-8';
  let htmlpath = path.join(__dirname, 'static', 'html', 'mainpage.html');
  ctx.response.body = fs.readFileSync(htmlpath);
});

router.get('/dispatch',
  async (ctx, next) => {
    ctx.type = 'text/html;charset=utf-8';
    let htmlpath = path.join(__dirname, 'static', 'html', 'dispatch.html');
    let args = ctx.request.query;
    if (!args['keyword'] || !args['delay'] || !args['pageLoadDelay']) {
      ctx.response.body = '<h1>Empty Keyword!</h1><br /><h2>空關鍵詞！</h2>'
    } else {
      appController.turnOnDebugMsg();
      ctx.response.body = fs.readFileSync(htmlpath);
      console.log("Fetcher request Recived " + args['fetcher'])
      if (args['fetcher'] == 'all') {
        appController.fetchAllNews(args['keyword'], args['delay'], args['pageLoadDelay'])
      } else if (!(!args['fetcher'])) {
        appController.fetchNews(args['keyword'], args['fetcher'], args['delay'], args['pageLoadDelay'])
      }
    }
  });
router.get('/newsData', async (ctx, next) => {
  ctx.type = 'application/json'
  let args = ctx.request.query;
  let qName = args.name;
  let qTitle = args.title;
  let qContent = args.content;
  let qLocale = args.locale;
  if (!(!qTitle)) {
    qTitle = new RegExp(qTitle, "g");
  }
  if (!(!qContent)) {
    qContent = new RegExp(qContent, "g")
  }


  let ret = appController.db.read()
    .get('news_data')
    .filter(function (element) {
      let judgeName = false;
      let judgeTitle = false;
      let judgeContent = false;
      let judgeLocale = false;
      if (!qName) {
        judgeName = true;
      } else {
        judgeName = element.name == qName;
      }
      if (!qTitle) {
        judgeTitle = true;
      } else {
        judgeTitle = !(!element.title.match(qTitle));
      }
      if (!qContent) {
        judgeContent = true;
      } else {
        judgeContent = !(!element.content.match(qContent));
      }
      if (!qLocale) {
        judgeLocale = true;
      } else {
        judgeLocale = qLocale == element.locale;
      }
      return (judgeName && judgeTitle && judgeContent && judgeLocale)
    }).value();
  ctx.response.body = ret;
});

router.get('/urlLists', async (ctx, next) => {
  ctx.type = 'application/json'
  let args = ctx.request.query;
  if (!args['timeLimit']) args['timeLimit'] = 'any';
  if (!args['keyword']) {
    ctx.response.body = [];
    console.error('no Keyword!')
    return;
  }
  if (!args['news']) {
    ctx.response.body = '[]';
    console.error('No news name !');
    return;
  }
  console.log("get Url list of " + args.news);
  let lists = await appController.fetchUrlList(args.keyword, args.news.toLowerCase(), {
    timeLimit: args.timeLimit.toLowerCase()
  });

  ctx.response.body = lists;
});

/**
 * post request
 * an json
 * {url: string,newsName: 'news_aNews.js'}
 */
router.post('/fetchJob', async (ctx, next) => {
  let req = ctx.request.body;
  //koa-bodyParser parsed it to json
  if (JSON.stringify(req) === '{}') {
    ctx.response.body = JSON.stringify({
      status: "Request Null Failed to Dispatch Job"
    });
    return;
  }
  ctx.response.type = 'application/json'
  ctx.response.body = {
    status: req.url + "dispatched to " + req.newsName
  };
  appController.fetchSingleResultByUrl(req.url, req.newsName);
});

router.get('/statusJob', async (ctx) => {
  console.log(ctx.request.query.url);
  let url = ctx.request.query.url;
  if (!url) {
    ctx.response.status = 404;
  } else {
    let ret = appController.tracer[url];
    if (!ret) {
      ctx.response.status = 404;
    } else {
      ctx.response.status = 200;
      ctx.response.body = ret;
      if (ret.status === 'completed') {
        delete appController.tracer[url];
      }
    }
  }
});

router.get('/function/:name', async (ctx, next) => {
  ctx.type = 'application/json'
  let name = ctx.params.name;
  console.log("Calling Function " + name);
  ctx.response.body = appController[name]();
});

app.use(bodyParser());
app.use(serve('./static'));
app.use(router.routes());
app.listen(port);
console.log("Starting Server at Port: " + port);