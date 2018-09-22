/**
 *Created by 2018/9/19
 *Author:songzhikuan
 */
/**
*
*@Title: httpUrl
*@Params:
*@Description: 获取url的参数
*@Author: songzhikuan
*@Date: 2018/9/22
*@return
*/
const httpUrl = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            _queryString[_pair[0]] = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};
export default httpUrl;