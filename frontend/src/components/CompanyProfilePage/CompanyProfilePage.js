import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import axios from 'axios'
import {Modal, Button} from 'semantic-ui-react'
import Company from '../Cards/Company'
import Job from '../Cards/Job'
import CompanyBar from '../CompanyHeaderBar/CompanyBar'
import { BACKEND } from '../../Config';

class CompanyProfilePage extends Component {
    constructor(){
        super();
        this.state = {  
            firstname : "",
            open: false,
            setOpen: false,
            company : {}
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
    }
    render() {
        console.log("The state is ==============", this.state)
        return (
            <div>
                <CompanyHeaderBar/>
                <CompanyBar photo = {this.state.company.company_profile_photo}/>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Company company = {this.state.company} />
                    {/* loop the jobs */}
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <Job/>
                        <Job/>
                        <Job/>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default CompanyProfilePage;
