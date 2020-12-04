import React, { Component } from 'react'
import { Button, Card, Col, Input, notification, Radio, Row } from 'antd';
import './Login.css'
import { login } from '../../js/actions';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
class Login extends Component {
    constructor(props)
    {
        super(props);
        if(sessionStorage.getItem('company_id'))
        {
            window.location.replace('/companyProfile')
        }
        else if(sessionStorage.getItem('student_id'))
        {
            window.location.replace('/studentProfile')
        }
        else
        {
            
        }
        this.state = {
            email : "",
            password : "",
            type : ""
        }
    }
    updateEmail = (e) => {
        this.setState({
            email  : e.target.value
        })
    }
    updatePassword = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    updateType = (e) => {
        this.setState({
            type : e.target.value
        })
    }
    login = () => {
        var allFilled = false;
        if(this.state.email === "" || this.state.email === " " || this.state.password === "" || this.state.password === " " ||this.state.type === "" || this.state.type === " ")
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
        if(isValidEmail && allFilled)
        {
            var myJson = {
                email : this.state.email,
                password : this.state.password,
                type : this.state.type
            }
            this.props.login(myJson);
        }
    }
    render() {
        var redirectVar = null;
        if(this.props.type)
        {
            console.log(this.props.type)

            if(this.props.type === 'student')
            {
                redirectVar = <Redirect to = "/studentProfile" />
            }
            else if(this.props.type === 'company')
            {
                redirectVar = <Redirect to = '/companyProfile' />
            }
            else if(this.props.type === 'Admin')
            {
                console.log('here')
                redirectVar = <Redirect to = '/approve' />
            }
            console.log('here 2')

        }
        return (
            <div>
                {redirectVar}
                <div>
                    <div className = "upper">
                        <Row>
                            <Col>
                                <img className = "logo" src = './logo.png' alt = "Logo" />
                            </Col>
                        </Row>
                    </div>
                    <div style = {{backgroundImage : "./backgroung.png"}}>
                        <div className = "loginCard">
                            <Card title = "Login" style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                                <ul style = {{listStyleType : "none"}}>
                                    <li>
                                        <Input style = {{width : "75%"}} value = {this.state.email} onChange = {this.updateEmail} placeholder = "Email"></Input>
                                    </li>
                                    <li style = {{marginTop : "2%"}}>
                                        <Input style = {{width : "75%"}} type  = "password" value = {this.state.password} onChange = {this.updatePassword} placeholder = "Password" ></Input>
                                    </li>
                                    <li style = {{marginTop : "2%"}}>
                                        <Radio.Group onChange = {this.updateType} value = {this.state.type}>
                                            <Radio value = "student">Student</Radio>
                                            <Radio value = "company">Company</Radio>
                                            <Radio value = "Admin">Admin</Radio>
                                        </Radio.Group>
                                    </li>
                                </ul>
                                <li>
                                    <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} onClick = {this.login} >Login</Button>
                                </li>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// export default Login;
function mapDispatchToProps(dispatch) {
    return {
      login: user => dispatch(login(user))
    };
  }
  
function mapStateToProps(store) {
    console.log('Store is ',store)
    if(store.type === 'student')
    {
        return {
            message : store.message,
            student : store.student,
            type : store.type
        }
    }
    else if(store.type === 'company')
    {
        return {
            message : store.message,
            company : store.company,
            type : store.type
        }
    }
    else if(store.type === 'Admin')
    {
        return {
            type : store.type
        }
    }
return {
    message : store.message,
    type : store.type
};
}

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginForm;