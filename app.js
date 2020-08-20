const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const serve = require('koa-static');
const appController = require('./Controller/controller_app');

const port = 3000;
const app = new Koa();
const router = new Router();

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
      } else if(!args['fetcher']){
        appController.fetchNews(args['keyword'], args['fetcher'], args['delay'], args['pageLoadDelay'])
      }
    }
  });

router.get('/function/:name', async (ctx, next) => {
  ctx.type = 'javascript/text'
  let name = ctx.params.name;
  console.log("Calling Function " + name);
  ctx.response.body = appController[name]();
});

app.use(serve('./static'))
app.use(router.routes());
app.listen(port);
console.log("Starting Server at Port: " + port);