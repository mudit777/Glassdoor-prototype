import axios from 'axios';
import { BACKEND } from '../../Config';
import { notification } from 'antd';
import { GETALLCOMPANIES, GETALLSTUDENTJOBS, LOGIN, SEARCHCOMPANIES } from '../constants';

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