import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar'
import 'antd/dist/antd.css';
import {Button, Card, Checkbox, Col, Input, notification, Row, Rate, Modal} from 'antd';
import { FacebookOutlined, TwitterOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons';
import axios from 'axios'
import ReviewCard from '../ReviewCard/ReviewCard';

class PostNewJob extends Component {

    constructor(props){
        super(props);
        this.state = { 
            visible:false,
            reviews: []
        }
        console.log(props)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
    console.log(e);
    this.setState({
        visible: false,
    });
    };

    handleCancel = e => {
    console.log(e);
    this.setState({
        visible: false,
    });
    };

    

    componentDidMount(){
        axios.post('http://localhost:8080/getCompanyReviews')
            .then(response => {
                console.log("Status Code in Getting Reviews : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING REVIEWS!")
                    console.log(response.data);
                    this.setState(
                    {
                        reviews : response.data
                    })
                    // Object.keys(this.state.reviews).map(i=>{
                    //     console.log("REVIEW IS",this.state.reviews[i].review_cons)
                    // })
                }else{
                }
            })
            .catch(err => {
                
        })
    }

    render() {
        {console.log("STATE REVIEWS IS:", this.state.reviews)}
        return (
            <div>
                <CompanyHeaderBar/>
                <div style={{backgroundColor:"#cfcfcf"}}>
                    <div style={{marginLeft:224}}>
                        <Card title = "Amazon Reviews" style={{width:676}}>
                        </Card>
                        {this.state.reviews.map(i=>{
                            return(
                                <ReviewCard review = {i} key={i.review_id}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default PostNewJob;
