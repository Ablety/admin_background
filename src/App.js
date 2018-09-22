import React, {Component} from 'react';
import {Layout, LocaleProvider} from 'antd';
import zhCN from './antdConfig/zh_CN';
import './style/index.less';
import dayjs from 'dayjs'
import {receiveData, screenData} from './action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Routes from './routes/index';
import 'moment/locale/zh-cn';
import SiderCustom from "./components/basic/SiderCustom";
import HeaderCustom from "./components/basic/HeaderCustom";
import MessageHoc from "./hoc/message/MessageHoc";
import {checkBrowser} from "./utils";
import {SIDE_MENU_WIDTH} from "./constants";

const {Content, Footer} = Layout;

const mapStateToProps = state => {
    const {auth = {data: {}}, responsive = {data: {}}} = state.httpData;
    return {
        auth,
        responsive,
    };
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
        year: dayjs().year()
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
    // 获取当前浏览器宽度并设置responsive管理响应式
    getClientWidth = () => {
        const {receiveData, screenData} = this.props;
        const {clientWidth, clientHeight} = document.body;
        // console.log(clientWidth,clientHeight);
        screenData({
            screenWidth: clientWidth,
            screenHeight: clientHeight
        }, 'screenData');
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        const {auth, responsive} = this.props;
        const {year} = this.state;
        const {clientWidth,clientHeight} = document.body;//直接获取，不从props中screenData取值，因为props中值更新的时候render已经被执行了ie9会报错，后面会考虑是否screenData全局变量是否还有存在的必要
        /*增加ie9样式 start */
        const browser = checkBrowser();//判断是否为ie9
        const ie9 = browser.type === 'IE' && browser.version === 9;
        const sideMenuWrap = ie9 && {className: 'box_style'};
        const contentWrap = ie9 && {className: 'box_style', style:{width:clientWidth - SIDE_MENU_WIDTH}};
        const footerWrap = ie9 && {className: 'footer_style'};
        /*增加ie9样式 end */
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} className={sideMenuWrap&&sideMenuWrap.className} />}
                <Layout style={Object.assign({},{flexDirection: 'column', position: 'relative'},contentWrap&&contentWrap.style)} id="admin_container" className={contentWrap&&contentWrap.className} >
                    <HeaderCustom toggle = {this.toggle} collapsed = {this.state.collapsed} user = {auth.data || {}} />
                    <Content style={{margin: '0 0px', overflow: 'initial'}}>
                        <LocaleProvider locale={zhCN}>
                            <Routes />
                        </LocaleProvider>
                    </Content>
                    <Footer style={{textAlign: 'center'}} className={footerWrap&&footerWrap.className}>
                        {
                            ` Admin ©${year} eeeffff Created by 850993286@qq.com`
                        }
                    </Footer>
                </Layout>
                <style>
                    {
                        `
                            .box_style{
                                float:left;
                                height:${clientHeight}px;
                                -webkit-box-sizing: border-box;/*浏览器前缀，兼容其他浏览器 chrome,safari*/
                                   -moz-box-sizing: border-box;/*firefox*/
                                    -ms-box-sizing: border-box;/*ie*/
                                     -o-box-sizing: border-box;/*opera*/
                                        box-sizing: border-box;
                            }
                            .footer_style{
                                position:absolute;
                                left:0;
                                bottom:0;
                                right:0;
                            }
                        `
                    }
                </style>

            </Layout>
        );
    }
}

