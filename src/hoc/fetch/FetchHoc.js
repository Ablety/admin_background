/**
 *Created by 2018/9/14
 *Author:songzhikuan
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {fetchData, messageData, passingData} from "../../action";

/**
*
*@Title: funcName
*@Params: Object.fetchUrl 访问地址
*@Params: Object.flag    当前服务对象
*@Description: TODO
*@Author: songzhikuan
*@Date: 2018/9/14
*@return
*/
const FetchHoc = ({fetchUrl, flag}) => (WrappedComponent) => {
    const mapStateToProps = state => {
        const {data,category} = state.passingData;
        return {currentFetchData:category === flag?data:null};
    };
    const mapDispatchToProps = dispatch => ({
        fetchData: bindActionCreators(fetchData, dispatch),
        passingData: bindActionCreators(passingData, dispatch),
        sendMessage: bindActionCreators(messageData, dispatch),
    });

    @connect(mapStateToProps, mapDispatchToProps)
    class Demo extends React.Component {
        constructor(props){
            super(props);
            this.fetchUrl=fetchUrl;
            this.flag=flag;
        }

        /**
         *
         *@Title: fetchData
         *@Params:
         *@Description:              获取网路数据
         *@Author: songzhikuan
         *@Date: 2018/9/14
         *@return
         */
        fetchData = (params) => {
            const {fetchData, passingData,sendMessage} = this.props;
            fetchData&&fetchData({
                funcName: this.fetchUrl,
                params
            }).then((res) => {
                console.log("###################fetchhoc#################", res);
                if (res && res.data&&res.data.success) {
                    passingData&&passingData(res.data.data,this.flag);
                }
            }).catch((error)=>{
                console.log('fetch hoc',error);
                sendMessage&&sendMessage({
                    haveRead:false,
                    msg:'fetch hoc :请求失败！'
                },'error');
            })
        };

        render() {
            return <WrappedComponent {...this.props} fetch={this.fetchData} />
        }
    }
    return Demo;
};

export default FetchHoc