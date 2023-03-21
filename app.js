const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const cors = require('koa-cors')
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const appController = require('./Controller/controller_app');
const recoder = require('./Controller/controller_result')
// port from --port 8080
const port = process.argv[2] || 80
const app = new Koa();
const router = new Router();

app.use(cors())

errorBackup = console.error

router.get('/allowLog', async (ctx, next) => {
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
  console.error = errorBackup
  console.error("This is error Report!")
  await next()
})


appController.outputPath = function () {
  return {
    path: __dirname + '\\output\\'
  };
}

router.get('/', async (ctx, next) => {
  ctx.type = 'text/html;charset=utf-8';
  let htmlpath = path.join(__dirname, 'static', 'html', 'index.html');
  ctx.response.body = fs.readFileSync(htmlpath);
});

router.get('/newsData', async (ctx, next) => {
  ctx.type = 'application/json'
  const args = ctx.request.query;
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
  ctx.response.body = appController.getNewsDataFromDB(qName, qTitle, qContent, qLocale);
});

router.post('/urlLists', async (ctx, next) => {
  ctx.type = 'application/json'
  ctx.response.type = 200
  let args = ctx.request.body.params
  for (let each of args) {
    if (!each.engine) each.engine = 'duckduckgo'
    if (!each.timeLimit) each.timeLimit = 'any'
    if (!each.retryTime) each.retryTime = 3
    if (!each.keyword) {
      ctx.response.body = [];
      console.info('no Keyword!')
      return;
    }
    if (!each.news) {
      ctx.response.body = '[]';
      console.info('No news name !');
      return;
    }
    console.info("getting url list of " + each.news);
    appController.fetchUrlList(each.keyword, each.news.toLowerCase(), {
      timeLimit: each.timeLimit.toLowerCase(),
      resultLimit: +each.resultLimit,
      retry: +each.retryTime
    }, each.engine).then(res => {
      recoder.pushSearchResult(res)
    })
  }
  ctx.response.body = {
    status: "success"
  }
});
router.get('/urlLists', async (ctx, next) => {
  ctx.type = 'application/json'
  const ret = recoder.popSearchResult()
  ctx.response.body = ret
})
/**
 * post request
 * an json
 * {jobs: [{link-href: string,newsName: 'news_aNews.js'}]}
 */
router.post('/fetchJob', async (ctx, next) => {
  let req = ctx.request.body;
  const jobList = req.jobs
  ctx.response.status = 200
  //koa-bodyParser parsed it to json
  if (JSON.stringify(req) === '{}') {
    ctx.response.body = JSON.stringify({
      status: "Request Null Failed to Dispatch Job"
    });
    return;
  }
  ctx.response.type = 'application/json'
  ctx.request.body = {
    status: 'successed!'
  }
  for (const job of jobList) {
    setTimeout(() => {
      appController.fetchSingleResultByUrl(job['link-href'], job.newsName)
    }, 100)
  }
});

router.post('/fetchStatus', async (ctx) => {
  const query = ctx.request.body.params
  const url = query.url
  if (!url) {
    ctx.response.status = 404;
  } else {
    let ret = {}
    if (typeof (url) === 'string') {
      ctx.response.status = 200;
      ctx.response.body = {
        status: appController.tracer[url].status
      }
      return
    }
    for (const each of url) {
      const tracerStatus = appController.tracer[each] || 'null';
      ret[each] = tracerStatus
      ctx.response.status = 200;
      if (tracerStatus === 'completed' || tracerStatus === 'failed') {
        delete appController.tracer[each];
      }
    }
    ctx.response.body = ret;
  }
});

router.get('/function/:name', async (ctx, next) => {
  ctx.type = 'application/json'
  let name = ctx.params.name;
  console.log("Calling Function " + name);
  ctx.response.body = appController[name]();
});


console.error = () => { }

// appController.turnOnDebugMsg()
app.use(bodyParser());
app.use(serve('./static'));
app.use(router.routes());
app.listen(port);
console.log("Starting Server at Port: " + port);