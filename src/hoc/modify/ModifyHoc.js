/**
 *Created by 2018/9/14
 *Author:songzhikuan
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {fetchData, messageData, passingData} from "../../action";
import * as Type from '../type';

const ModifyHoc = ({getItemUrl, modifyItemUrl, flag}) => (WrappedComponent) => {
    const mapStateToProps = state => {
        const {data, category} = state.passingData;
        console.log(data,category,flag);
        return {currentFetchModifyData: category === flag ? data : null};
    };
    const mapDispatchToProps = dispatch => ({
        fetchData: bindActionCreators(fetchData, dispatch),
        passingData: bindActionCreators(passingData, dispatch),
        sendMessage: bindActionCreators(messageData, dispatch),
    });

    @connect(mapStateToProps, mapDispatchToProps)
    class Demo extends React.Component {
        constructor(props) {
            super(props);
            this.backUrl = {
                getItemUrl,
                modifyItemUrl,
            };
            this.flag = flag;
        }

        /**
         *
         *@Title: fetchData
         *@Params: isPullToRefresh   布尔型，标识刷新方式，true代表下拉刷新，否则为上拉加载
         *@Description:              获取网路数据
         *@Author: songzhikuan
         *@Date: 2018/9/14
         *@return
         */
        fetchData = ({param, type}) => {
            switch (type) {
                case Type.HOC_GET_ITEM:
                    this._fetch(this.backUrl.getItemUrl, param, this.getItem);
                    break;
                case Type.HOC_MODIFY_ITEM:
                    this._fetch(this.backUrl.modifyItemUrl, param, this.modifyItem);
                    break;
                default:
            }
        };
        _fetch = (url, param, callback) => {
            const {fetchData} = this.props;
            fetchData({
                funcName: url,
                params: param
            }).then(callback)
        };
        modifyItem = (res) => {
            if (res && res.data && res.data.data && res.data.data.success) {
                const {sendMessage,history} = this.props;
                sendMessage && sendMessage({
                    haveRead: false,
                    msg: '修改成功！'
                }, 'success');
                history.goBack();
            }
        };
        getItem = (res) => {
            console.log("################### modify hoc #################", res);
            if (res) {
                const {passingData} = this.props;
                passingData(res, this.flag);
            }
        };

        render() {
            return <WrappedComponent {...this.props} fetch={this.fetchData} />
        }
    }

    return Demo;
};

export default ModifyHoc