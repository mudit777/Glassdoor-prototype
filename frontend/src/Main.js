import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CompanySignUp from './components/CompanySignUp/CompanySignUp';
import Login from './components/Login/Login';

class Main extends Component {
    render(){
        return(
            <div>
                <Route path = "/companySignUp" component = {CompanySignUp} />
                <Route path = "/login" component = {Login} />
            </div>
        )
    }
}
export default Main;