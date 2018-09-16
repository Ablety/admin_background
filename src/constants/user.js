/*
*Created by 2018/9/12
*Author:songzhikuan
*/
import React from 'react';
import defaultPortrait from '../style/imgs/defaultPortrait.svg';
import {ADMIN_ADDRESS} from "../axios/config";

export const dataSource = [{
    key:0,
    index:'1',
    username: '测试1',
    account:'test1',
    role: '测试1',
    url: null,
    organization:'org1',
    phone:'18302592103',
    email:'950993287@qq.com'
}, {
    key:1,
    index:'2',
    account:'test2',
    username: '测试2',
    role: '测试2',
    url: null,
    organization:'org2',
    phone:'13302592103',
    email:'345693287@qq.com'
}];

export const columns = [{
    title: '序号',
    dataIndex: 'index',
    key: 'index',
},{
    title: '头像',
    dataIndex: 'url',
    key: 'url',
    render: (text, record) => {
        let pUrl=ADMIN_ADDRESS+'/res/'+record.url;
        if(record.url==null){
            pUrl=defaultPortrait;
        }
        return(
            <div>
                <img style={{width:'46px',height:'46px',borderRadius:'8px'}} alt={'头像'} src={pUrl} />
            </div>)
    }
}, {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
} ,{
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
},{
    title: '角色',
    dataIndex: 'role',
    key: 'role',
},{
    title: '组织',
    dataIndex: 'organization',
    key: 'organization',
},{
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
},{
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
}
];
