/*
*Created by 2018/9/14
*Author:songzhikuan
*/
import React from 'react';
import {message} from "antd/lib/index";
import {messageData} from "../../action";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const MessageHoc = (WrappedComponent) => {
    const mapStateToProps = state => {
        return {appMessage:state.messageData};
    };
    const mapDispatchToProps = dispatch => ({
        sendMessage: bindActionCreators(messageData, dispatch)
    });

    @connect(mapStateToProps, mapDispatchToProps)
    class Demo extends React.Component {
        componentWillReceiveProps({appMessage}){
            if(appMessage){
                const {sendMessage}=this.props;
                const {messageData,messageData:{msg,haveRead}={},category}=appMessage;
                if(messageData&&!haveRead){
                    switch (category) {
                        case 'info':
                            message.info(msg);
                            break;
                        case 'warning':
                            message.warn(msg);
                            break;
                        case 'success':
                            message.success(msg);
                            break;
                        case 'error':
                            message.error(msg);
                            break;
                        default:
                    }
                    messageData.haveRead=true;
                    sendMessage(messageData,category)
                }
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }
    return Demo;
};

export default MessageHoc