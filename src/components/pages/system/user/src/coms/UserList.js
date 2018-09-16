/**
 *Created by:2018/5/22
 *Author:songzhikuan
 */
import React from 'react';
import {Button, Input, Popconfirm, Table} from 'antd';
import {columns as Columns, dataSource as DataSource} from 'constants/user';

import './userList.less';
import {HandType} from "utils/type";
import {dateFormat} from "utils";
import ListHoc from "@hoc/list/ListHoc";
import * as Type from "@hoc/type";

const Search = Input.Search;
const FLAG='user_list';

@ListHoc({getListUrl:'backUser',getItemUrl:'',delItemUrl:'deleteUser',delItemsUrl:'deleteUsers',developData:DataSource,flag:FLAG})
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = Array.from(Columns);
        this.state = {
            selectedRows: null,
            selectedRowKeys: null,
        };
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: `, selectedRowKeys, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRows,
                    selectedRowKeys
                })
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        let hangdle = {
            title: '操作',
            dataIndex: 'operate_banner',
            className: 'back_user',
            render: (text, record, index) => {
                // console.log(record);
                const comStyle = {
                    margin: 'auto 10px'
                }
                return (
                    record != null ?
                        (
                            <div>
                                {[{icon: 'profile', type: HandType.LOOK, title: '查看'}, {
                                    icon: 'plus',
                                    type: HandType.UP,
                                    title: '修改'
                                }, {icon: 'delete', type: HandType.DEL, title: '删除'}].map((value, index) => {
                                    return value.type === HandType.DEL ?
                                        <Popconfirm key={'operation_user_' + index} title="确定删除?" okText='确定' cancelText='取消'
                                                    onConfirm={() => this.handle(value.type, record.id)}>
                                            <a href="#" style={comStyle}>{value.title}</a>
                                        </Popconfirm> :
                                        <a onClick={() => this.handle(value.type, record.id)} style={comStyle}
                                           key={'operation_user_' + index}>
                                            {value.title}
                                        </a>
                                })}
                            </div>


                        ) : null
                );
            }
        };
        this.columns.push(hangdle);
    }
    componentDidMount(){

    }
    handle = (type, id) => {
        const {history, fetch} = this.props;
        switch (type) {
            case HandType.ADD:
                history.push('/admin/system/userDdd');
                break;
            case HandType.BATCH_DEL:
                fetch&&fetch({type:Type.HOC_DELETE_ITEMS,param:{idsStr: JSON.stringify(id)}});
                break;
            case HandType.DEL:
                fetch&&fetch({type:Type.HOC_DELETE_ITEM,param:{id}});
                break;
            case HandType.UP:
                history.push(`/admin/system/userModify/${id}`);
                break;
            case HandType.LOOK:
                history.push(`/admin/system/userDetail/${id}`);
                break;
            default:
                break;
        }
    }
    transform = (data) => {
        if (data != null) {
            let arr = [];
            data.map((value, index) => {
                let dem0 = {
                    id: value.id,
                    key: value.id,
                    index: index + 1,
                    username: value.username,
                    name: value.name,
                    url: value.portrait,
                    usertype: value.backend ? '后台用户' : '前台用户',
                    sex: value.sex ? '女' : '男',
                    phone: value.phone,
                    idCard: value.idCard,
                    job: value.job,
                    createTime: dateFormat(value.gmtCreate),
                    modifyTime: dateFormat(value.gmtModified),
                };
                arr.push(dem0);
            });
            return arr;
        }
    };
    select = (keyword) => {
        this.getUsers({keyword:keyword.trim()===''?undefined:keyword});
    };
    pageChanged = (page=undefined) => {
        this.getUsers({page});
    };
    getUsers = ({page,keyword}) => {
        const {fetch}=this.props;
        fetch&&fetch({type:Type.HOC_GET_LIST,param:{page,keyword}});
    };

    render() {
        const {listData,...props} = this.props;
        const defaultStyle = {};
        const settings = {
            className: props["className"] + ' inner_UserList_container',
            style: defaultStyle
        };
        const {selectedRows, selectedRowKeys} = this.state;
        return (
            <div {...settings}>
                <div className="pageHeader">
                    <div>
                        <span>
                            用户管理
                        </span>
                    </div>
                </div>
                <div className='page_content'>
                    <div className='page_title'><span>用户列表</span></div>
                    <div className='page_search'>
                        <Search
                            placeholder="输入关键字搜索"
                            onSearch={value => this.select(value)}
                            size='small'
                            enterButton
                            style={{width: 270}}
                        />
                        {/*<Button className='check' onClick={this.select}>查询</Button>*/}
                    </div>
                    <div className='page_handle'>
                        {[{type: HandType.ADD, title: '新增'}, {
                            type: HandType.BATCH_DEL,
                            title: '批量删除'
                        }].map((value, index) => {
                            let com = value.type === HandType.BATCH_DEL ?
                                <Popconfirm key={'operation_user_' + index} title="确定删除?" okText='确定' cancelText='取消' onConfirm={(e) => {
                                    e.preventDefault();
                                    this.handle(value.type, selectedRowKeys)
                                }} key={`page_handle_${index}`}>
                                    <Button className='handle'>{value.title}</Button>
                                </Popconfirm>
                                : <Button className='handle' onClick={(e) => {
                                    e.preventDefault();
                                    this.handle(value.type, selectedRowKeys)
                                }} key={`page_handle_${index}`}>{value.title}</Button>
                            if (index == 1 && (selectedRows == null || selectedRows != null && selectedRows.length <= 0)) {
                                com = null
                            }
                            return com
                        })}
                    </div>
                    <div className="page_table">
                        {
                            listData&&<Table dataSource={this.transform(listData.list)}
                                             columns={this.columns}
                                             pagination={{
                                                 current: listData.page,
                                                 pageSize: parseInt(listData.size),
                                                 total: parseInt(listData.total),
                                                 onChange: this.pageChanged
                                             }}
                                             loading={listData.loading}
                                             className="user_list"
                                             rowSelection={this.rowSelection}

                            />
                        }
                    </div>
                </div>

            </div>
        )
    }
}



export default UserList;