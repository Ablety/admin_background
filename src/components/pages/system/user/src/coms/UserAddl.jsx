/**
 *Created by:2018/5/22
 *Author:songzhikuan
 */
import React from 'react';
import './userAddl.less';
import {Button, Form, Icon, Input, message, Radio, Select} from 'antd';
import return_icon from 'style/imgs/return_icon.png';
import {fetchData} from "action";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const userType = [{label: '前台用户', backend: false}, {label: '后台用户', backend: true}]

class UserAddl extends React.Component {

    state = {
        data: null,
        image: null,//显示文件
        file: null,//上传的文件
        roles: null,
        orgs:null,
    };
    componentDidMount() {
        const {fetchData} = this.props;
        fetchData({
            funcName:'rolesAndOrgs',
            stateName:'rolesAndOrgs'
        }).then((res)=>{
            console.log(res);
            const returnV=res.data;
            if(returnV){
                let [roles,orgs]=returnV;
                this.setState({
                    roles:roles.data.data,
                    orgs:orgs.data.data
                })
            }
        })

    }

    handleSubmit = (e) => {
        const {fetchData} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = new FormData();
                const {file} = this.state;
                param.append('portraitImage', file);
                param.append('userData', JSON.stringify(values));
                // console.log('Received values of form: ', param.get('portraitImage'), param.get('userData'));
                fetchData({
                    funcName: 'addUser',
                    params: param,
                    stateName: 'addUser'
                }).then((res) => {
                    if (res.data.success) {
                        message.success('新增成功')
                        // console.log(res);
                        this.props.history.goBack();
                    }
                })
            }
        });
    };
    addFile = (e) => {
        // console.log(`addFile:`);
        document.getElementById('File').click();
        // e.preventDefault();
    };


    onChange = (pa) => {
        // console.log(`onChange:`);
        let file = document.getElementById('File').files[0];
        let reader = new FileReader();
        if (file != null) {
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                let image = e.target.result;
                // console.log(image);
                this.setState({
                    image,
                    file
                })
            }
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 8, offset: 1},
        };
        const {...props} = this.props;
        const defaultStyle = {};
        const settings = {
            className: props["className"] + ' inner_UserAddl_container',
            style: defaultStyle
        };

        const {image, roles,orgs} = this.state;
        return (
            <div {...settings}>
                <div className="pageHeader">
                    <div>
                        <span>
                            用户管理
                        </span>
                    </div>
                    <div>
                        <span>新增用户</span>
                        <span style={{cursor:'pointer'}} onClick={()=>this.props.history.goBack()} ><img src={return_icon} alt="头像" /></span>
                    </div>
                </div>
                <div className='content'>
                    <div className='portrait_con'>
                        <div className='portrait'>
                            {image != null ? <img src={image}/> : <div onClick={this.addFile}><Icon type="plus" /></div>}
                            {/*<div className='portrait_key'>头 像</div>*/}
                        </div>
                        <div className='por_handle'>
                            {image != null ? <Button className='xiugai' onClick={this.addFile}>修改</Button> :
                                <div>上传头像</div>}
                        </div>
                        <div className='por_file'>
                            <Input type='file' id='File' accept="image/*" onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className='user_info'>
                        <Form className='input_value' onSubmit={this.handleSubmit} style={{width: '100%'}}>
                            <FormItem
                                {...formItemLayout}
                                label="账号"
                                hasFeedback
                            >{getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        validator: (rule, value, callback) => {
                                            const {getFieldValue} = this.props.form;
                                            const {fetchData} = this.props;
                                            // console.log(rule, value, callback);
                                            const reg = /[A-Za-z0-9]+$/;
                                            if (getFieldValue('username') && !reg.test(getFieldValue('username'))) {
                                                callback('账号不能含有中文、空格')
                                                return;
                                            }
                                            if (getFieldValue('username') == null || getFieldValue('username') == '') {
                                                callback('请输入正确的账号')
                                            } else {
                                                fetchData({
                                                    funcName: 'checkName',
                                                    params: {
                                                        username: getFieldValue('username')
                                                    },
                                                    stateName: 'checkName'
                                                }).then((res) => {
                                                    if (res.data.data) {
                                                        callback('该账号已存在')
                                                    }
                                                    callback()
                                                })
                                            }
                                        },
                                    },
                                ],
                            })(
                                <Input className="ant-form-text" placeholder="请输入正确的账号!"/>
                            )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="名称"
                            >{getFieldDecorator('name', {
                                rules: [
                                    {required: true, message: '请输入名称'},
                                ],
                            })(
                                <Input className="ant-form-text" placeholder="请输入名称!"/>
                            )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="角色"
                                hasFeedback
                            >
                                {getFieldDecorator('roleId', {
                                    rules: [
                                        {required: true, message: '请选择角色!'},
                                    ],
                                })(
                                    <Select
                                        placeholder="请选择角色!"
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        getPopupContainer={() => document.getElementById('admin_container')}
                                    >
                                        {
                                            roles && roles.length > 0 && roles.map((value, index) => {
                                                return <Select.Option key={value.id}>{value.name}</Select.Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="机构"
                                hasFeedback
                            >
                                {getFieldDecorator('orgId', {
                                    rules: [
                                        {required: true, message: '请选择机构!'},
                                    ],
                                })(
                                    <Select
                                        placeholder="请选择机构!"
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        getPopupContainer={() => document.getElementById('admin_container')}
                                    >
                                        {
                                            orgs && orgs.length > 0 && orgs.map((value, index) => {
                                                return <Select.Option key={value.id}>{value.name}</Select.Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="性别"
                            >{getFieldDecorator('sex', {
                                initialValue: false,
                            })(
                                <RadioGroup>
                                    <Radio value={false}>男</Radio>
                                    <Radio value={true}>女</Radio>
                                </RadioGroup>
                            )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="密码"
                            >{getFieldDecorator('password', {
                                rules: [
                                    {required: true, message: '请输入密码!'},
                                ],
                            })(
                                <Input className="ant-form-text" placeholder="请输入密码!"/>
                            )}
                            </FormItem>

                            {/*<FormItem*/}
                                {/*{...formItemLayout}*/}
                                {/*label="工作单位"*/}
                            {/*>{getFieldDecorator('org', {*/}
                                {/*rules: [*/}
                                    {/*{required: true, message: '请输入工作单位'},*/}
                                {/*],*/}
                            {/*})(*/}
                                {/*<Input className="ant-form-text" placeholder="请输入工作单位!"/>*/}
                            {/*)}*/}
                            {/*</FormItem>*/}
                            <FormItem
                                {...formItemLayout}
                                label="职务"
                            >{getFieldDecorator('job', {
                                rules: [
                                    {required: true, message: '请输入职务'},
                                ],
                            })(
                                <Input className="ant-form-text" placeholder="请输入职务!"/>
                            )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="手机号"
                                hasFeedback
                            >{getFieldDecorator('phone', {
                                rules: [
                                    {required: true, message: '请输入正确的手机号', pattern: /^[1][3,4,5,7,8][0-9]{9}$/},
                                ],
                            })(
                                <Input className="ant-form-text" placeholder="请输入手机号!"/>
                            )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="身份证"
                            >{getFieldDecorator('idCard', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入身份证',
                                        pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                                    },
                                ],
                            })(
                                <Input className="ant-form-text" placeholder="请输入身份证!"/>
                            )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="用户类型"
                            >{getFieldDecorator('backend', {
                                rules: [
                                    {required: true, message: 'Please select a type'},
                                ],
                                initialValue: userType[0].backend
                            })(
                                <RadioGroup name="radiogroup">
                                    <Radio value={userType[0].backend}>{userType[0].label}</Radio>
                                    <Radio value={userType[1].backend}>{userType[1].label}</Radio>
                                </RadioGroup>
                            )}
                            </FormItem>

                            <FormItem
                                wrapperCol={{span: 17, offset: 7}}
                                style={{
                                    marginTop: 40
                                }}
                            >
                                <Button className='handle' type="primary" htmlType="submit">提交</Button>

                            </FormItem>
                        </Form>
                    </div>


                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch)
});

export default connect(null, mapDispatchToProps)(Form.create()(UserAddl));