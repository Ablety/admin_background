/**
 * Created by songzhikuan on 2018/7/17.
 */
import * as type from './type';
import * as http from '../axios/index';

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});

export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});
/**
*
*@Title: passingData
*@Params: data
*@Params: category
*@Description:       普通数据刷新
*@Author: songzhikuan
*@Date: 2018/9/14
*@return
*/
export const passingData = (data, category) => ({
    type: type.PASSING_DATA,
    data,
    category
});

/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 * @param stateName
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    if (!http[funcName]) {
        const msg = '后端地址有误';
        dispatch(
            messageData(
                {
                    haveRead:false,
                    msg
                },
                'warning'
            )
        );
        return new Promise((resolve, reject) => {
            reject(msg);
        })
    } else {
        dispatch(requestData(stateName));
        return http[funcName](params);
    }
};

/**
*
*@Title: screenData
*@Params: data
*@Params: category
*@Description: 派发窗口大小事件
*@Author: songzhikuan
*@Date: 2018/9/12
*@return
*/
export const screenData = (data, category) => ({
    type: type.SCREEN_DATA,
    data,
    category
});


/**
 *
 *@Title: pageListData
 *@Params: data
 *@Params: category     bool 类型，代表网路请求数据是否完成
 *@Description:         用户分发初始化列表数据
 *@Author: songzhikuan
 *@Date: 2018/9/5
 *@return
 */
export const pageListData = (data, category,isFetching) => ({
    type: type.PAGE_INIT,
    data,
    isFetching,
    category
});

/**
 *
 *@Title: messageData
 *@Params: data
 *@Params: category
 *@Description: 发送消息
 *@Author: songzhikuan
 *@Date: 2018/9/13
 *@return
 */
export const messageData = (data, category) => ({
    type: type.SEND_MESSAGE,
    data,
    category
});