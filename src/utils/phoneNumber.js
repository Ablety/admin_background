/**
 *Created by 2018/9/19
 *Author:songzhikuan
 */
/**
*
*@Title: phoneNumber
*@Params: str)
*@Description: 号码正则验证
*@Author: songzhikuan
*@Date: 2018/9/22
*@return
*/
const phoneNumber = (str) => {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return myreg.test(str);
};
export default phoneNumber;