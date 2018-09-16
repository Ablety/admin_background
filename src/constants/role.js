/*
*Created by 2018/9/12
*Author:songzhikuan
*/

export const dataSource = [{
    key:0,
    index:'1',
    name: '测试1',
    roleDescription: '测试1',
    createTime:'2018/3/6',
    modifyTime:'2018/5/9',
}, {
    key:1,
    index:'2',
    name: '测试2',
    roleDescription: '测试2',
    createTime:'2018/3/6',
    modifyTime:'2018/5/9'
}];

export const columns = [{
    title: '序号',
    dataIndex: 'index',
    key: 'index',
}, {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '角色类型',
    dataIndex: 'roleType',
    key: 'roleType',
}, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
}, {
    title: '上次修改时间',
    dataIndex: 'modifyTime',
    key: 'modifyTime',
}];