import axios from 'axios';
import { BACKEND } from '../../Config';
import { notification } from 'antd';
import { LOGIN } from '../constants';

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
                    window.sessionStorage.setItem("studentId", response.data.student_id)
                    data = {
                        message : "Successfully logged in",
                        student : response.data,
                        type : payload.type
                    }
                }
                else if(payload.type === "company")
                {
                    window.sessionStorage.setItem("studentId", response.data.company_id)
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