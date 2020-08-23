const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const serve = require('koa-static');
const logger = require('koa-logger');
const appController = require('./Controller/controller_app');

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
router.get('/news', async (ctx, next) => {
  ctx.type = 'application/json'
  let args = ctx.request.query;
  console.log(args);
});
router.get('/urlLists', async (ctx, next) => {
  ctx.type = 'application/json'
  let args = ctx.request.query;
  if (!args['timeLimit']) args['timeLimit'] = 'any';
  if (!args['keyword']) {
    ctx.response.body = '[]';
    console.error('no Keyword!')
    return;
  }
  if (!args['news']) {
    ctx.response.body = '[]';
    console.error('No news name !');
    return;
  }
  console.log("get Url list of " + name);
  let lists = await appController.fetchUrlList(args['keyword'], args['news'].toLowerCase(), {
    timeLimit: args['timeLimit'].toLowerCase()
  });

  ctx.response.body = JSON.stringify(lists);
});

/**
 * post request
 * an json
 * {url: string,newsName: 'news_aNews.js'}
 */
router.post('/fetchJob', async (ctx, next) => {
  let req = ctx.request.body;
  ctx.response.type = 'application/json'
  req = JSON.parse(req);
  appController.fetcherSingleResultByUrl(req['url'], req['newsName']);
  ctx.response.body = "{status: '" + req['url'] + " dispatched to " + req['newsName'] + "'}";
});

router.get('/function/:name', async (ctx, next) => {
  ctx.type = 'application/json'
  let name = ctx.params.name;
  console.log("Calling Function " + name);
  ctx.response.body = appController[name]();
});

app.use(serve('./static'))
app.use(router.routes());
app.listen(port);
console.log("Starting Server at Port: " + port);
