import Axios from 'axios';
import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import axios from 'axios';
import { BACKEND } from '../../Config';
import ApplicationCard from '../ApplicationCard/ApplicationCard';

class StudentApplications extends Component {

    constructor(props){
        super(props);
        this.state = { 
            visible:false,
            applications: [],
            offset: 0,
            elements: [],
            perPage: 6,
            currentPage: 1,
            pageCount: 1,
        }
        console.log(props)
    }

    componentDidMount(){
        axios.post(`${BACKEND}/getStudentApplications`)
            .then(response => {
                console.log("Status Code in Getting Student Applications : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING STUDENT APPLICATIONS!")
                    console.log(response);
                    // console.log(response.data.job_title);
                    this.setState(
                    {
                        applications : response.data,
                    })
                }else{
                }
            })
            .catch(err => {
                
        })
    }

    render() {
        return (
            <div>
                <CompanyHeaderBarForm/>
                <div>
                    {this.state.applications.map(i => {
                        console.log(i)
                        return(
                            <ApplicationCard applications = {i} key = {i._id} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default StudentApplications;