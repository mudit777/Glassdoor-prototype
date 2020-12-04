import { Card, Col, Rate, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND } from '../../Config';
import "./CompanyCard.css";


class CompanyCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            average_ratings : 0,
            interviewLength : 0,
            reviewLength : 0,
            salaryLength : 0
        }
        this.getCompanyReviews();
        this.getCompanyInterview();
        this.getCompanySalary();
    }
    getCompanyReviews = () => {
        var company = {
            company_id:this.props.company.company_id
        }
        Axios.post(`${BACKEND}/getCompanyReviews`,company).then(response => {
            console.log("Status Code in Getting Reviews : ",response.status);
            if(response.status === 200){
                console.log("HERE IN ACTIONS - GETTING REVIEWS!")
                console.log(response.data);
                var average_ratings=0;
                for(var i=0;i<response.data.length;i++)
                {
                    average_ratings+=response.data[i].review_rating; 
                }
                average_ratings/=response.data.length
                console.log("Average rating is -------------", average_ratings);
                this.setState(
                {
                    average_ratings : average_ratings,
                    reviewLength : response.data.length
                })
            }else{
            }
        })
        .catch(err => {
            
    })
    }
    getCompanyInterview = () => {
        var company = {
            company_id:this.props.company.company_id
        }
        Axios.post(`${BACKEND}/getCompanyInterview`, company).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    interviewLength : response.data.length
                })
            }
        })
    }
    getCompanySalary = () => {
        var company = {
            company_id:this.props.company.company_id
        }
        Axios.post(`${BACKEND}/getCompanySalary`, company).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    salaryLength : response.data.length
                })
            }
        })
    }
    render() {
        console.log("Average rating for", this.props.company.company_name, "is: ", this.state.average_ratings)
        var temp = null;
        if(this.props.company && this.state.average_ratings > 0)
        {
            temp =  <Link to={{
                pathname:'/companyProfileForUser',
                state:{company_id:this.props.company.company_id}
            }}>
            <Card style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : 300}}>
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
                                <Rate disabled defaultValue = {this.state.average_ratings} />
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
                                    {this.state.reviewLength} reviews
                                </h5>
                            </li>
                            <li>
                                {this.state.salaryLength} Salary reviews
                            </li>
                            <li>
                                {this.state.interviewLength} Interview reviews
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </Card>
        </Link>
        }
        return (
            <div style = {{marginTop : "5%"}}>
               {temp}
            </div>
        )
    }
}
export default CompanyCard;