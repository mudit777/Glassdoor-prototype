import { Card, Button } from 'antd';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./Company.css";


class Company extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToUpdate : false
        }
    }
    redirectToUpdateProfile = () => {
         this.setState({
             redirectToUpdate : true
         })
    }
    render() {
        var redirectVar = null;
        if(this.state.redirectToUpdate)
        {
            redirectVar = <Redirect to = "/updateCompanyProfile" />
        }
        return (
            <div>
                {redirectVar}
            <div style = {{marginTop : "5%"}}>
                <Card title = {this.props.company.company_name} style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '50rem'}} actions = {[
                    <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} onClick = {this.redirectToUpdateProfile} >Update Profile</Button>
                ]}>
                    <div style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'4rem',fontWeight:'bold'}}>Website:</div>
                        <div>{this.props.company.company_website}</div>
                    </div>

                    <div  style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'1.2rem',fontWeight:'bold'}}>Headquarters:</div>
                        <div>{this.props.company.company_headquarter}</div>
                    </div>

                    <div  style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'5.8rem',fontWeight:'bold'}}>Size:</div>
                        <div>{this.props.company.company_size} employees</div>
                    </div>

                    <div  style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'3.6rem',fontWeight:'bold'}}>Founded:</div>
                        <div>{this.props.company.company_YOF}</div>
                    </div>

                    <div  style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'3.8rem',fontWeight:'bold'}}>Revenue:</div>
                        <div>$ {this.props.company.company_revenue}</div>
                    </div>
                </Card>
            </div>
            </div>
        )
    }
}
export default Company;