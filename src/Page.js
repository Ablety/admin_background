import React, {Component} from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import App from './App';

export default class Page extends Component{

    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/admin/homepage"  />} />
                    <Route  path="/admin"  component={App} />/>
                    {/*<Route exact path="/exception"component={Exception500} />*/}
                </Switch>
            </Router>
        )
    }
}
