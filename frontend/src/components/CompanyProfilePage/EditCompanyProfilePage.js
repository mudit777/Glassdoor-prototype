import React, { Component } from 'react'
import {  Label } from 'semantic-ui-react';
import Company from '../Cards/Company';
import CompanyBar from '../CompanyHeaderBar/CompanyBar';
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import axios from 'axios'
import { BACKEND } from '../../Config';
import { Button, Card, Col, DatePicker, Input, notification, Row, Select } from 'antd';
import { Redirect } from 'react-router-dom';



class EditCompanyProfilePage extends Component {
    constructor(props){
        super(props)
        this.state={
            website:'',
            companysize:'',
            comapnytype:'',
            revenue:'',
            headquarters:'',
            industryType : '',
            industries: [], 
            founded:'',
            mission:'',
            ceo_first_name:'',
            ceo_last_name : '', 
            city : '',
            state : '',
            dateToSend: '',
            company : {}
        }
        this.getCompanyDetails();
        this.getAllIndustries();
    }
    getAllIndustries = () => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.get(`${BACKEND}/getAllIndustries`).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    industries : response.data
                })
            }
        })
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
                    company : response.data,
                    website: response.data.company_website,
                    companysize: response.data.company_size,
                    comapnytype: response.data.company_type,
                    revenue: response.data.company_revenue,
                    headquarters: response.data.company_headquarter,
                    // founded: response.data.company_YOF,
                    mission: response.data.company_mission,
                    ceo_first_name: response.data.company_ceo_first_name,
                    ceo_last_name : response.data.company_ceo_last_name,
                    city : response.data.company_city,
                    state : response.data.company_state,
                    description: response.data.company_desc,
                    industryType : response.data.company_industry,
                    updateFlag : false
                })
            }
        })
    }
    websiteChangeHandler=e=>{
        this.setState({
            website:e.target.value
        })
    }
    CompanytypeChangeHandler=e=>{
        this.setState({
            comapnytype:e
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
    updateIndustryType = (e) => {
        this.setState({
            industryType : e
        })
    }
    FoundedChangeHandler=(date, dateString)=>{
        console.log(date);
        console.log(dateString);
        this.setState({
            founded: date,
            dateToSend : dateString
        })
    }
    MissionChangeHandler=e=>{
        this.setState({
            mission:e.target.value
        })
    }
    ceoFirstNameChangeHandler=e=>{
        this.setState({
            ceo_first_name:e.target.value
        })
    }
    ceoLastNameChangeHandler = (e) => {
        this.setState({
            ceo_last_name : e.target.value
        })
    }
    cityChangeHanlder = (e) => {
        this.setState({
            city : e.target.value
        })
    }
    stateChangeHandler = (e) => {
        this.setState({
            state : e.target.value
        })
    }
    descriptionChangeHandler = (e) => {
        this.setState({
            description : e.target.value
        })
    }
    submit=e=>{
        var company = {
            company_id:sessionStorage.getItem('company_id'),
            company_website:this.state.website,
            company_size:this.state.companysize,
            company_type:this.state.comapnytype,
            company_revenue:this.state.revenue,
            company_headquarter:this.state.headquarters,
            company_industry:this.state.industryType,
            company_YOF: this.state.dateToSend,
            company_mission:this.state.mission,
            company_ceo_first_name:this.state.ceo_first_name,
            company_ceo_last_name : this.state.ceo_last_name,
            company_city : this.state.city,
            company_state : this.state.state,
            company_desc : this.state.description
        }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/updateCompanyDetails`, company).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    updateFlag : true
                })
            }
        })
    }
    render() {
        var industries = [];
        this.state.industries.map(industry => {
            var op = <Option value = {industry.toi_type}>{industry.toi_type}</Option>
            industries.push(op);
        })
        var redirectVar = null;
        if(this.state.updateFlag)
        {
            redirectVar = <Redirect to = "/companyProfile" />
        }
        return (
            <div >
                {redirectVar}
                <CompanyHeaderBar/>
                <CompanyBar/>
                <div style={{display:'flex'}}>
                    <Company company = {this.state.company}/>
                    {/* loop the jobs */}
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <div style={{margin:'1rem 4rem',marginTop:'5rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'5rem'}}>Website name</span>
                            <Input onChange={this.websiteChangeHandler} type='text' style={{width:'25rem'}} value = {this.state.website}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'5rem'}}>Company size</span>
                            <Input onChange={this.ComapanysizeChangeHandler} type='text' style={{width:'25rem'}} value = {this.state.companysize}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'4.55rem'}}>Comapny Type</span>
                            <Select style = {{width: "55%", maxWidth : "55%"}} value = {this.state.comapnytype} onChange = {this.CompanytypeChangeHandler}>
                                <Option value = "Profit">Profit</Option>
                                <Option value = "Non-profit">Non-Profit</Option>
                            </Select>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'8.1rem'}}>Revenue</span>
                            <Input onChange={this.RevenueChangeHandler} type='text' style={{width:'25rem'}} value = {this.state.revenue}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'5rem'}}>Headquarters</span>
                            <Input onChange={this.HeadquartersChangeHandler} type='text' style={{width:'25rem'}} value = {this.state.headquarters}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'8.1rem'}}>Industry</span>
                            {/* <Input onChange={this.IndustryChangeHandler} type='text' style={{width:'25rem'}} value = {this.state.industry}></Input> */}
                            <Select style = {{width: "55%", maxWidth : "55%"}} value = {this.state.industryType} onChange = {this.updateIndustryType}>
                                {industries}
                            </Select>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'8rem'}} >Founded</span>
                            <DatePicker onChange={this.FoundedChangeHandler} type='text' style={{width:'25rem'}} value = {this.state.founded}></DatePicker>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'8.5rem'}}>Mission</span>
                            <Input onChange={this.MissionChangeHandler} type='text' style={{width:'25rem'}} value = {this.state.mission}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'7rem'}}>CEO First name</span>
                            <Input onChange={this.ceoFirstNameChangeHandler} type='text' style={{width:'25rem', marginLeft : "-3rem"}} value = {this.state.ceo_first_name}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'7rem'}}>CEO Last name</span>
                            <Input onChange={this.ceoLastNameChangeHandler} type='text' style={{width:'25rem', marginLeft : "-3rem"}} value = {this.state.ceo_last_name}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'7rem'}}>City</span>
                            <Input onChange={this.cityChangeHanlder} type='text' style={{width:'25rem', marginLeft : "3.5rem"}} value = {this.state.city}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'7rem'}}>State</span>
                            <Input onChange={this.stateChangeHandler} type='text' style={{width:'25rem', marginLeft : "2.75rem"}} value = {this.state.state}></Input>
                        </div>
                        <div style={{margin:'1rem 4rem'}}>
                            <span style={{margin:'0 1rem',fontWeight:'bold',fontSize:'1.2rem',marginRight:'7rem'}}>Description</span>
                            <Input.TextArea onChange={this.descriptionChangeHandler} type='text' style={{width:'25rem', marginLeft : "-1.15rem"}} value = {this.state.description}></Input.TextArea>
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
