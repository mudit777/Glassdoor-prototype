import React, { Component } from 'react'
import { Button, Input, Label } from 'semantic-ui-react';
import Company from '../Cards/Company';
import CompanyBar from '../CompanyHeaderBar/CompanyBar';
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import axios from 'axios'
import { BACKEND } from '../../Config';



class EditCompanyProfilePage extends Component {
    constructor(props){
        super(props)
        this.state={
            website:'',
            companysize:'',
            comapnytype:'',
            revenue:'',
            headquarters:'',
            industry:'',
            founded:'',
            mission:'',
            ceo:''
        }
    }
    websiteChangeHandler=e=>{
        this.setState({
            website:e.target.value
        })
    }
    CompanytypeChangeHandler=e=>{
        this.setState({
            comapnytype:e.target.value
        })
    }
    ComapanysizeChangeHandler=e=>{
        this.setState({
            companysize:e.target.value
        })
    }
    RevenueChangeHandler=e=>{
        this.setState({
            revenue:e.target.value
        })
    }
    HeadquartersChangeHandler=e=>{
        this.setState({
            headquarters:e.target.value
        })
    }
    IndustryChangeHandler=e=>{
        this.setState({
            industry:e.target.value
        })
    }
    FoundedChangeHandler=e=>{
        this.setState({
            founded:e.target.value
        })
    }
    MissionChangeHandler=e=>{
        this.setState({
            mission:e.target.value
        })
    }
    CeoChangeHandler=e=>{
        this.setState({
            ceo:e.target.value
        })
    }
    submit=e=>{
        var company = {
            companyid:sessionStorage.getItem('company_id'),
            website:this.state.website,
            companysize:this.state.companysize,
            comapnytype:this.state.comapnytype,
            revenue:this.state.revenue,
            headquarters:this.state.headquarters,
            industry:this.state.industry,
            founded:this.state.founded,
            mission:this.state.mission,
            ceo:this.state.ceo
        }
        axios.post(`${BACKEND}/updateCompany`, company).then(response => {
            console.log(response)
        })
    }
    render() {
        return (
            <div >
                <CompanyHeaderBar/>
                <CompanyBar/>
                <div style={{display:'flex'}}>
                    <Company/>
                    {/* loop the jobs */}
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <div style={{margin:'1rem 4rem',marginTop:'5rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'5rem'}}>Website name</span>
                            <Input onChange={this.websiteChangeHandler} type='text' style={{width:'25rem'}}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'5rem'}}>Company size</span>
                            <Input onChange={this.ComapanysizeChangeHandler} type='text' style={{width:'25rem'}}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'4.55rem'}}>Comapny Type</span>
                            <Input onChange={this.CompanytypeChangeHandler} type='text' style={{width:'25rem'}}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'8.1rem'}}>Revenue</span>
                            <Input onChange={this.RevenueChangeHandler} type='text' style={{width:'25rem'}}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'5rem'}}>Headquarters</span>
                            <Input onChange={this.HeadquartersChangeHandler} type='text' style={{width:'25rem'}}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'8.1rem'}}>Industry</span>
                            <Input onChange={this.IndustryChangeHandler} type='text' style={{width:'25rem'}}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'8rem'}}>Founded</span>
                            <Input onChange={this.FoundedChangeHandler} type='text' style={{width:'25rem'}}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'8.5rem'}}>Mission</span>
                            <Input onChange={this.MissionChangeHandler} type='text' style={{width:'25rem'}}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'7rem'}}>CEO name</span>
                            <Input onChange={this.CeoChangeHandler} type='text' style={{width:'25rem'}}></Input>
                        </div>
                        <div style={{margin:'4rem 24rem'}}>
                            <Button onClick={this.submit} >Update</Button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default EditCompanyProfilePage;
