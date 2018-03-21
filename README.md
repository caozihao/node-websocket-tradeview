# node-websocket-tradeview

用node搭建的websocket服务，用来模拟请求（1，拉取历史数据；2.实时推送数据）渲染tradeview表格

## 启动


    npm install
    nodemon server.js  /  node server.js


## 说明

* 如果页面被刷新或者websocket被中断，需重启该服务 
* 数据是随机数，可以通过修改config里面的参数来修改数据
