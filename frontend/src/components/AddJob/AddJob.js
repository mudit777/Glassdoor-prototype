import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar'
import {Button} from 'antd'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'

class AddJob extends Component {

    constructor(){
        super();
        this.state = {  
            job_title : "",
            industry_type: "",
            country: "",
            remote_inperson: "",
            street_address:"",
            city:"",
            state:"",
            zipcode:"",
            job_desc:"",
            job_qual:"",
            job_roles:"",
            salary:""
        }
    }

    salaryChangeHandler = (e) => {
        this.setState({
            salary: e.target.value
        })
    }

    jobTitleChangeHandler = (e) => {
        this.setState({
            job_title : e.target.value
        })
    }

    streetAddressChangeHandler = (e) => {
        this.setState({
            street_address : e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }

    stateChangeHandler = (e) => {
        this.setState({
            state : e.target.value
        })
    }

    zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode : e.target.value
        })
    }

    jobDescriptionChangeHandler = (e) => {
        this.setState({
            job_desc : e.target.value
        })
    }

    jobRolesChangeHandler = (e) => {
        this.setState({
            job_roles : e.target.value
        })
    }

    qualificationChangeHandler = (e) =>{
        this.setState({
            job_qual : e.target.value
        })
    }

    countryChangeHandler = (e) => {
        this.setState({
            country : e.target.value
        })
    }

    changeStatusHandler = (event, {values}) =>{
        var a = document.getElementById("dropdown")
        console.log(a)
        console.log("Industry IS", event.target.textContent)
        this.setState({
            industry_type: event.target.textContent
        })  
    }

    remoteChangeHandler = (event, {values}) =>{
        var a = document.getElementById("dropdown")
        console.log(a)
        console.log("Remote/ Inperson IS", event.target.textContent)
        this.setState({
            remote_inperson: event.target.textContent
        })  
    }

    addNewJobHandler = (e) => {
        const data = {
            job_title : this.state.job_title,
            industry_type: this.state.industry_type,
            country: this.state.country,
            remote_inperson: this.state.remote_inperson,
            street_address: this.state.street_address,
            city: this.state.country,
            state: this.state.state,
            zipcode: this.state.zipcode,
            job_desc: this.state.job_desc,
            job_qual: this.state.job_qual,
            job_roles: this.state.job_roles,
            salary: this.state.salary,
            company_id: sessionStorage.getItem("company_id"),
            company_name: sessionStorage.getItem("company_name")
        }
        console.log("DATA TO BE SENT IS : ", data)
        axios.post('http://localhost:8080/postJob',data)
            .then(response => {
                console.log("Status Code in Saving Review : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - SAVING REVIEWS!")
                    console.log(response.data);
                }
                else{

                }
            })
            .catch(err => {

            })
    }

    render() {
        const options = [
            { key: 1, text: 'Agriculture', value: 1 },
            { key: 2, text: 'Food / Beverage', value: 2 },
            { key: 3, text: 'Textile / Leather', value: 3 },
            { key: 4, text: 'IT / Technology', value: 4},
            { key: 5, text: 'Construction', value: 5},
            { key: 6, text: 'Trade', value: 6 },
            { key: 7, text: 'Accomodation', value: 7 },
            { key: 8, text: 'Finance', value: 8 },
            { key: 9, text: 'Public Administration', value: 9},
            { key: 10, text: 'Other Services', value: 10 }
        ]
        const options2 = [
            { key: 1, text: 'Remote', value: 1},
            { key: 2, text: 'In-Person', value: 2}
        ]
        return (
            <div>
                <CompanyHeaderBar/>
                <div style={{backgroundColor:"#f2f2f2", paddingTop:15}}>
                    <div style={{marginLeft:370, backgroundColor:"white", width:700, borderStyle:"solid", borderWidth:1, borderRadius:5, padding: 10, paddingTop:10}}>
                    <h2 style={{marginLeft:270, fontWeight:"bold"}}>Add New Job</h2>
                    <h3 style={{marginTop:0, fontWeight: "bold", color:"#00a422"}}>Job Title</h3>
                    <input type="text" style={{height:30,width:680,marginTop:-5, borderRadius:5, borderWidth:1}} placeholder="Job Title" onChange = {this.jobTitleChangeHandler}></input>
                    
                    <h3 style={{marginTop:15, fontWeight: "bold", color:"#00a422"}}>Industry Type</h3>
                    <Dropdown style={{width:680}} onChange={this.changeStatusHandler} id = 'dropdown' options={options} fluid selection />
                
                    <h3 style={{marginTop:15, fontWeight: "bold", color:"#00a422"}}>Country</h3>
                    <input type="text" style={{height:30,width:680, marginTop:-5, borderRadius:5, borderWidth:1}} placeholder="Country" onChange = {this.countryChangeHandler}></input>
                    
                    <h3 style={{marginTop:15, fontWeight: "bold", color:"#00a422"}}>Remote / In-person</h3>
                    <Dropdown style={{width:680}} onChange={this.remoteChangeHandler} id = 'dropdown' options={options2} fluid selection />
                    
                    <h3 style={{marginTop:15, fontWeight: "bold", color:"#00a422"}}>Street Address</h3>
                    <input type="text" style={{height:30,width:680, marginTop:-5, borderRadius:5, borderWidth:1}} placeholder="Street Address" onChange = {this.streetAddressChangeHandler}></input>
                    
                    <h3 style={{marginTop:15, fontWeight: "bold", color:"#00a422"}}>City</h3>
                    <input type="text" style={{height:30,width:680, marginTop:-5, borderRadius:5, borderWidth:1}} placeholder="City" onChange = {this.cityChangeHandler}></input>
                    
                    <h3 style={{marginTop:15, fontWeight: "bold", color:"#00a422"}}>State</h3>
                    <input type="text" style={{height:30,width:680, marginTop:-5, borderRadius:5, borderWidth:1}} placeholder="State" onChange = {this.stateChangeHandler}></input>
                    
                    <h3 style={{marginTop:15, fontWeight: "bold", color:"#00a422"}}>Expected Salary</h3>
                    <input type="text" style={{height:30,width:680, marginTop:-5, borderRadius:5, borderWidth:1}} placeholder="Expected Salary" onChange = {this.salaryChangeHandler}></input>

                    <h3 style={{marginTop:15, fontWeight: "bold", color:"#00a422"}}>ZipCode</h3>
                    <input type="text" style={{height:30,width:680, marginTop:-5, borderRadius:5, borderWidth:1}} placeholder="ZipCode" onChange= {this.zipcodeChangeHandler}></input>

                    <h3 style={{marginTop:15, fontWeight: "bold", color:"#00a422"}}>Job Description</h3>
                    <input type="textarea" style={{height:80, width:680, marginTop:-5, bh3orderRadius:5, borderWidth:1}} placeholder="Job Description" onChange={this.jobDescriptionChangeHandler}></input>

                    <h3 style={{marginTop:15, fontWeight:"bold", color:"#00a422"}}>Job Qualifications</h3>
                    <input type="textarea" style={{height:80, width:680, marginTop:-5, borderRadius:5, borderWidth:1}} placeholder="Qaulifications" onChange={this.qualificationChangeHandler}></input>

                    <h3 style={{marginTop:15, fontWeight:"bold", color:"#00a422"}}>Job Roles</h3>
                    <input type="textarea" style={{height:80, width:680, marginTop:-5, borderRadius:5, borderWidth:1}} onChange={this.jobRolesChangeHandler} placeholder="Job Roles"></input>

                    <Button onClick={this.addNewJobHandler} style={{width:680, backgroundColor:"#00a422", fontWeight:"bold", color:"white", marginTop:15, borderRadius:5}}>Post Job</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddJob
