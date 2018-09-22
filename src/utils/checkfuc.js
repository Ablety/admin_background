/*
*Created by 2018/7/18
*Author:songzhikuan
*/
/**
*
*@Title: functionCheck
*@Params: func
*@Description: 方法类型检测
*@Author: songzhikuan
*@Date: 2018/9/22
*@return
*/
const functionCheck=(func)=>{
    if(func&&typeof func === 'function'){
        return true;
    }else{
        console.error(func +" is not a function");
    }
};

export default functionCheck;