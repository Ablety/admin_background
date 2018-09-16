/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Icon, Layout, Menu, Popover} from 'antd';
import SiderCustom from './SiderCustom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchData,} from "../../action";
import {bindActionCreators} from "redux";
import {ADMIN_ADDRESS} from '../../axios/config';
import defaultPortrait from '../../style/imgs/defaultPortrait.svg';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
        userInfo:null
    };
    componentDidMount() {
        const {fetchData}=this.props;
        // fetchData({
        //     funcName:'loginInfo',
        //     params:null,
        //     stateName:'loginInfo'
        // }).then((res)=>{
        //     // console.log(res);
        //     if(res.data.data){
        //         this.setState({
        //             userInfo: res.data.data.data
        //         });
        //         if(localStorage.getItem('userInfo')){
        //             localStorage.removeItem('userInfo');
        //         }
        //         localStorage.setItem('userInfo', JSON.stringify(res.data.data.data));
        //     }
        // });
    };
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout(e);
    };
    logout = (e) => {
        console.log("............logout...............",e)
        // e.preventDefault();
        const{fetchData}=this.props;
                        fetchData({
                            funcName:'logout',
                            params:null,
                            stateName:'logout'
                        }).then((res)=>{
                            if(res.data&&res.data.data&&res.data.data.success){
                                localStorage.removeItem('user');
                                localStorage.removeItem('authrization');
                            }
                        })
        this.props.history.push('/login')
        // this.props.history.replace('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    render() {
        const { responsive, path ,auth} = this.props;
        // console.log(this.props)
        const {userInfo}=this.state;
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="trigger custom-trigger" />
                        </Popover>
                    ) : (
                        <Icon
                            className="trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <SubMenu title={<span className="avatar"><img src={userInfo&&userInfo.portrait?ADMIN_ADDRESS+'/res'+userInfo.portrait:defaultPortrait} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {userInfo&&userInfo.username}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            <Menu.Item key="logout">退出登录</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                    .avatar > img{
                        width:40px;
                        height:40px;
                        border-radius: 50%;
                    }
                    .custom-trigger{
                        font-size: 18px;
                        line-height: 64px;
                        padding: 0 16px;
                        cursor: pointer;
                        -webkit-transition: color .3s;
                        -o-transition: color .3s;
                        transition: color .3s;
                    }
                `}</style>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const { responsive = {data: {}} ,auth = {data: {}}} = state.httpData;
    return {responsive};
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch)
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderCustom));
