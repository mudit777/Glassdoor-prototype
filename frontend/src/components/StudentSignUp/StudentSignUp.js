import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, Checkbox, Col, Input, notification, Row} from 'antd';
import './StudentSignUp.css'
import 'antd/dist/antd.css';
import { BACKEND } from '../../Config';
import { Link, Redirect } from 'react-router-dom';
class StudentSignUp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email : "",
            password : "",
            first_name : "",
            last_name : "",
            redirect : false,
            checked : true
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
    createStudent = () => {
        var allFilled = false;
        if(this.state.first_name === "" || this.state.first_name === " " || this.state.last_name === "" || this.state.password === "" || this.state.password === " " || this.state.email === "" || this.state.email === " ")
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
            var student = {
                student_first_name : this.state.first_name,
                student_last_name : this.state.last_name,
                student_email : this.state.email,
                password : this.state.password
            }
            axios.post(`${BACKEND}/registerStudent`, student).then(response => {
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
                            <img style={{width:'20rem',height:'4rem'}} src = "https://gohire-website.s3.amazonaws.com/img/integration-logos/full/glassdoor-logo-full.png" alt = "home for employers"/>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </div>
                <div className = "lowerDiv">
                    <Card title = "Find The Job That Fits Your Life" style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
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
                                <Input style = {{width : "93%", marginLeft : "-7%"}} value = {this.state.email} onChange = {this.updateEmail} type = "Email" placeholder = "email"></Input>
                            </li>
                            <li style = {{marginTop : "3%"}}>
                                <Input style = {{width : "93%", marginLeft : "-7%"}} value = {this.state.password} onChange = {this.updatePassword} type = "password" placeholder = "Password"></Input>
                            </li>
                            <li style = {{marginTop : "3%"}}>
                                <Button style = {{backgroundColor : "#0caa41", color : "white"}} onClick = {this.createStudent} disabled = {!this.state.checked} size = {100}>Continue with email</Button>
                            </li>
                            <li style = {{marginTop : "3%"}}>
                                Are you hiring? <Link to='/companySignUp'>Post jobs</Link>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        )
    }
}
export default StudentSignUp;