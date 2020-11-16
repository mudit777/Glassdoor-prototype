import { Card, Col, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import './StudentProfile.css';
class StudentProfile extends Component {
    render() {
        return (
            <div>
                <div>
                    <CompanyHeaderBar />
                </div>
                <div>
                    <Row style = {{marginLeft : "5%", marginTop : "3%"}}>
                        <Col style = {{position: "fixed"}}>
                            <Card title = "Udit Marolia" style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : "150%"}}>
                                <div>
                                    <Avatar size = {50} src = "https://pbs.twimg.com/media/EfEq1QTXsAI5eAa?format=jpg&name=large" />
                                </div>
                                <br />
                                <div>
                                    <h4 style = {{fontWeight : "bolder"}}>maroliaudit@gmail.com</h4>
                                </div>
                                <br />
                                <div style = {{borderTop : "1px solid lightgrey"}}>
                                    <br />
                                    <h3 style = {{fontWeight : "bolder"}}>Lets get you your desired job</h3>
                                    <h4 style = {{fontWeight : "bolder"}}>Job titles looking for</h4>
                                    <h4 style = {{fontWeight : "bolder"}}>Type of search</h4>
                                    <h4 style = {{fontWeight : "bolder"}}>Open to relocation</h4>
                                </div>
                                <br />
                                <div style = {{borderTop : "1px solid lightgrey"}}>
                                    <br />
                                    <Link to = ""><h4 style = {{fontWeight : "bolder"}}>Primary resume</h4></Link>
                                </div>
                            </Card>
                        </Col>
                        <Col style = {{overflowY : "scroll"}}>
                            
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default StudentProfile;