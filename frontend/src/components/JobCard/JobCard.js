import { Button, Card, Col, Rate, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { Component } from 'react'
import axios from 'axios';
import { BACKEND } from '../../Config';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinHearts, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';
// import "font-awesome/css/font-awesome.css";
library.add(faHeart, heartRegular);

class JobCard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            company : {},
            iconValue : false
        }        
        this.getCompanyDetails();
    }
    componentWillReceiveProps()
    {
        setTimeout(() => {
            if(this.props.favourite === true)
            {
                this.setState({
                    iconValue : true
                })
            }
            else
            {
                this.setState({
                    iconValue : false
                })
            }
        }, );
        
    }
    
    getCompanyDetails = () => {
        var company = {
            company_id : this.props.job.company_id
        }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
            if(response.status === 200)
            {
                console.log(response.data)
                this.setState({
                    company : response.data
                })
            }
        })
    }
    changeIcon = () => {
        var myJson = {
            student_id : sessionStorage.getItem("student_id"),
            job_id : this.props.job.job_id
        }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/updateJobFavourites`, myJson).then(response => {
            if(response.status === 200)
            {
                if(this.state.iconValue)
                {
                    this.setState({
                        iconValue : false
                    })
                }
                else
                {
                    this.setState({
                        iconValue : true
                    })
                }
            }
        })
    }
    openJob = () => {
        console.log("Hiiiiii")
        this.props.updateSelectedJob(this.props.job);
    }
    render() {
        var date = null;
        if(this.props.job.job_post_date !== null)
        {
            date = <p>{this.props.job.job_post_date.split('T')[0]}</p>;
        }
        var icon = <FontAwesomeIcon icon={heartRegular} onClick = {this.changeIcon}/>
        if(this.state.iconValue)
        {
            icon = <FontAwesomeIcon icon={faHeart} onClick = {this.changeIcon}/>
        }
        var between = (min, max) => {
            return Math.floor(
              Math.random() * (max-min+1)+min
            )
        }
        // console.log(this.state.company)
        return (
            <div>
                <Card actions = {[<Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} onClick = {this.openJob}>Open Job</Button>]}  title = {this.props.job.job_title} style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", marginTop : "3%", marginLeft : "4%", marginRight : "4%"}} extra = {date}>
                    <Row>
                        <Col >
                            <Avatar src = {this.state.company.company_profile_photo} />
                        </Col>
                        <Col>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <h3>{this.state.company.company_name}</h3>
                                </li>
                                <li>
                                    <Rate defaultValue ={between(1, 5)} disabled/>
                                </li>
                                <li>
                                    <p>Expected Salary: ${this.props.job.job_expected_salary}</p>
                                </li>
                                <li>
                                    <p>Location: {this.props.job.job_city}, {this.props.job.job_state}</p>
                                </li>
                            </ul>
                        </Col>
                        <Col style = {{marginLeft : "84%", position: "absolute"}}>
                            {icon}
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
export default JobCard;