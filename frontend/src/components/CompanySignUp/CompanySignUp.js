import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, Checkbox, Col, Input, notification, Row} from 'antd';
import './CompanySignUp.css'
import 'antd/dist/antd.css';
import { BACKEND } from '../../Config';
import { Redirect } from 'react-router-dom';
import Footer from '../Footer/Footer';

class CompanySignUp extends Component {
    constructor(props)
    {
        super(props);
        if(sessionStorage.getItem('company_id'))
        {
            window.location.replace('/companyProfile')
        }
        else
        {
            
        }
        this.state = {
            first_name : "",
            last_name : "",
            email : "",
            company : "",
            password : "",
            job_title : "",
            checked : false,
            redirect : false
        }
    }
    updateFirstName = (e) => {
        this.setState({
            first_name : e.target.value
        })
    }
    updateLastName = (e) => {
        this.setState({
            last_name : e.target.value
        })
    }
    updateEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    updatePassword = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    updateCompany = (e) => {
        this.setState({
            company : e.target.value
        })
    }
    updateJobTitle = (e) => {
        this.setState({
            job_title : e.target.value
        })
    }
    updateChecked = (e) => {
        this.setState({
            checked : e.target.checked
        })
    }
    createCompany = () => {
        var allFilled = false;
        if(this.state.first_name === "" || this.state.first_name === " " || this.state.last_name === "" || this.state.last_name === " " ||this.state.password === "" || this.state.password === " " || this.state.email === "" || this.state.email === " " || this.state.company === "" || this.state.company === " " || this.state.job_title === "" || this.state.job_title === " ")
        {
            notification["error"]({
                message: 'Empty Fields',
                description:
                  'Please complete all the fields',
              });
        }
        else
        {
            allFilled = true;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValidEmail =  re.test(String(this.state.email).toLowerCase());
        if(!isValidEmail) 
        {
            notification["error"]({
                message: 'Invalid Email',
                description:
                  'Please enter a valid email address',
              });
        }
        if(allFilled && isValidEmail)
        {
            var company = {
                company_first_name : this.state.first_name,
                company_last_name : this.state.last_name,
                company_name : this.state.company,
                creater_job_title : this.state.job_title,
                company_email : this.state.email,
                password : this.state.password
            }
            axios.post(`${BACKEND}/registerCompany`, company).then(response => {
                if(response.status === 299)
                {
                    notification["error"]({
                        message: 'EmailId exists',
                        description:
                          'User with same EmailId is registered',
                    });
                    
                }
                else if(response.status === 200)
                {
                    notification["success"]({
                        message: 'Student Registered',
                        description:
                          'Student successfully registered',
                    });
                    this.setState({
                        redirect : true
                    })
                }
            })
        }
    }
    render() {
        var redirectVar = null;
        if(this.state.redirect)
        {
            redirectVar = <Redirect to = "/login" />
        }
        return (
            <div>
                {redirectVar}
                <div className = "upperDiv">
                    <Row  style = {{marginTop : "1%"}}>
                        <Col>
                            <img src = "https://www.glassdoor.com/employers/app/themes/theme-gd-employers/dist/images/gd-logo-eng.svg" alt = "home for employers"/>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </div>
                <div className = "lowerDiv">
                    <Card title = "Sign Up for Glassdoor" style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                        <ul style = {{listStyleType : "none"}}>
                            <li>
                                <Row>
                                    <Col>
                                        <Input style = {{width : "120%"}} value = {this.state.first_name} onChange = {this.updateFirstName} placeholder = "First Name" />
                                    </Col>
                                    <Col style = {{marginLeft : "14%"}}>
                                        <Input style = {{width : "120%"}} value = {this.state.last_name} onChange = {this.updateLastName} placeholder = "Last Name" />
                                    </Col>
                                </Row>
                            </li>
                            <li style = {{marginTop : "3%"}}>
                                <Row>
                                    <Col>
                                        <Input style = {{width : "120%"}} value = {this.state.company} onChange = {this.updateCompany} placeholder = "Company Name" />
                                    </Col>
                                    <Col style = {{marginLeft : "14%"}}>
                                        <Input style = {{width : "120%"}} value = {this.state.job_title} onChange = {this.updateJobTitle} placeholder = "Job Title" />
                                    </Col>
                                </Row>
                            </li>
                            <li style = {{marginTop : "3%"}}>
                                <Input style = {{width : "93%", marginLeft : "-7%"}} value = {this.state.email} onChange = {this.updateEmail} type = "Email" placeholder = "email"></Input>
                            </li>
                            <li style = {{marginTop : "3%"}}>
                                <Input style = {{width : "93%", marginLeft : "-7%"}} value = {this.state.password} onChange = {this.updatePassword} type = "password" placeholder = "Password"></Input>
                            </li>
                            <li style = {{marginTop : "3%"}}>
                                <Row>
                                    <Col>
                                        <Checkbox checked = {this.state.checked} onChange = {this.updateChecked} />
                                    </Col>
                                    <Col style = {{marginLeft : "5%", marginTop : "-5%"}}>
                                        <p>
                                            I confirm I represent HR, Recruiting, Marketing, PR, or am an executive at my company and I agree to Glassdoor's Terms of Service and Privacy Policy on behalf of my company.
                                        </p>
                                    </Col>
                                </Row>
                            </li>
                            <li style = {{marginTop : "3%"}}>
                                <Button style = {{backgroundColor : "#0caa41", color : "white"}} onClick = {this.createCompany} disabled = {!this.state.checked} size = {100}>Create Account</Button>
                            </li>
                        </ul>
                    </Card>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default CompanySignUp;