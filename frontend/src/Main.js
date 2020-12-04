import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
<<<<<<< HEAD
// import CompanyHeaderBar from './components/CompanyHeaderBar/CompanyHeaderBar';
// import CompanyProfilePage from './components/CompanyProfilePage/CompanyProfilePage'
// import EditCompanyProfilePage from './components/CompanyProfilePage/EditCompanyProfilePage';
// import CompanySignUp from './components/CompanySignUp/CompanySignUp';
// import Login from './components/Login/Login';
// import StudentProfile from './components/StudentProfile/StudentProfile';
// import StudentSignUp from './components/StudentSignUp/StudentSignUp';
=======
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
import GetAllReviews from './components/GetAllReviews/GetAllReviews';
import Salary from './components/Salaries/Salary';
import AllSalary from './components/Salaries/AllSalary';
import AllInterviews from './components/SearchInterviews/AllInterviews';
import AddPhotosByCompany from './components/Photos/AddPhotosByCompany';
import AddPhotosByUserForCompany from './components/Photos/AddPhotosByUserForCompany';
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
import Approve from './components/Admin/approve';
import ApprovePhotos from './components/Admin/ApprovePhotos';
import ApproveReviews from './components/Admin/ApproveReviews';
import ManageCompanies from './components/Admin/ManageCompanies';
import ShowCompanyReviews from './components/Admin/ShowCompanyReviews';
import stats from './components/Admin/stats';
<<<<<<< HEAD
import AddPhotosByCompany from './components/Photos/AddPhotosByCompany';
import AddPhotosByUserForCompany from './components/Photos/AddPhotosByUserForCompany';
=======

>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740

class Main extends Component {
    render(){
        return(
            <div>
                <BrowserRouter>
<<<<<<< HEAD
                    {/* <Route path='/companyProfile' component={CompanyProfilePage}/>
                    <Route path='/editCompanyProfile' component={EditCompanyProfilePage}/>
                    <Route path='/companyHeaderBar' component={CompanyHeaderBar}/>
                    <Route path = "/companySignUp" component = {CompanySignUp} />
                    <Route path = "/studentSignUp" component = {StudentSignUp} />
                    <Route path = "/login" component = {Login} />
                    <Route path = "/studentProfile" component = {StudentProfile} /> */}
=======
                    <Route path='/companyProfile' component={CompanyProfilePage}/>
                    <Route path='/companyProfileForUser' component={CompanyProfilePageForUser}/>
                    <Route path='/updateCompanyProfile' component={EditCompanyProfilePage}/>
                    {/* <Route path='/companyHeaderBar' component={CompanyHeaderBar}/> */}
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
                    <Route path = "/viewResume/:resume:resume2" component = {ViewResume} />
                    <Route path = "/viewCoverLetter/:cover:cover2" component = {ViewCoverLetter} />
                    <Route path = "/pdf" component = {Pdf} />
                    <Route path = "/searchedInterviews" component = {SearchedInterviews} />
                    <Route path = "/searchedSalaries" component = {SearchedSalaries} />
                    <Route path = "/allReviews" component = {GetAllReviews}/>
                    <Route path = "/salary" component = {Salary} />
                    <Route path = "/allSalary" component = {AllSalary} />
                    <Route path = "/allInterviews" component = {AllInterviews} />




>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
                    <Route path = "/approve" component = {Approve} />
                    <Route path = "/approvePhotos" component = {ApprovePhotos} />
                    <Route path = "/approveReviews" component = {ApproveReviews} />
                    <Route path = "/manageCompanies" component = {ManageCompanies} />
                    <Route path = "/showCompanyReviews" component = {ShowCompanyReviews} />
                    <Route path = "/showStats" component = {stats} />
                    <Route path = "/addPhotosC" component={AddPhotosByCompany}/>
                    <Route path = "/addPhotosU" component={AddPhotosByUserForCompany}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default Main;