/**
 *Created by 2018/9/19
 *Author:songzhikuan
 */


//返回 01-12 的月份值
function getMonth(date) {
    let month;
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if (month < 10) {
        month = "0" + month;
    }
    return month;
}

//返回01-30的日期
function getDay(date) {
    let day;
    day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return day;
}


//返回小时
function getHours(date) {
    let hours;
    hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    return hours;
}

//返回分
function getMinutes(date) {
    let minute;
    minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    return minute;
}

//返回秒
function getSeconds(date) {
    let second;
    second = date.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }
    return second;
}
/**
*
*@Title: dateFormatToSimple
*@Params: longTypeDate,时间戳
*@Description: 返回形如1992-12-02的日期
*@Author: songzhikuan
*@Date: 2018/9/22
*@return
*/
export const dateFormatToSimple = (longTypeDate) => {
    let dateType = "";
    let date = new Date();
    date.setTime(longTypeDate);
    dateType += date.getFullYear();  //年
    dateType += "-" + getMonth(date); //月
    dateType += "-" + getDay(date);  //日
    return dateType;
};
/**
*
*@Title: dateFormat
*@Params: longTypeDate,时间戳
*@Description: 返回形如1992-12-02 13:08:49的日期
*@Author: songzhikuan
*@Date: 2018/9/22
*@return
*/
export const dateFormat = (longTypeDate) => {
    let datetimeType = "";
    let date = new Date();
    date.setTime(longTypeDate);
    datetimeType += date.getFullYear();  //年
    datetimeType += "-" + getMonth(date); //月
    datetimeType += "-" + getDay(date);  //日
    datetimeType += "  " + getHours(date);  //时
    datetimeType += ":" + getMinutes(date);   //分
    datetimeType += ":" + getSeconds(date);   //秒
    return datetimeType;
};

/**
*
*@Title: dateFormatHourAndMinute
*@Params: longTypeDate,时间戳
*@Description: 返回形如13:09的时间
*@Author: songzhikuan
*@Date: 2018/9/22
*@return
*/
export const dateFormatHourAndMinute =(longTypeDate)=> {
    let newDate = new Date();
    newDate.setTime(longTypeDate);
    return getHours(newDate)+":"+getMinutes(newDate);
};


