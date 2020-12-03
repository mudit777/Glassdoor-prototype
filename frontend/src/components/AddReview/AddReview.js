import React, { Component } from 'react'
import { Button, Input, Rate, Checkbox } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { BACKEND } from '../../Config';

const customIcons = {
    1: <StarOutlined/>,
    2: <StarOutlined/>,
    3: <StarOutlined/>,
    4: <StarOutlined/>,
    5: <StarOutlined/>,    
};
const {TextArea} = Input;

class AddReview extends Component {

    constructor(){
        super();
        this.state = {  
            company_name : "",
            rating: "",
            employment_status: "",
            job_title: "",
            review_headline:"",
            review_pros:"",
            review_cons:"",
            review_description:"",
            ceo_approval: "",
            recommend_to_friend: ""
        }
    }

    ratingChangeHandler = (e) => {
        this.setState({
            rating: e
        })
    }
    
    jobTitleChangeHandler = (e) => {
        this.setState({
            job_title: e.target.value
        })
    }

    reviewHeadlineChangeHandler = (e) => {
        this.setState({
            review_headline: e.target.value
        })
    }

    jobProsChangeHandler = (e) => {
        this.setState({
            review_pros: e.target.value
        })
    }
    
    jobConsChangeHandler = (e) => {
        this.setState({
            review_cons: e.target.value
        })
    }

    jobDescriptionChangeHandler = (e) => {
        this.setState({
            review_description: e.target.value
        })
    }

    changeStatusHandler = (event, {values}) =>{
        var a = document.getElementById("dropdown")
        console.log(a)
        console.log("Industry IS", event.target.textContent)
        this.setState({
            employment_status: event.target.textContent
        })  
    }

    ceoApprovalStatusHandler = (event, {values}) =>{
        var a = document.getElementById("dropdown")
        console.log(a)
        console.log("CEO IS", event.target.textContent)
        // this.setState({
        //     employment_status: event.target.textContent
        // })  
        if(event.target.textContent === "No"){
            this.setState({
                ceo_approval: "0"
            })
        }
        else{
            this.setState({
                ceo_approval: "1"
            })
        }
    }

    recoToFriendStatusHandler = (event, {values}) =>{
        var a = document.getElementById("dropdown")
        console.log(a)
        console.log("RECO IS", event.target.textContent)
        if(event.target.textContent === "No"){
            this.setState({
                recommend_to_friend: "0"
            })
        }
        else{
            this.setState({
                recommend_to_friend: "1"
            })
        }  
    }

