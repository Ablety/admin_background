/**
 *Created by 2018/9/19
 *Author:songzhikuan
 */
 const phoneNumber = (str) => {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return myreg.test(str);
};
 export default phoneNumber;