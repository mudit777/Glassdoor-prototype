import axios from 'axios';
import { BACKEND } from '../../Config';
import { notification } from 'antd';
import { FILTERJOBS, GETALLCOMPANIES, GETALLSTUDENTJOBS, LOGIN, SEARCHCOMPANIES, SEARCHJOBS } from '../constants';

export function login(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/login`, payload).then(response => {
            if(response.status === 200)
            {
                notification["success"]({
                message: 'Signed In',
                description:
                    'User successfully signed in',
                });
                window.sessionStorage.setItem("isLoggedIn", true)
                window.sessionStorage.setItem("jwtToken", response.data.token);
                delete response.data.token;
                if(payload.type === "student")
                {
                    window.sessionStorage.setItem("student_id", response.data.student_id)
                    data = {
                        message : "Successfully logged in",
                        student : response.data,
                        type : payload.type
                    }
                }
                else if(payload.type === "company")
                {
                    window.sessionStorage.setItem("company_id", response.data.company_id)
                    window.sessionStorage.setItem("company_name", response.data.company_name);
                    data = {
                        message : "Successfully logged in",
                        company : response.data,
                        type : payload.type
                    }
                }
                dispatch({type : LOGIN, data});
            }
            else if(response.status === 209)
            {
                notification["error"]({
                    message: 'Invalid credentials',
                    description:
                        'Please enter valid Password',
                        user_id : -1
                    });
                data ={
                    message : "Please check your credentials",
                    user_id : -1,
                    authFlag : false
                  }
                dispatch({type : LOGIN, data});
            }
            else if(response.status === 207)
            {
                notification["error"]({
                    message: 'Invalid credentials',
                    description:
                        'User doesnt exist',
                        user_id : -1
                    });
                data ={
                    message : "Please check your credentials",
                    user_id : -1, 
                    authFlag : false
                  }
                dispatch({type : LOGIN, data});
            }
        })
    }
}

export function get_all_companies(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.get(`${BACKEND}/getAllCompanies`).then(response => {
            if(response.status === 200)
            {
                data = {
                   companies : response.data,
                   message : "All the companies have been fetched"
                }
                dispatch({
                    type : GETALLCOMPANIES,
                    data
                })
            }
        })
    }
}

export function search_companies(payload)
{
    let data = {};
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/searchCompanies`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    companies : response.data,
                    message : "Companies searched"
                }
            }
            dispatch({
                type : SEARCHCOMPANIES,
                data
            })
        })
    }
}
export function search_jobs(payload)
{
    let data = {};
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/searchJobs`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    studentJobs : response.data,
                    message : "Jobs searched"
                }
            }
            dispatch({
                type : SEARCHJOBS,
                data
            })
        })
    }
}

export function get_all_jobs(payload)
{
    let data = {};
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getAllJobs`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    studentJobs : response.data,
                    message : "All jobs fetched on student side"
                }
            }
            dispatch({
                type : GETALLSTUDENTJOBS,
                data
            })
        })
    }
}
export function sortMostRecent(payload)
{
    let data = {};
    return(dispatch) => {
        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        // axios.post(`${BACKEND}/getAllJobs`, payload).then(response => {
        //     if(response.status === 200)
        //     {
                payload.sort((a, b) => (a.job_post_date > b.job_post_date) ? -1 : (a.job_post_date === b.job_post_date) ? ((a.job_post_date > b.job_post_date) ? -1 : 1) : 1 )
                data = {
                    studentJobs : payload,
                    message : "Filtered all the jobs by most recent date"
                }
                console.log(data)
            // }
            dispatch({
                type : FILTERJOBS,
                data
            })
        // })
    }
}
export function sortLeastRecent(payload)
{
    console.log(payload);
    let data = {};
    return(dispatch) => {
        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        // axios.post(`${BACKEND}/getAllJobs`, payload).then(response => {
        //     if(response.status === 200)
        //     {
                payload.sort((a, b) => (a.job_post_date > b.job_post_date) ? 1 : (a.job_post_date === b.job_post_date) ? ((a.job_post_date > b.job_post_date) ? 1 : -1) : -1 )
                data = {
                    studentJobs : payload,
                    message : "Filtered all the jobs by least recent date"
                }
            // }
            dispatch({
                type : FILTERJOBS,
                data
            })
        // })
    }
}

export function filterSalary(payload)
{
    console.log("Payload is ", payload);
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/salaryFilter`, payload).then(response => {
            if(response.status === 200)
            {
                response.data.sort((a, b) => (a.event_date > b.event_date) ? -1 : (a.event_date === b.event_date) ? ((a.event_time > b.event_time) ? -1 : 1) : 1 )
                data = {
                    studentJobs : response.data,
                    message : "Filtered all the jobs by  Salary range"
                }
            }
            dispatch({
                type : FILTERJOBS,
                data
            })
        })
    }
}
export function filterJobType(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/jobTypeFilter`, payload).then(response => {
            if(response.status === 200)
            {
                response.data.sort((a, b) => (a.event_date > b.event_date) ? -1 : (a.event_date === b.event_date) ? ((a.event_time > b.event_time) ? -1 : 1) : 1 )
                data = {
                    studentJobs : response.data,
                    message : "Filtered all the jobs by  Salary range"
                }
            }
            dispatch({
                type : FILTERJOBS,
                data
            })
        })
    }
}