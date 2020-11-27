import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import CompanyHeaderBar from './components/CompanyHeaderBar/CompanyHeaderBar';
import CompanyProfilePage from './components/CompanyProfilePage/CompanyProfilePage'
import EditCompanyProfilePage from './components/CompanyProfilePage/EditCompanyProfilePage';
import CompanySignUp from './components/CompanySignUp/CompanySignUp';
import Login from './components/Login/Login';
import StudentProfile from './components/StudentProfile/StudentProfile';
import StudentSignUp from './components/StudentSignUp/StudentSignUp';
import Approve from './components/Admin/approve';
import ApprovePhotos from './components/Admin/ApprovePhotos';
import ApproveReviews from './components/Admin/ApproveReviews';
import ManageCompanies from './components/Admin/ManageCompanies';
import ShowCompanyReviews from './components/Admin/ShowCompanyReviews';
import stats from './components/Admin/stats';

class Main extends Component {
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Route path='/companyProfile' component={CompanyProfilePage}/>
                    <Route path='/editCompanyProfile' component={EditCompanyProfilePage}/>
                    <Route path='/companyHeaderBar' component={CompanyHeaderBar}/>
                    <Route path = "/companySignUp" component = {CompanySignUp} />
                    <Route path = "/studentSignUp" component = {StudentSignUp} />
                    <Route path = "/login" component = {Login} />
                    <Route path = "/studentProfile" component = {StudentProfile} />
                    <Route path = "/approve" component = {Approve} />
                    <Route path = "/approvePhotos" component = {ApprovePhotos} />
                    <Route path = "/approveReviews" component = {ApproveReviews} />
                    <Route path = "/manageCompanies" component = {ManageCompanies} />
                    <Route path = "/showCompanyReviews" component = {ShowCompanyReviews} />
                    <Route path = "/showStats" component = {stats} />
                </BrowserRouter>
            </div>
        )
    }
}

export default Main;