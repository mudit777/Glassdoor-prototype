import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import CompanyHeaderBar from './components/CompanyHeaderBar/CompanyHeaderBar';
import CompanyProfilePage from './components/CompanyProfilePage/CompanyProfilePage'
import EditCompanyProfilePage from './components/CompanyProfilePage/EditCompanyProfilePage';
import {Route} from 'react-router-dom';
import CompanySignUp from './components/CompanySignUp/CompanySignUp';
import Login from './components/Login/Login';

class Main extends Component {
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Route path='/companyProfile' component={CompanyProfilePage}/>
                    <Route path='/editCompanyProfile' component={EditCompanyProfilePage}/>
                    <Route path='/companyHeaderBar' component={CompanyHeaderBar}/>
                    <Route path = "/companySignUp" component = {CompanySignUp} />
                    <Route path = "/login" component = {Login} />
                </BrowserRouter>
            </div>
        )
    }
}

export default Main;