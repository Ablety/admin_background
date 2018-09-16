/**
 * Created by hao.cheng on 2017/4/28.
 */
// 获取url的参数
export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

export const isPoneAvailable = (str) => {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}

export const dateFormat_1 = (longTypeDate) => {
    let dateType = "";
    let date = new Date();
    date.setTime(longTypeDate);
    dateType += date.getFullYear();  //年
    dateType += "-" + getMonth(date); //月
    dateType += "-" + getDay(date);  //日
    return dateType;
}

//返回 01-12 的月份值
function getMonth(date) {
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if (month < 10) {
        month = "0" + month;
    }
    return month;
}

//返回01-30的日期
function getDay(date) {
    var day = "";
    day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return day;
}


export const dateFormat = (longTypeDate) => {
    var datetimeType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    datetimeType += date.getFullYear();  //年
    datetimeType += "-" + getMonth(date); //月
    datetimeType += "-" + getDay(date);  //日
    datetimeType += "  " + getHours(date);  //时
    datetimeType += ":" + getMinutes(date);   //分
    datetimeType += ":" + getSeconds(date);   //分
    return datetimeType;
}

//返回 01-12 的月份值
function getMonth(date) {
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if (month < 10) {
        month = "0" + month;
    }
    return month;
}

//返回01-30的日期
function getDay(date) {
    var day = "";
    day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return day;
}

export const time =(date)=> {
    var newDate = new Date();
    newDate.setTime(date);
    let result= getHours(newDate)+":"+getMinutes(newDate);
    console.log(result);
    return result;
}
//返回小时
function getHours(date) {
    var hours = "";
    hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    return hours;
}

//返回分
function getMinutes(date) {
    var minute = "";
    minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    return minute;
}

//返回秒
function getSeconds(date) {
    var second = "";
    second = date.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }
    return second;
}