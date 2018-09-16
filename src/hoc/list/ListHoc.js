/**
*Created by 2018/9/12
*Author:songzhikuan
*/

import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {fetchData, messageData, pageListData} from "../../action";
import * as Type from '../type';
import {DEVELOPMENT} from "../../dev";

/**
*
*@Title: ListHoc
*@Params: Object.getListUrl,查询列表地址
*@Params: Object,getItemUrl,查询某项地址
*@Params: Object,delItemUrl,删除某项
*@Params: Object,delItemsUrl,删除多项
*@Params: Object,developData,测试数据
*@Params: Object,flag,当前HOC服务于谁，避免在众多HOC星球上迷失
*@Description: TODO
*@Author: songzhikuan
*@Date: 2018/9/14
*@return
*/
const ListHoc = ({getListUrl, getItemUrl, delItemUrl, delItemsUrl,developData=[], flag}) => {
    return (WrappedComponent) => {
        const mapStateToProps = state => {
            const {listData, category} = state.pageListInit;
            return {listData: category === flag ? listData : null};
        };
        const mapDispatchToProps = dispatch => ({
            pageListData: bindActionCreators(pageListData, dispatch),
            fetchData: bindActionCreators(fetchData, dispatch),
            sendMessage: bindActionCreators(messageData, dispatch),
        });

        @connect(mapStateToProps, mapDispatchToProps)
        class Demo extends React.Component {
            constructor(props) {
                super(props);
                this.backUrl = {
                    getListUrl,
                    getItemUrl,
                    delItemUrl,
                    delItemsUrl
                };
                this.flag = flag;
                this.developmentData=developData;
                this.dataSource = {
                    page: 1,//默认展示第一页数据
                    size: 10,//默认展示的数据长度
                    total: 0,//数据库列表长度
                    list: [],//列表待渲染数据
                    loading: true,//加载中
                };
            }

            componentDidMount() {
                if(DEVELOPMENT){
                    this.development();
                }else{
                    this.fetchData({type: Type.HOC_GET_LIST});
                }

            }
            development=()=>{
               if(this.developmentData&&this.developmentData.length>0){
                   const {pageListData} = this.props;
                   pageListData(this.dataSource, this.flag);
                   this.dataSource = {
                       page: 1,//默认展示第一页数据
                       size: 10,//默认展示的数据长度
                       total:this.developmentData.length,//数据库列表长度
                       list: this.developmentData,//列表待渲染数据
                       loading: false,
                   };
                   const t=setTimeout(()=>{
                       pageListData(this.dataSource, this.flag);
                       clearTimeout(t);
                   },3000);
               }
            };
            /**
             *
             *@Title: fetchData
             *@Params: Object
             *@Description:              获取网路数据
             *@Author: songzhikuan
             *@Date: 2018/9/12
             *@return
             */
            fetchData = ({type, param}) => {
                switch (type) {
                    case Type.HOC_GET_LIST:
                        this.getList(param);
                        break;
                    case Type.HOC_GET_ITEM:

                        break;
                    case Type.HOC_ADD_ITEM:

                        break;
                    case Type.HOC_DELETE_ITEM:
                        this.delItem(param);
                        break;
                    case Type.HOC_DELETE_ITEMS:
                        this.delItems(param);
                        break;
                    default:

                }
            };

            getList = ({page=undefined,keyword=undefined}={}) => {
                const {fetchData, pageListData} = this.props;
                const {size} = this.dataSource;
                this.dataSource.loading=true;
                pageListData(this.dataSource, this.flag);
                let url = this.backUrl.getListUrl;
                let params = {page: page?page:this.dataSource.page, size, keyword};
                fetchData&& fetchData({
                    funcName: url,
                    params: params,
                    stateName: url
                }).then((res) => {
                    console.log('############## list hoc #############',res);
                    if (res && res.data&&res.data.success&&res.data.data) {
                        this.dataSource = {
                            page: res.data.data.current,//默认展示第一页数据
                            size: res.data.data.size,//默认展示的数据长度
                            total: res.data.data.total,//数据库列表长度
                            list: res.data.data.records,//列表待渲染数据
                            loading: false,
                        };
                        pageListData(this.dataSource, this.flag);
                    }
                }).catch((error)=>{
                    console.log(error);
                    this.dataSource.loading=false;
                    pageListData(this.dataSource, this.flag);
                });
            };

            delItems = (param) => {
                this._del(this.backUrl.delItemsUrl, param);
            };
            delItem = (param) => {
                this._del(this.backUrl.delItemUrl, param);
            };

            _del = (url, param) => {
                const {fetchData,sendMessage} = this.props;
                fetchData&&fetchData({
                    funcName: url,
                    params: param,
                    stateName: url
                }).then((res) => {
                    console.log(res);
                    if (res&&res.data&&res.data.success) {
                        sendMessage&&sendMessage({
                            haveRead:false,
                            msg:'删除成功'
                        },'success');
                        const {list,page}=this.dataSource;
                        const offset=list.length===1&&page>1?1:0;//解决多页删除边界问题
                        this.fetchData({type: Type.HOC_GET_LIST,param:{page:page-offset}});
                    }
                });
            };

            render() {
                return <WrappedComponent {...this.props} fetch={this.fetchData} />
            }
        }

        return Demo;
    };
};
export default ListHoc