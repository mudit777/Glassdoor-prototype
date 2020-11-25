import { Card, Col, Rate, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./CompanyCard.css";


class CompanyCard extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        var temp = null;
        if(this.props.company)
        {
            temp =  <Card style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : 300}}>
            <div>
                <Row>
                    <Col>
                        <Avatar src = {this.props.company.company_profile_photo} />
                    </Col>
                    <Col>
                        <ul style = {{listStyleType : "none"}}>
                            <li>
                                <h3>{this.props.company.company_name}</h3>
                            </li>
                            <li>
                                <Rate disabled defaultValue = {this.props.company.company_avg_overall_rating} />
                            </li>
                            <li>
                                <h4>
                                    {this.props.company.company_city}, {this.props.company.company_state}
                                </h4>
                            </li>
                            <li>
                                <a target = "_blank" rel="noopener noreferrer" href = {this.props.company.company_website}>
                                    {this.props.company.company_website} .
                                </a>
                            </li>
                            <li>
                                <h5>
                                    {this.props.company.company_total_reviews_count} reviews
                                </h5>
                            </li>
                            <li>
                                10 Salary reviews
                            </li>
                            <li>
                                10 Interview reviews
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </Card>
        }
        console.log(this.props)
        return (
            <div style = {{marginTop : "5%"}}>
               {temp}
            </div>
        )
    }
}
export default CompanyCard;