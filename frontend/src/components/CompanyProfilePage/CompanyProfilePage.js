import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import axios from 'axios'
import {Modal, Button} from 'semantic-ui-react'
import Company from '../Cards/Company'
import Job from '../Cards/Job'
import CompanyBar from '../CompanyHeaderBar/CompanyBar'
import { BACKEND } from '../../Config';
import { Link } from 'react-router-dom'


class CompanyProfilePage extends Component {
    constructor(){
        super();
        this.state = {  
            firstname : "",
            open: false,
            setOpen: false,
            company : {},
            jobs:[],
            j:[]
        }
        this.getCompanyDetails();
    }
    getCompanyDetails = () => {
        var company = {
            company_id : sessionStorage.getItem("company_id")
        }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
            if(response.status === 200)
            {
                console.log(response.data)
                this.setState({
                    company : response.data
                })
            }
        })
        axios.post(`${BACKEND}/getJob`, company).then(response => {
            if(response.status === 200)
            {
                console.log(response.data)
                this.setState({
                    jobs : response.data
                })
            }
        })
    }
    render() {
        console.log("The state is ==============", this.state)
        return (
            <div>
                <CompanyHeaderBar/>
                <CompanyBar photo = {this.state.company.company_profile_photo} company = {this.state.company}/>
                <div style={{display:'flex',justifyContent:'flex-start',backgroundColor:'#EAEAEA',margin:'0 0'}}>
                    <Company company = {this.state.company} />
                    {/* loop the jobs */}
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignContent:'flex-start'}}>
                        
                        {this.state.jobs.map(a =>{
                            //console.log(a)
                            return (<Link to='#' style={{color:"black"}} ><Job job = {a}/></Link>)
                        })}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default CompanyProfilePage;
