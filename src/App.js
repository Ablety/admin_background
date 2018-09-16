import React, {Component} from 'react';
import {Layout, LocaleProvider} from 'antd';
import zhCN from './antdConfig/zh_CN';
import './style/index.less';
import {receiveData, screenData} from './action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Routes from './routes/index';
import 'moment/locale/zh-cn';
import SiderCustom from "./components/basic/SiderCustom";
import HeaderCustom from "./components/basic/HeaderCustom";
import MessageHoc from "./hoc/message/MessageHoc";

const {Content, Footer} = Layout;

const mapStateToProps = state => {
    const { auth = {data: {}}, responsive = {data: {}} } = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),
    screenData: bindActionCreators(screenData, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
@MessageHoc
export default class App extends Component {
    state = {
        collapsed: false,
    };

    componentWillMount() {
        this.getClientWidth();
        window.onresize = () => {
            // console.log('屏幕变化了');
            this.getClientWidth();
        }
    }

    componentDidMount() {

    }
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const {receiveData,screenData} = this.props;
        const {clientWidth,clientHeight} = document.body;
        // console.log(clientWidth,clientHeight);
        screenData({
            screenWidth:clientWidth,
            screenHeight:clientHeight
        },'screenData');
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        const {auth, responsive} = this.props;
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column', position: 'relative'}} id= "admin_container">
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} />
                    <Content style={{margin: '0 0px', overflow: 'initial'}}>
                        <LocaleProvider locale={zhCN}>
                            <Routes />
                        </LocaleProvider>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Admin ©2018 Created by 850993286@qq.com
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

