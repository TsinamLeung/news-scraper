const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const cors = require('koa-cors')
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const appController = require('./Controller/controller_app');
const {
  getContent
} = require('./Controller/filter');
const {
  time
} = require('console')

const port = 80;
const app = new Koa();
const router = new Router();
app.use(cors())
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
  let htmlpath = path.join(__dirname, 'static', 'html', 'index.html');
  ctx.response.body = fs.readFileSync(htmlpath);
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
    .uniqBy('url')
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
  if (!args.engine) args.engine = 'duckduckgo'
  if (!args.timeLimit) args.timeLimit = 'any';
  if (!args.keyword) {
    ctx.response.body = [];
    console.error('no Keyword!')
    return;
  }
  if (!args.news) {
    ctx.response.body = '[]';
    console.error('No news name !');
    return;
  }
  console.log("getting url list of " + args.news);
  let lists = await appController.fetchUrlList(args.keyword, args.news.toLowerCase(), {
    timeLimit: args.timeLimit.toLowerCase(),
    resultLimit: +args.resultLimit
  }, args.engine);

  ctx.response.body = lists;
});

/**
 * post request
 * an json
 * {url: string,newsName: 'news_aNews.js'}
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
      const tracerStatus = appController.tracer[each] || 'notExist';
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
if (!global.consoleSwitch) {
  console.error = () => {}
}
appController.turnOnDebugMsg()
app.use(bodyParser());
app.use(serve('./static'));
app.use(router.routes());
app.listen(port);
console.log("Starting Server at Port: " + port);