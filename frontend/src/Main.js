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
import StudentApplications from './components/StudentApplications/StudentApplications';
import StudentActivity from './components/StudentActivity/StudentActivity';
import StudentInterviews from './components/StudentInterviews/StudentInterviews';
import StudentProfile from './components/StudentProfile/StudentProfile';
import StudentReviews from './components/StudentReviews/StudentReviews';
import StudentSignUp from './components/StudentSignUp/StudentSignUp';
import UpdateStudentProfile from './components/UpdateStudentProfile/UpdateStudentProfile';
import ViewAllCompanies from './components/ViewAllCompanies/ViewAllCompanies';
import ViewJobs from './components/ViewJobs/ViewJobs';
import CompanyProfilePageForUser from './components/CompanyProfilePage/CompanyProfilePageForUser';
import Report from './components/Report/Report';
import ShowApplicants from './components/CompanyJobs/ShowApplicants';
import ViewResume from './components/Cards/ViewResume';
import ViewCoverLetter from './components/Cards/ViewCoverLetter';
import Pdf from './components/Pdf/Pdf';
import SearchedInterviews from './components/SearchInterviews/SearchedInterviews';
import SearchedSalaries from './components/SearchedSalaries/SearchedSalaries';
import Salary from './components/Salaries/Salary';
import AllSalary from './components/Salaries/AllSalary';
import AllInterviews from './components/SearchInterviews/AllInterviews';


class Main extends Component {
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Route path='/companyProfile' component={CompanyProfilePage}/>
                    <Route path='/companyProfileForUser' component={CompanyProfilePageForUser}/>
                    <Route path='/updateCompanyProfile' component={EditCompanyProfilePage}/>
                    <Route path='/companyHeaderBar' component={CompanyHeaderBar}/>
                    <Route path = "/companySignUp" component = {CompanySignUp} />
                    <Route path = "/studentSignUp" component = {StudentSignUp} />
                    <Route path = "/login" component = {Login} />
                    <Route path = "/companyReviews" component = {PostNewJob}/>
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
                    <Route path = "/studentApplications" component = {StudentApplications}/>
                    <Route path = "/companyJobs" component = {CompanyJobs} />
                    <Route path = "/report" component = {Report} />
                    <Route path = "/showApplicants" component = {ShowApplicants} />
                    <Route path = "/viewResume/:resume" component = {ViewResume} />
                    <Route path = "/viewCoverLetter/:cover" component = {ViewCoverLetter} />
                    <Route path = "/pdf" component = {Pdf} />
                    <Route path = "/searchedInterviews" component = {SearchedInterviews} />
                    <Route path = "/searchedSalaries" component = {SearchedSalaries} />
                    <Route path = "/salary" component = {Salary} />
                    <Route path = "/allSalary" component = {AllSalary} />
                    <Route path = "/allInterviews" component = {AllInterviews} />
                </BrowserRouter>
            </div>
        )
    }
}

export default Main;