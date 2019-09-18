const superagent = require("superagent"); // 发送网络请求获取DOM
const cheerio = require("cheerio"); // 获取DOM节点
const moment = require("moment")

function getOneContent() {
    return new Promise(function(resolve, reject) {
        let min = 1800
        let max = moment().diff(moment("2017-08-14"), 'days') + 1800; // 获取2017-08-14开始的内容
        let target = Math.floor(Math.random() * (max-min+1) +min); // 获取随机日期
        superagent.get(`http://wufazhuce.com/one/${target}`).end(function(err, res) {
            if(err) {
                console.log(err)
            }

            let $ = cheerio.load(res.text);

            let selectItem = $("#main-container .tab-content")[0];

            let data = {
                id:target,
                imgUrl: $(selectItem).find('.one-imagen img').attr("src"),
                tag: $(selectItem).find('.one-imagen-footer .one-imagen-leyenda').text().replace(/(^\s*)|(s*$)/g,""),
                content:$(selectItem).find('.one-cita-wrapper .one-cita').text().replace(/(^\s*)|(\s*$)/g, "")
            }

            resolve(data)
        })
    })
}

getOneContent().then(res => {
    console.log(res)
})