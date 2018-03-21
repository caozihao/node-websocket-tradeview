const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const WebSocket = require('ws');
var bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const wss = new WebSocket.Server({ server });
const wsOper = require('./wsOperation.js');
const config = require('./config');

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    wsOper.dealMessage(message, ws);
  });

});

app.use(router.routes());

server.listen(config.constant.PORT, () => {
  console.log(`Server listening at port ${config.constant.PORT}...`);
});