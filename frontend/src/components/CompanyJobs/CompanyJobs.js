import React, { Component } from 'react'
import axios from 'axios';
import { BACKEND } from '../../Config';
import CompanyJobCard from '../CompanyJobCard/CompanyJobCard';
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar';
import { Col, Row ,Button} from 'antd';
import CompanyJobDetails from '../CompanyJobDetails/CompanyJobDetails';
import StudentJobDetails from '../StudentJobDetails/StudentJobDetails'

class CompanyJobs extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            jobs : [],
            company : {},
            currentJob : {}
        }
        this.getCompanyJobs();
    }
    componentDidMount(){
        // console.log(this.props)
        this.getCompanyDetails();
    }
    getCompanyJobs = () => {
        if(!window.sessionStorage.getItem('company_id'))
        {
            // console.log('state',this.props.location.state.company_id)
            var company = {
                company_id : this.props.location.state.company_id
            }
        }
        else{
            console.log('session')

            var company = {
                company_id : window.sessionStorage.getItem("company_id")
            }
        }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCompanyJobs`, company).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    jobs : response.data
                })
            }
        })
    }
    getCompanyDetails = () => {
        if(!window.sessionStorage.getItem('company_id'))
        {
            // console.log('state',this.props.location.state.company_id)
            var company = {
                company_id : this.props.location.state.company_id
            }
        }
        else{
            console.log('session')

            var company = {
                company_id : window.sessionStorage.getItem("company_id")
            }
        }
        
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    company : response.data
                })
            }
        })
    }
    updateSelectedJob = (job) => {
        this.setState({
            currentJob  : job
        })
    }
    render() {
        var temp = null;
        if(this.state.jobs.length > 0)
        {
            temp = this.state.jobs.map(i => {
                return(
                    <CompanyJobCard updateSelectedJob = {this.updateSelectedJob} job = {i} key = {i.job_id} company = {this.state.company} />
                )
            })
        }
        var jobDetails = null;
        if(this.state.currentJob.job_id > 0)
        {

            if(this.props.location.state){
                if(this.props.location.state.type === 'student')
                {
                    jobDetails = <StudentJobDetails job = {this.state.currentJob} company = {this.state.company} key = {this.state.currentJob.job_id}  />
                }
                else{
                    jobDetails = <CompanyJobDetails job = {this.state.currentJob} company = {this.state.company} key = {this.state.currentJob.job_id}  />
                }
            }
            else{
                jobDetails = <CompanyJobDetails job = {this.state.currentJob} company = {this.state.company} key = {this.state.currentJob.job_id}  />

            }
            
        }
        return (
            <div>
                <div>
                    <CompanyHeaderBarForm /> 
                </div>
                <div>
                    <Row style = {{marginLeft : "2%"}}>
                        <Col style = {{width : "30%"}}>
                            {temp}
                        </Col>
                        <Col style = {{height : "600px", overflowY : "scroll"}}>
                            {jobDetails}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default CompanyJobs;