/**
 *Created by:2018/5/8
 *Author:songzhikuan
 */
import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import {UserAddl, UserDetail, UserList, UserModify} from '../components/pages/system/user/src';

export default class CRouter extends Component {

    render() {
        return (
            <Switch>

                <Route exact path="/admin/homepage" component={HomePage} />
                <Route exact path="/admin/system/userList" component={UserList} />
                <Route exact path="/admin/system/userDetail/:id" component={UserDetail} />
                <Route exact path="/admin/system/userDdd" component={UserAddl} />
                <Route exact path="/admin/system/userModify/:id" component={UserModify} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}