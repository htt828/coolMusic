const moment = require('moment')

function timeAgo(publishDate) {
	let result = ''
	//console.log(setTime(publishDate))
	let publicTime = new Date(publishDate).getTime()//获得发表时间的毫秒数
	var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
	var hour = minute * 60;
	var day = hour * 24;
	var week = day * 7;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime(); //获取当前时间毫秒
	var diffValue = now - publicTime; //时间差
	if (diffValue < 0) {
		return;
	}
	var minC = diffValue / minute; //计算时间差的分，时，天，周，月
	var hourC = diffValue / hour;
	var dayC = diffValue / day;
	var weekC = diffValue / week;
	var monthC = diffValue / month;
	if (dayC >= 1 && dayC <= 6) {
		result = " " + parseInt(dayC) + "天前"
	} else if (hourC >= 1 && hourC <= 23) {
		result = " " + parseInt(hourC) + "小时前"
	} else if (minC >= 1 && minC <= 59) {
		result = " " + parseInt(minC) + "分钟前"
	} else if (diffValue >= 0 && diffValue <= minute) {
		result = "刚刚"
	} else {
		result = moment(new Date(publishDate)).format('YYYY-MM-DD HH:mm:ss')
	}
	return result
}

export default {
	timeAgo
}