    submitButtonHandler = (e) => {
        const data = {
            company_name : "Amazon",
            rating: this.state.rating,
            employment_status: this.state.employment_status,
            job_title: this.state.job_title,
            review_headline: this.state.review_headline,
            review_pros: this.state.review_pros,
            review_cons: this.state.review_cons,
            review_description: this.state.review_description,
            review_helpful: "1",
            review_status: "Undecided",
            review_marked_by_company: "1",
            company_id: "1",
            student_id: window.sessionStorage.getItem("student_id"),
            ceo_approval: this.state.ceo_approval,
            recommend_to_friend: this.state.recommend_to_friend
        }
        console.log("DATA TO BE SENT IS : ", data)
        axios.post(`${BACKEND}/addReview`,data)
            .then(response => {
                console.log("Status Code in Saving Review : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - SAVING REVIEWS!")
                    console.log(response.data);
                }
                else{

                }
            })
            .catch(err => {

            })
        console.log(data)
    }

    render() {
        const options = [
            { key: 1, text: 'Full Time', value: 1 },
            { key: 2, text: 'Part Time', value: 2 },
            { key: 3, text: 'Contract', value: 3 },
            { key: 4, text: 'Intern', value: 4},
            { key: 5, text: 'Freelance', value: 5},
        ]
        const options1 = [
            { key: 1, text: 'No', value: 1},
            { key: 2, text: 'Yes', value: 2}
        ]
        return (
            <div>
                <div style={{height:42}}>
                    <img src="https://gohire-website.s3.amazonaws.com/img/integration-logos/full/glassdoor-logo-full.png" style={{height:25, width:125, marginTop: 10, marginLeft: 15}}/>
                </div>
                <div style={{backgroundColor: "#f2f2f2"}}>
                    <div className="column-left-add-reviews" style={{backgroundColor:"#f2f2f2"}}> 
                        <div style={{marginLeft: 208, width:676, backgroundColor:"white", marginTop: 7, padding: 10}}>
                            <p style={{fontSize: 24}}>Rate a Company</p>
                            <p style={{color: "#757575", marginTop:-10}}> It only take a minute! And your anonymous review will help other job seekers.</p>
                            <div className="column-left-reviews">
                                <img style ={{height:50,width:50}}src="https://media.glassdoor.com/sql/6036/amazon-squarelogo-1552847650117.png" alt=""></img>
                            </div>
                            <div className="column-right-reviews">
                                <p style={{fontWeight:"bold",marginTop: 20}}>Company</p>
                                <Input defaultValue="Amazon" disabled style={{height:40, width:238, borderRadius:3}}></Input>
                                <p style={{fontWeight:"bold",marginTop: 20}}>Overall Rating<sup>*</sup></p>
                                <Rate onChange={this.ratingChangeHandler} style={{color:"#00a422"}} character={({ index }) => { return customIcons[index+1]}}></Rate>
                                <p style={{fontWeight:"bold",marginTop: 20}}>CEO Approval<sup>*</sup></p>
                                <Dropdown style={{width:238}} onChange={this.ceoApprovalStatusHandler} id = 'dropdown' options={options1} fluid selection />
                                <p style={{fontWeight:"bold",marginTop: 20}}>Recommend to a Friend<sup>*</sup></p>
                                <Dropdown style={{width:238}} onChange={this.recoToFriendStatusHandler} id = 'dropdown' options={options1} fluid selection />
                                <p style={{fontWeight:"bold",marginTop: 20}}>Employment Status<sup>*</sup></p>
                                <Dropdown style={{width:238}} onChange={this.changeStatusHandler} id = 'dropdown' options={options} fluid selection />
                                <p style={{fontWeight:"bold",marginTop: 20}}>Your Title at Amazon</p>
                                <Input onChange={this.jobTitleChangeHandler} placeholder="Title" style={{height:40, width:576, borderRadius:3}}></Input>
                                <p style={{fontWeight:"bold",marginTop: 20}}>Review Headline<sup>*</sup></p>
                                <Input onChange={this.reviewHeadlineChangeHandler} placeholder="" style={{height:40, width:576, borderRadius:3}}></Input>
                                <p style={{fontWeight:"bold",marginTop: 20}}>Pros<sup>*</sup></p>
                                <TextArea onChange={this.jobProsChangeHandler} rows={2} placeholder="Share some of the best reasons to work at Amazon" style={{height:52.5, width:576, borderRadius:3}}></TextArea>
                                <p style={{fontSize:10, marginLeft:20, marginTop:5, color:"#525252"}}>5 words minimum</p>
                                <p style={{fontWeight:"bold",marginTop: 20}}>Cons<sup>*</sup></p>
                                <TextArea onChange={this.jobConsChangeHandler} rows={2} placeholder="Share some of the downsides of working at Amazon" style={{height:52.5, width:576, borderRadius:3}}></TextArea>
                                <p style={{fontSize:10, marginLeft:20, marginTop:5, color:"#525252"}}>5 words minimum</p>
                                <p style={{fontWeight:"bold",marginTop: 20}}>Review Description<sup>*</sup></p>
                                <TextArea onChange={this.jobDescriptionChangeHandler} rows={2} placeholder="Describe the review in depth" style={{height:52.5, width:576, borderRadius:3}}></TextArea>
                                <div className="column-left-reviews-one">
                                    <Checkbox/>
                                </div>
                                <div className="column-right-reviews">
                                    <p style={{fontWeight:"bold", marginLeft:-30}}>I agree to the Glassdoor Terms of Use. This review of my experience at my current or former employer is truthful.</p>
                                </div>
                                <Button onClick={this.submitButtonHandler} style={{backgroundColor:"#004fb4", color:"white", borderRadius:5, fontWeight:"bold", height:35, marginLeft:400}}>Submit Review</Button>    
                            </div>
                        </div>
                    </div>
                    <div className="column-right-add-reviews" style={{backgroundColor:"#f2f2f2"}}>
                        <div style={{backgroundColor:"white", width: 300, padding: 10, marginLeft: -15, marginTop: 7}}>
                            <p style={{fontSize:18}}>Keep it Real</p>
                            <p>Thank you for contributing to the community. Your opinion will help others make decision about jobs and companies.</p>
                            <p style={{fontWeight:"bold"}}>Please Stick to the Community Guidelines and do not post:</p>
                            <ul>
                                <li style={{marginLeft: -10}}>
                                    Aggressive or discriminatory language
                                </li>
                                <li style={{marginTop: 10, marginLeft: -10}}>
                                    Profanities
                                </li>
                                <li style={{marginTop: 10, marginLeft: -10}}>
                                    Trade secrets/ Confidential information
                                </li>
                            </ul>
                            <p>Thankyou for doing your part to keep Glassdoor he most trusted place to find a job and company you love. See the Community Guidelines for more details.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddReview;
