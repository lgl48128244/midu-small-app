function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  ascli: ascli
}

function ascli(params) {
  var md5 = require("./md5.js");
  var param = params.split("&");
  param.sort();
  var str = param.join("&") + "&key=wwdxreaderwhat0823";
  return md5.hex_md5(str).toUpperCase();
}