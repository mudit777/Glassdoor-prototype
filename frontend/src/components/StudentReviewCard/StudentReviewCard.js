import React, { Component } from 'react'
import {Button, Card, Checkbox, Col, Input, notification, Row, Rate, Modal} from 'antd';
import { FacebookOutlined, TwitterOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons';
import axios from 'axios'
import { BACKEND } from '../../Config';

class StudentReviewCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            reply: ""
        }
    }

    submitHelpful = e =>{
        var data = {
            review_id: e
        }
        console.log("Review ID is:",data);
        axios.post(`${BACKEND}/addHelpful`,data)
            .then(response => {
                console.log("Status Code in Saving Review : ", response);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - SAVING REVIEWS!")
                    console.log(response.data);
                }
                else{
                    console.log("ERROR!!!")
                }
            })
            .catch(err => {
                console.log("Error in catch", err)
            })

    }

    render() {
        return (
            <div>
                <div>
                    <Card title = "" style={{width:676}}>
                        <div className="column-left-reviews">
                            <img style ={{height:50,width:50}}src="https://media.glassdoor.com/sql/6036/amazon-squarelogo-1552847650117.png" alt=""></img>
                        </div>
                        <div className="column-right-reviews">
                            <p style={{color:"#636363", marginTop:-15}}>November 3, 2020</p>
                            <p style={{fontSize:20, fontWeight:"bold", color:"#0048b9"}}>"{this.props.review.review_headline}"</p>
                            <Rate disabled defaultValue={5} style={{color:"#00a422", marginTop:-25}} />Former Employee - Delivery Driver in East Chattanooga, TN
                            <p style={{marginTop:15}}>I work at Amazon Full-time</p>
                            <p style={{fontWeight:"bold"}}>Pros</p>
                            <p style={{marginTop:-10}}>{this.props.review.review_pros}</p>
                            <p style={{fontWeight:"bold"}}>Cons</p>
                            <p style={{marginTop:-10}}>{this.props.review.review_cons}</p>
                            <FacebookOutlined style={{fontSize:30, backgroundColor:"#cfcfcf", color:"white"}}/><TwitterOutlined style={{fontSize:30, marginLeft:30, backgroundColor:"#cfcfcf", color:"white"}}/><MailOutlined style={{fontSize:30, marginLeft:30, backgroundColor:"#cfcfcf", color:"white"}}/><LinkOutlined style={{fontSize:30, marginLeft:30, backgroundColor:"#cfcfcf", color:"white"}}/>
                            <Button onClick = { () =>this.submitHelpful(this.props.review.review_id)} style={{backgroundColor:"white", color:"#0048b9", fontWeight:700, borderRadius:5, borderColor:"#0048b9", marginLeft:150}}>Helpful({this.props.review.review_helpful})</Button>
                        </div> 
                    </Card>
                </div>
            </div>
        )
    }
}

export default StudentReviewCard;
