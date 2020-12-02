import React, { Component } from 'react'
import { Button, Card, Col, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import { BACKEND } from '../../Config';

class CompanyJobCard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

        }
        
    }
    openJob = () => {
        this.props.updateSelectedJob(this.props.job);
    }
    render() {
        return (
            <div>
                <Card actions = {[<Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} onClick = {this.openJob}>Show Job</Button>]} style = {{marginTop: "2%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                    <Row>
                        <Col>
                            <Avatar src = {this.props.company.company_profile_photo}></Avatar>
                        </Col>
                        <Col>
                            <ul style = {{listStyleType: 'none'}}>
                                <li>
                                    <h2>
                                        {this.props.job.job_title}
                                    </h2>
                                </li>
                                <li>
                                    <p style = {{color : "grey"}}>
                                        {this.props.job.job_city}, {this.props.job.job_state}
                                    </p>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
export default CompanyJobCard;