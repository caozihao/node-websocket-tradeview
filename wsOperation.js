

const utils = require('./utils');
const dayTime = 1000 * 60 * 60 * 24 //1天；
const hourTime = 1000 * 60 * 60;
const minuteTime = 1000 * 60;
const secondTime = 1000;

const defaultTime = new Date().getTime();

let Timer = null;
let defaultLength = 3000;

const dealMessage = (message, ws) => {
  let data = JSON.parse(message);
  let { type, period, from, to, baseCurrencyId, targetCurrencyId } = data;
  // 控制每次添加的时间数
  let step = utils.transformTime(period) / 3;
  // console.log('step ->', step);

  if (type === "kline") {
    console.log('kline......')
    const params = {
      step,
      length: defaultLength,
      type: "front",
      startTime: from,
      endTime: to
    }

    let result = utils.setRandomData(params);
    // console.log('from->', from);
    // console.log('to->', to);
    let returnData = {}
    let compareTime = defaultTime - 1 * minuteTime
    let compareDay = new Date(compareTime);

    // console.log('compareDay->', compareDay);
    console.log('period->', period);
    console.log('step->', step);
    if (compareDay >= from) {
      returnData = {
        "code": 0,
        "type": "kline",
        "data": {
          ...result
        }
      }

    } else {
      returnData = {
        "code": 0,
        "type": "kline",
        "data": {
          t: [],
          c: [],
          o: [],
          h: [],
          l: [],
          v: [],
          s: "ok"
        }
      }
    }

    // console.log('send kline');
    // 发送历史数据
    console.log('发送K线历史数据...');
    ws.send(JSON.stringify(returnData));

    if (Timer) {
      clearInterval(Timer);
    }
    console.log('建立定时器...');
    Timer = startRealtime(ws, params);
  }
}


// 定时发送实时数据
const startRealtime = (ws, params) => {
  // console.log('startRealtime ->');
  let { step, length, type, startTime, endTime } = params;
  let increasingNum = 0;
  let data = {}


  return setInterval(() => {
    increasingNum = ++increasingNum;
    let returnData = {}
    const _params = {
      step,
      length: 1,
      type: "back",
      increasingNum,
      startTime,
      endTime
    }

    result = utils.setRandomData(_params);
    // console.log('result ->', result);
    let { t, c, o, h, l, v } = result;
    returnData = {
      "code": 0,
      "type": "dealSuccess",
      "data": {
        "bidOrder": {
          "userCode": "",            //用户码
          "orderCode": "",           //订单码
          "orderType": "",           //订单类型  限价 市价
          "tradeType": "",           //交易类型
          "createdTime": t[0],   //创建时间
          "tradeFee": 0.9,           //交易费
          "dealPrice": h[0],      //成交价
          "dealEncryptCurrencyId": 1,    //基准货币的id
          "tradeEncryptCurrencyQuantity": v[0],  //交易量
          "tradeEncryptCurrencyId": 2,       //目标货币的id
          "isInitiator": 1       //是否吃单方, 0 : 否, 1 : 是
        },
        "askOrder": {
          "userCode": "",
          "orderCode": "",
          "orderType": "",
          "tradeType": "",
          "tradeFee": 0.9,
          "createdTime": t[0],
          "dealPrice": h[0],      //成交价
          "dealEncryptCurrencyId": 1,    //基准货币的id
          "tradeEncryptCurrencyQuantity": 17.0,  //交易量
          "tradeEncryptCurrencyId": v[0],       //目标货币的id
          "isInitiator": 0       //是否吃单方, 0 : 否, 1 : 是
        },
        kLine: {
          t: t[0],
          c: c[0],
          o: o[0],
          h: h[0],
          l: l[0],
          v: v[0],
          s: "ok"
        }
      }
    }
    ws.send(JSON.stringify(returnData));
  }, 1000)
}



module.exports = {
  dealMessage,

}

