/**
 * Created by 叶子 on 2018/9/12.
 */
import {combineReducers} from 'redux';
import * as type from '../action/type';

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};

const screenData = (state = {}, action) => {
    switch (action.type) {
        case type.SCREEN_DATA:
            return {...state,...action.data};
        default:
            return {...state};
    }
};
/**
*
*@Title: passingData
*@Params: state
*@Params: action
*@Description: 数据过渡
*@Author: songzhikuan
*@Date: 2018/9/14
*@return
*/
const passingData = (state = {}, action) => {
    switch (action.type) {
        case type.PASSING_DATA:
            return {...state,data:action.data,category:action.category};
        default:
            return {...state};
    }
};

/**
 *
 *@Title: funcName
 *@Params: state
 *@Params: action
 *@Description:             用于列表页初始化
 *@Author: songzhikuan
 *@Date: 2018/9/5
 *@return
 */
const pageListInit=(state={listData:[],isFetching:false},action)=>{
    switch (action.type) {
        case type.PAGE_INIT:
            return {type:action.type,listData:action.data,isFetching:action.isFetching,category:action.category};
        default:
            return {...state};
    }
};
/**
 *
 *@Title: messageData
 *@Params: state
 *@Params: action
 *@Description: 消息通知
 *@Author: songzhikuan
 *@Date: 2018/9/13
 *@return
 */
const messageData = (state = {}, action) => {
    switch (action.type) {
        case type.SEND_MESSAGE:
            return {type: action.type, messageData: action.data,category:action.category};
        default:
            return {...state};
    }
};
export default combineReducers({
    httpData,
    screenData,
    pageListInit,
    messageData,
    passingData
});
