/**
 *Created by:2018/5/22
 *Author:songzhikuan
 */
import React from 'react';
import './userDetail.less';
import portrait from '@/style/imgs/defaultPortrait.svg';
import return_icon from '@/style/imgs/return_icon.png';
import {dateFormat} from "utils";
import {ADMIN_ADDRESS} from "@/axios/config";
import FetchHoc from "@hoc/fetch/FetchHoc";

@FetchHoc({fetchUrl:'userInfo',flag:'userDetail'})
class UserDetail extends React.Component {

    componentDidMount() {
        const {fetch} = this.props;
        const {id} = this.props.match.params;
        fetch&&fetch(id);
    }

    render() {
        const {currentFetchData:userInfo,...props} = this.props;
        const defaultStyle = {};
        const settings = {
            className: props["className"] + ' inner_UserDetail_container',
            style: defaultStyle
        };
        let por = userInfo && userInfo.portrait != null ? ADMIN_ADDRESS + '/res' + userInfo.portrait : portrait;
        return (
            <div {...settings}>
                <div className="pageHeader">
                    <div>
                        <span>
                            用户管理
                        </span>
                    </div>
                    <div>
                        <span>用户详情</span>
                        <span style={{cursor: 'pointer'}} onClick={() => this.props.history.goBack()}>
                            <img alt="返回" src={return_icon} />
                        </span>
                    </div>
                </div>
                <div className="content">
                    <div className="portrait">
                        <img alt="头像" src={por} />
                    </div>
                    <div className="user_info">
                        <div className="label_key">
                            <div><label>账号：</label><label>{userInfo && userInfo.username}</label></div>
                            <div><label>名称：</label><label>{userInfo && userInfo.name}</label></div>
                            <div><label>用户类型：</label><label>{userInfo && userInfo.backend ? '后台用户' : '前台用户'}</label>
                            </div>
                            <div>
                                <label>角色：</label><label>{userInfo && userInfo.roleName ? userInfo.roleName : '暂无'}</label>
                            </div>
                            <div><label>性别：</label><label>{userInfo && userInfo.sex ? '女' : '男'}</label></div>
                            <div><label>手机号：</label><label>{userInfo && userInfo.phone}</label></div>
                            <div><label>身份证：</label><label>{userInfo && userInfo.idCard}</label></div>
                            <div><label>机构：</label><label>{userInfo && userInfo.orgName}</label></div>
                            <div><label>工作：</label><label>{userInfo && userInfo.job}</label></div>
                            <div><label>创建时间：</label><label>{userInfo && dateFormat(userInfo.gmtCreate)}</label></div>
                            <div><label>上次修改时间：</label><label>{userInfo && dateFormat(userInfo.gmtModified)}</label>
                            </div>
                            <div>
                                <label>修改人：</label><label>{userInfo && userInfo.modifier ? userInfo.modifier : '暂无'}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default UserDetail