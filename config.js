const constant = {
  PORT: 3001, // 监听端口
  INTERVAL_TIME: 1000,//定时向前台发送请求间隔 1000 = 1秒
  HISTORY_DATA_LENGTH: 3000, //初始历史数据
  SPACE_TIME: 3, //每一段浮动几次后继续下一段
}



module.exports = {
  constant
}