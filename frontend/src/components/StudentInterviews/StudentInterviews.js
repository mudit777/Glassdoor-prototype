import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import { Button, Input, Rate, Checkbox, Progress, Modal } from 'antd';
import axios from 'axios';
import { BACKEND } from '../../Config'
import DonutChart from "react-svg-donut-chart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'semantic-ui-react';
const { Search } = Input;

const dataPie = [
    {value: 60, stroke: "#dcee95", strokeWidth: 5},
    {value: 20, stroke: "#0caa41", strokeWidth: 5},
    {value: 20, stroke: "#194383", strokeWidth: 5}
]

const { TextArea } = Input;

class StudentInterviews extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            reply: "",
            questions: [],
            answers: [],
            company_name: "",
            process_rating: "",
            job_title: "",
            description: "",
            difficulty: "",
            got_offer: "",
            length : 1
        }
    }

    addQuestion = () => {
        var length = this.state.length + 1;
        this.setState({
            length: length
        })
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
        var data1 = {
            questions: this.state.questions,
            answers: this.state.answers,
            company_name: this.state.company_name,
            process_rating: this.state.process_rating,
            job_title: this.state.job_title,
            description: this.state.description,
            difficulty: this.state.difficulty,
            got_offer: this.state.got_offer
        }
        console.log("DATA1 IS :", data1)
        // axios.post(`${BACKEND}/addReply', data1)
        //     .then(response => {
        //         console.log("Status Code in Adding Reply : ", response.status);
        //         if(response.status === 200){
        //             console.log("HERE IN ACTIONS - ADDING REPLY!")
        //             console.log(response.data)
        //         }
        //         else{
        //             console.log("ERROR!!!")
        //         }
        //     }) 
        //     .catch(err => {
        //         console.log("Error in catch", err)
        // })
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    companyNameChangeHandler = (e) => {
        this.setState({
            company_name: "Amazon"
        })
    }

    processRatingHandler = (e) => {
        this.setState({
            process_rating : "positive"
        })
    }

    processRatingHandlerTwo = (e) => {
        this.setState({
            process_rating : "neutral"
        })
    }

    processRatingHandlerThree = (e) => {
        this.setState({
            process_rating : "negative"
        })
        console.log("Process Rating:",this.state.process_rating)
    }

    jobTitleChangeHandler = (e) => {
        this.setState({
            job_title: e.target.value
        })
    }

    descriptionChangeHandler = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    difficultyStatusHandler = (event, {values}) =>{
        var a = document.getElementById("dropdown")
        console.log(a)
        console.log("Difficulty is", event.target.textContent)
        this.setState({
            difficulty: event.target.textContent
        })  
    }

    gotOfferStatusHandler = (event, {values}) =>{
        var a = document.getElementById("dropdown")
        console.log(a)
        console.log("Got offer is", event.target.textContent)
        this.setState({
            got_offer: event.target.textContent
        })
    }

    questionsChangeHandler = (e) => {
        var a = this.state.questions.push(e.target.value)
        console.log("Questions are:",a)
        this.setState({
            questions: e.target.value
        })
    }

    answerChangeHandler = (e) => {
        this.setState({
            answers: e.target.value
        })
    }

    render() {

        const options = [
            { key: 1, text: 'Very Easy', value: 1 },
            { key: 2, text: 'Easy', value: 2 },
            { key: 3, text: 'Average', value: 3 },
            { key: 4, text: 'Difficult', value: 4},
            { key: 5, text: 'Very Difficult', value: 5},
        ]

        const options1 = [
            { key: 1, text: 'No', value: 1 },
            { key: 2, text: 'Yes, but I did not accepted', value: 2 },
            { key: 3, text: 'Yes, I accepted the offer', value: 3 }
        ]



        var questionsAnswers =  [];
        var temp =  <div>
            <p style={{marginTop:10, fontSize:15}}>Interview Question<sup>*</sup> </p>
            <TextArea id="`${}`" rows={3} onChange={this.questionsChangeHandler}></TextArea>
            <p style={{marginTop:10, fontSize:15}}>Answer<sup>*</sup></p>
            <TextArea rows={3} onChange={this.answerChangeHandler}></TextArea>
        </div> 
        for(let i= 0; i < this.state.length; i++){
           questionsAnswers.push(temp);
        }
        

        return (  
            <div>
               <CompanyHeaderBarForm/>
               <div style={{backgroundColor: "#f2f2f2"}}>
                    <div className="column-left-add-reviews" style={{backgroundColor:"#f2f2f2"}}> 
                        <div style={{marginLeft: 208, width:676, backgroundColor:"white", marginTop: 7, padding: 15}}>
                            <p style={{fontSize: 20}}>Amazon Interview Questions</p>
                            <Search placeholder="Search Job Titles" allowClear size="large" style={{width:497}}/>
                            <Button onClick={this.showModal} style={{height: 40, backgroundColor:"#004fb4", color:"white", borderRadius:5, fontWeight:"bold", marginLeft:10}}>Add Interview</Button>
                            <Modal
                            title="Reply to the Review"
                            visible={this.state.visible}
                            onOk={ () =>this.handleOk()}
                            onCancel={this.handleCancel}
                            >
                                <Input onChange={this.companyNameChangeHandler} defaultValue="Amazon" disabled></Input>
                                <p style={{marginTop:10, fontSize:15}}>Rate Overall Process</p>
                                <FontAwesomeIcon onClick={this.processRatingHandler} size="2x" style={{marginLeft:50, color:"#cfcfcf"}} icon={faThumbsUp}/>
                                <span><FontAwesomeIcon onClick={this.processRatingHandlerTwo} size="2x" style={{marginLeft: 30, color:"#cfcfcf"}} icon = {faEquals}/></span>
                                <span><FontAwesomeIcon onClick={this.processRatingHandlerThree} size="2x" style={{marginLeft: 30, color:"#cfcfcf"}} icon = {faThumbsDown}/></span>
                                <p style={{marginTop:10, fontSize:15}}>Job Title</p>
                                <Input onChange={this.jobTitleChangeHandler}></Input>
                                <p style={{marginTop:10, fontSize:15}}>Describe the Interview Process</p>
                                <TextArea rows={3} onChange={this.descriptionChangeHandler}></TextArea>
                                <p style={{marginTop:10, fontSize:15}}>Interview Difficulty<sup>*</sup></p>
                                <Dropdown style={{width:"auto"}} placeholder="Select your Option" onChange={this.difficultyStatusHandler} id = 'dropdown' options={options} fluid selection />
                                <p style={{marginTop:10, fontSize:15}}>Did you get an offer?<sup>*</sup></p>
                                <Dropdown style={{width:"auto"}} placeholder="Select your Option" onChange={this.gotOfferStatusHandler} id = 'dropdown' options={options1} fluid selection />
                                {questionsAnswers}
                                <Button style={{marginTop:5, fontWeight:"bold"}} onClick={this.addQuestion}>Add Question</Button>
                            </Modal>
                            <p style={{fontSize: 18, marginTop: 20}}>Interviews at Amazon</p>
                            <p style={{fontSize: 17, marginTop: 20}}>Experience</p>
                            <div style={{height:90, borderBottomStyle:"solid", borderWidth:1, borderColor:"#cfcfcf"}}>
                                <div className="column-left-intervies" style={{marginLeft: 100}}>
                                    <DonutChart style={{height:75, width:75, marginLeft: 50}} data={dataPie} />
                                </div>
                                <div className="column-right-intervies" style={{marginLeft:-100}}>
                                    <div className="column-left-reviews" style={{height:12, width:12, backgroundColor:"#dcee95"}}></div>
                                    <div className="column-right-reviews"><p style={{fontSize: 12, marginTop:-5, marginLeft:-50}}> - Positive (60)</p></div>
                                    <br></br>
                                    <div className="column-left-reviews" style={{height:12, width:12, backgroundColor:"#0caa41", marginTop:-30}}></div>
                                    <div className="column-right-reviews" style={{marginTop: -30}}><p style={{fontSize: 12, marginTop:-5, marginLeft:-50}}> - Neutral (20)</p></div>
                                    <br></br>
                                    <div className="column-left-reviews" style={{height:12, width:12, backgroundColor:"#194383", marginTop:-30}}></div>
                                    <div className="column-right-reviews" style={{marginTop: -30}}><p style={{fontSize: 12, marginTop:-5, marginLeft:-50}}> - Negative (20)</p></div>
                                </div>
                            </div>
                            <p style={{fontSize: 18, marginTop: 20}}>Interviews for Top Job at Amazon</p>

                            <div style={{marginLeft:-15}}>
                                {/* {this.state.positive_review.map(i=>{
                                    return(
                                        <StudentReviewCard review = {i} key={i.review_id}/>
                                    )
                                })} */}
                            </div>
                            <div style={{marginLeft:-15}}>
                                {/* {this.state.negative_review.map(i=>{
                                    return(
                                        <StudentReviewCard review = {i} key={i.review_id}/>
                                    )
                                })} */}
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

export default StudentInterviews;
