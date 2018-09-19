/**
 *Created by 2018/9/19
 *Author:songzhikuan
 */

const browser = ()=>{
    return !!window.ActiveXObject && document.documentMode === 9;
};
export default browser;