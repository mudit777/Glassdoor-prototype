import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AddJob from './components/AddJob/AddJob';
import AddSalary from './components/AddSalary/AddSalary';
import AddReview from './components/AddReview/AddReview';
import CompanyHeaderBar from './components/CompanyHeaderBar/CompanyHeaderBar';
import CompanyJobs from './components/CompanyJobs/CompanyJobs';
import CompanyProfilePage from './components/CompanyProfilePage/CompanyProfilePage'
import EditCompanyProfilePage from './components/CompanyProfilePage/EditCompanyProfilePage';
import CompanySignUp from './components/CompanySignUp/CompanySignUp';
import Login from './components/Login/Login';
import PostNewJob from './components/PostNewJob/PostNewJob';
import StudentActivity from './components/StudentActivity/StudentActivity';
import StudentInterviews from './components/StudentInterviews/StudentInterviews';
import StudentProfile from './components/StudentProfile/StudentProfile';
import StudentReviews from './components/StudentReviews/StudentReviews';
import StudentSignUp from './components/StudentSignUp/StudentSignUp';
import UpdateStudentProfile from './components/UpdateStudentProfile/UpdateStudentProfile';
import ViewAllCompanies from './components/ViewAllCompanies/ViewAllCompanies';
import ViewJobs from './components/ViewJobs/ViewJobs';
import Pdf from './components/Pdf/Pdf';

class Main extends Component {
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Route path='/companyProfile' component={CompanyProfilePage}/>
                    <Route path='/updateCompanyProfile' component={EditCompanyProfilePage}/>
                    <Route path='/companyHeaderBar' component={CompanyHeaderBar}/>
                    <Route path = "/companySignUp" component = {CompanySignUp} />
                    <Route path = "/studentSignUp" component = {StudentSignUp} />
                    <Route path = "/login" component = {Login} />
                    <Route path = "/postNewJob" component = {PostNewJob}/>
                    <Route path = "/addJob" component={AddJob}/>
                    <Route path = "/addSalary" component={AddSalary}/>
                    <Route path = "/studentProfile" component = {StudentProfile} />
                    <Route path = "/updateStudentProfile" component = {UpdateStudentProfile} />
                    <Route path = "/allCompanies" component = {ViewAllCompanies} />
                    <Route path = "/studentActivity" component = {StudentActivity} />
                    <Route path = "/addReview" component = {AddReview}/>
                    <Route path = "/studentReviews" component = {StudentReviews}/>
                    <Route path = "/studentInterviews" component = {StudentInterviews}/>
                    <Route path = "/allJobs" component = {ViewJobs} />
                    <Route path = "/companyJobs" component = {CompanyJobs} />
                    <Route path = "/pdf" component = {Pdf} />
                </BrowserRouter>
            </div>
        )
    }
}

export default Main;