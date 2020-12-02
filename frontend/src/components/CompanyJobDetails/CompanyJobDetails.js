import { Button, Card, Col, Rate, Row } from 'antd';
import React, { Component } from 'react'

class CompanyJobDetails extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }
    render() {
        var temp = null;
        var description = [];
        if(this.props.job.job_title)
        {
            description = this.props.job.job_desc.split('. ')
            var qualifications = this.props.job.job_qual.split('. ');
            var responsibilities = this.props.job.job_res.split('. ');
            temp = <Card style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", marginTop : "3%", marginLeft : "4%", marginRight : "4%", width : "930px"}}>
            <Row style = {{borderBottom : "1px solid lightGrey"}}>
                <Col>
                    <ul style = {{listStyleType : "none"}}>
                        <li>
                            <h3>{this.props.job.job_company_name}</h3>
                        </li>
                        <li>
                            <h2 style = {{fontWeight : 'bolder'}}>{this.props.job.job_title}</h2>
                        </li>
                        <li>
                            <Rate defaultValue = {5} disabled />
                        </li>
                        <li>
                            <p style = {{color : 'grey'}}>{this.props.job.job_city}, {this.props.job.job_state}</p>
                        </li>
                        <li>
                            <p style = {{color : 'grey'}}>Estimated Salary:  ${this.props.job.job_expected_salary}</p>
                        </li>
                    </ul>
                </Col>
                <Col style = {{marginTop : "2%", marginLeft : "5%", width: "59%"}}>
                    <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} >Show Applicants</Button>
                </Col>
            </Row>
            <div>
                <Row style = {{borderBottom : "1px solid lightGrey", paddingBottom : "3%"}}>
                    <Col>
                        <Col style = {{marginLeft : "3%"}}>
                            <Card title = "Job Insights">
                                <ul style = {{listStyleType: "none"}}>
                                    <li>
                                        <h5>Industry type: {this.props.job.job_industry}</h5>
                                    </li>
                                    <li>
                                        <h5>
                                            Address: {this.props.job.job_street_address}
                                        </h5>
                                    </li>
                                </ul>
                            </Card>
                        </Col>
                    </Col>
                </Row>
                <Card title = "Job Description" style = {{width : "880px", marginTop: "3%"}}>
                    <ul>
                        {description.map(i => {
                            return(
                                <li>
                                    {i}
                                </li>
                            )
                        })}
                    </ul>
                </Card>   
                <Card title = "Job Qualifications" style = {{width : "880px", marginTop: "3%"}}>
                    <ul>
                        {qualifications.map(i => {
                            return(
                                <li>
                                    {i}
                                </li>
                            )
                        })}
                    </ul>
                </Card>     
                <Card title = "Job Responsibilities" style = {{width : "880px", marginTop: "3%"}}>
                    <ul>
                        {responsibilities.map(i => {
                            return(
                                <li>
                                    {i}
                                </li>
                            )
                        })}
                    </ul>
                </Card>         
            </div>
        </Card>
        }
        return (
            <div>
                {temp}
            </div>
        )
    }
}
export default CompanyJobDetails;