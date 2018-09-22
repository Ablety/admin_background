/**
 *Created by 2018/9/19
 *Author:songzhikuan
 */


/**
*
*@Title: _checkType
*@Params:
*@Description: 检测浏览器类型
*@Author: songzhikuan
*@Date: 2018/9/21
*@return
*/
const _checkType = () => {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1;
    //判断是否Opera浏览器
    if (isOpera) {
        return {type:"Opera",version:-1};
    }//判断是否Firefox浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return {type:"FF",version:-1};
    } //判断是否Chrome浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return {type:"Chrome",version:-1};
    }//判断是否Safari浏览器
    if (userAgent.indexOf("Safari") > -1) {
        return {type:"Safari",version:-1};
    } //判断是否IE浏览器
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return {type:"IE",version:document.documentMode};
    }
    // if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {//解决不了ie11，舍弃
    //
    //     return {type:"IE",version:_ieType()};
    // }

    return {type:undefined,version:-1};
};
/**
*
*@Title: _ieType
*@Params:
*@Description: 检测ie版本
*@Author: songzhikuan
*@Date: 2018/9/21
*@return
*/
const _ieType = () => {
    if (navigator.appName === "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") === "MSIE6.0") {
        return 6;
    }
    else if (navigator.appName === "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") === "MSIE7.0") {
        return 7;
    }
    else if (navigator.appName === "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") === "MSIE8.0") {
        return 8;
    }
    else if (navigator.appName === "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") === "MSIE9.0") {
        return 9;
    }
    else if (navigator.appName === "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") === "MSIE10.0") {
        return 10;
    }

};

const browser = () => {
    return _checkType();
};
export default browser;