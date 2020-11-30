import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import { Button, Input, Rate, Checkbox, Progress } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { BACKEND } from '../../Config'
import StudentReviewCard from '../StudentReviewCard/StudentReviewCard';


const { Search } = Input;

class StudentReviews extends Component {

    constructor(props){
        super(props);
        this.state = { 
            positive_review: [],
            negative_review: []
        }
        console.log(props)
    }

    componentDidMount(){
        axios.post(`${BACKEND}/getPositiveReview`)
            .then(response => {
                console.log("Status Code in Getting Positive Reviews : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING POSITIVE REVIEWS!")
                    console.log(response.data);
                    this.setState(
                    {
                        positive_review : response.data
                    })
                }else{
                }
            })
            .catch(err => {
                
        })
        axios.post(`${BACKEND}/getNegativeReview`)
            .then(response => {
                console.log("Status Code in Getting Negative Reviews : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING NEGATIVE REVIEWS!")
                    console.log(response.data);
                    this.setState(
                    {
                        negative_review : response.data
                    })
                }else{
                }
            })
            .catch(err => {
                
        })
    }

    render() {
        return (
            <div>
                <CompanyHeaderBarForm/>
                <div style={{backgroundColor: "#f2f2f2"}}>
                    <div className="column-left-add-reviews" style={{backgroundColor:"#f2f2f2"}}> 
                        <div style={{marginLeft: 208, width:676, backgroundColor:"white", marginTop: 7, padding: 15}}>
                            <p style={{fontSize: 20}}>Amazon Reviews</p>
                            <Search placeholder="Search Job Titles" allowClear size="large" style={{width:505}}/>
                            <span><Button style={{height: 40, backgroundColor:"#004fb4", color:"white", borderRadius:5, fontWeight:"bold", marginLeft:10}}>Find Reviews</Button></span>
                            <p style={{fontWeight:"bold", marginTop:10}}>48921 Reviews</p>
                            <div style={{marginLeft:200}}>
                                <div className="column-left-reviews">
                                    <p style={{color:"#00a422", fontWeight:400, fontSize:24}}>4.5</p>
                                </div>
                                <div className="column-right-reviews">
                                    <Rate style={{color:"#00a422"}} defaultValue={4.5} allowHalf/>
                                </div>
                            </div>
                            <div style={{height:66}}>
                                <div className="sr-column-left-1">
                                    <Progress type="circle" percent={700} width={66} style={{marginLeft:-200}}/> Recommend Friend
                                </div>
                                <div className="sr-column-middle-1">
                                    <Progress type="circle" percent={60} width={66} style={{marginLeft:0}}/> Approve of CEO
                                </div>
                                <div className="sr-column-right-1">
                                    <p>CEO Name</p>
                                </div>                      
                            </div>
                            <div style={{marginLeft:-15}}>
                                {this.state.positive_review.map(i=>{
                                    return(
                                        <StudentReviewCard review = {i} key={i.review_id}/>
                                    )
                                })}
                            </div>
                            <div style={{marginLeft:-15}}>
                                {this.state.negative_review.map(i=>{
                                    return(
                                        <StudentReviewCard review = {i} key={i.review_id}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="column-right-add-reviews" style={{backgroundColor:"#f2f2f2"}}>
                        <div style={{backgroundColor:"white", width: 300, padding: 10, marginLeft: -15, marginTop: 7}}>
                            <p style={{fontSize:18, fontWeight:500}}>Amazon Careers</p>
                            <img src="https://media.glassdoor.com/banner/bh/6036/amazon-banner-1578695809222.jpg" style={{width:300, height:55, marginLeft:-10}}></img>
                            <div style={{borderBottomWidth:1, borderBottomStyle:"solid", borderColor:"#cfcfcf", padding: 5}}>
                                <p style={{marginTop:10}}>Our mission: To be Earth's most customer-centric company.</p>
                            </div>
                            <div style={{borderBottomWidth:1, borderBottomStyle:"solid", borderColor:"#cfcfcf", padding: 5}}>
                                <p style={{marginTop:10, color: "#004fb4", fontSize:16}}>Core values</p>
                            </div>
                            <div style={{borderBottomWidth:1, borderBottomStyle:"solid", borderColor:"#cfcfcf", padding: 5}}>
                                <p style={{marginTop:10, color: "#004fb4", fontSize:16}}>Interview Process</p>
                            </div>
                            <div style={{borderBottomWidth:1, borderBottomStyle:"solid", borderColor:"#cfcfcf", padding: 5}}>
                                <p style={{marginTop:10, color: "#004fb4", fontSize:16}}>Community</p>
                            </div>
                            <div style={{borderBottomWidth:1, borderBottomStyle:"solid", borderColor:"#cfcfcf", padding: 5}}>
                                <p style={{marginTop:10, color: "#004fb4", fontSize:16}}>University Hiring</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentReviews;
