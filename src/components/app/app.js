import Auth from '../auth/auth';
import LoginForm from '../../views/log-in/login-form';
import IssueList from '../../views/issue-list/issue-list';
import SingleIssue from '../../views/single-issue/singe-issue';
import ShowImage from '../../views/show-image/show-image';

import {Router, Route, Schema, Actions} from 'react-native-router-flux'

import React, {Navigator} from 'react-native';

class YouTrackMobile extends React.Component {
    constructor() {
        super();
        this.auth = new Auth();
        this.state = {};

        this.checkAuthorization();
    }

    checkAuthorization() {
        console.log('check auth')
        return this.auth.loadStoredAuthParams()
            .then((authParams) => Actions.IssueList({auth: this.auth, onLogOut: this.checkAuthorization.bind(this)}))
            .then(() => console.log('succ'))
            .catch(err => console.log('failed', err));
    }

    render() {
        return (
            <Router hideNavBar={true} >
                <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>

                <Route name="LogIn" schema="modal" component={() => <LoginForm auth={this.auth} onLogIn={this.checkAuthorization.bind(this)} initial={true}/>}/>
                <Route name="IssueList" title="Issues" component={IssueList}/>
                <Route name="ShowImage" title="Image" component={ShowImage}/>
                <Route name="SingleIssue" title="Issue" component={SingleIssue}/>
            </Router>
        );
    }
}


module.exports = YouTrackMobile;