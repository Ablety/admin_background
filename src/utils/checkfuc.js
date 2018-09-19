/*
*Created by 2018/7/18
*Author:songzhikuan
*/

const functionCheck=(func)=>{
    if(func&&typeof func === 'function'){
        return true;
    }else{
        console.error(func +" is not a function");
    }
};

export default functionCheck;