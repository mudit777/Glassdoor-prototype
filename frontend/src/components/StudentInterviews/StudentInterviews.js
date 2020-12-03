import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import { Button, Input, Rate, Checkbox, Progress, Modal, Card } from 'antd';
import axios from 'axios';
import { BACKEND } from '../../Config'
import DonutChart from "react-svg-donut-chart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown, faMeh } from '@fortawesome/free-regular-svg-icons';
import { Dropdown } from 'semantic-ui-react';
import InterviewCard from '../InterviewCard/InterviewCard';
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
            length : 1,
            interviews: [],
            iconValue1: false,
            iconValue2: false,
            iconValue3: false
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
        var qAndA = [];
        for(let i = 0; i < this.state.length; i++)
        {
            var aId = "answer" + i;
            let qId = "question" + i;
            let temp = {};
            temp[document.getElementById(qId).value] = document.getElementById(aId).value;
            qAndA.push(temp);
        }
        var data1 = {
            student_id : sessionStorage.getItem('student_id'),
            company_id: this.props.location.state.company_id,
            process_rating: this.state.process_rating,
            job_title: this.state.job_title,
            description: this.state.description,
            interview_difficulty: this.state.difficulty,
            got_offer: this.state.got_offer,
            questions_answers : qAndA,
        }
        console.log("DATA1 IS :", data1)
        axios.post(`${BACKEND}/addInterview`, data1)
            .then(response => {
                console.log("Status Code in Adding INTERVIEW : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - ADDING INTERVIEW!")
                    console.log(response.data)
                }
                else{
                    console.log("ERROR!!!")
                }
            }) 
            .catch(err => {
                console.log("Error in catch", err)
        })
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
            process_rating : "positive",
            iconValue1: true
        })
    }

    processRatingHandlerTwo = (e) => {
        this.setState({
            process_rating : "neutral",
            iconValue2: true
        })
    }

    processRatingHandlerThree = (e) => {
        this.setState({
            process_rating : "negative",
            iconValue3: true
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
        // var a = this.state.questions.push(e.target.value)
        // console.log("Questions are:",a)
        this.setState({
            questions: e.target.value
        })
    }

    answerChangeHandler = (e) => {
        this.setState({
            answers: e.target.value
        })
    }

    componentDidMount(){
        console.log(this.props)
        var data1 = {
            student_id : sessionStorage.getItem('student_id'),
            company_id: this.props.location.state.company_id,
        }
        axios.post(`${BACKEND}/getCompanyInterview`,data1)
            .then(response => {
                console.log("Status Code in Getting Reviews : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING INTERVIEWS!")
                    console.log(response.data);
                    this.setState(
                    {
                        interviews : response.data
                    })
                }else{
                }
            })
            .catch(err => {
                
        })
    }

    render() {
        var b=null;
        if(this.props.location.state.type !== 'student')
            {
                  //compmauy
            }
            else
            {
                //student
                b=<Button onClick={this.showModal} style={{height: 40, backgroundColor:"#004fb4", color:"white", borderRadius:5, fontWeight:"bold", marginLeft:10}}>Add Interview</Button>

            }
        var icon1 = <FontAwesomeIcon icon={faSmile} size="2x" style={{marginLeft:50, color:"#cfcfcf"}} onClick = {this.processRatingHandler}/>
        if(this.state.iconValue1)
        {
            icon1 = <FontAwesomeIcon style={{color:"#24b00e", marginLeft:50,}} size="2x" icon={faSmile} onClick = {this.processRatingHandler}/>
        }

        var icon2 = <FontAwesomeIcon icon={faMeh} size="2x" style={{marginLeft:50, color:"#cfcfcf"}} onClick = {this.processRatingHandlerTwo}/>
        if(this.state.iconValue2)
        {
            icon2 = <FontAwesomeIcon icon={faMeh} size="2x" style={{color:"#3e5dd6", marginLeft:50,}} onClick = {this.processRatingHandlerTwo}/>
        }

        var icon3 = <FontAwesomeIcon icon={faFrown} size="2x" style={{marginLeft:50, color:"#cfcfcf"}} onClick = {this.processRatingHandlerThree}/>
        if(this.state.iconValue3)
        {
            icon3 = <FontAwesomeIcon icon={faFrown} size="2x" style={{color:"#911e1a", marginLeft:50}} onClick = {this.processRatingHandlerThree}/>
        }

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
        
        for(let i= 0; i < this.state.length; i++){
            let qid = "question" + i;
            let aid = "answer" + i;
            let temp = <div>
                <p style={{marginTop:10, fontSize:15}}>Interview Question<sup>*</sup> </p>
                <TextArea id={qid} rows={3} onChange={this.questionsChangeHandler}></TextArea>
                <p style={{marginTop:10, fontSize:15}}>Answer<sup>*</sup></p>
                <TextArea id = {aid} rows={3} onChange={this.answerChangeHandler}></TextArea>
            </div> 
            questionsAnswers.push(temp);
        }
    
        return (  
            <div>
               <CompanyHeaderBarForm/>
               <div style={{display:'flex',backgroundColor:'#f2f2f2'}}>
                    <div className="column-left-add-reviews" style={{backgroundColor:"#f2f2f2"}}> 
                        <div style={{marginLeft: 208, width:676, backgroundColor:"white", marginTop: 7, padding: 15}}>
                            <p style={{fontSize: 20}}> Interview Questions</p>
                            <Search placeholder="Search Job Titles" allowClear size="large" style={{width:497}}/>
                            {/* Button */}
                            {b}
                            <Modal
                            title="Reply to the Review"
                            visible={this.state.visible}
                            onOk={ () =>this.handleOk()}
                            onCancel={this.handleCancel}
                            >
                                <p style={{marginTop:10, fontSize:15}}>Rate Overall Process</p>
                                {icon1}
                                <span>{icon2}</span>
                                <span>{icon3}</span>
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
                            <p style={{fontSize: 18, marginTop: 20}}>Interviews</p>
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
                            <p style={{fontSize: 18, marginTop: 20}}>Interviews for Top Jobs</p>
                            <div style={{marginLeft:-15}}>
                                {this.state.interviews.map(i => {
                                    return(
                                        <InterviewCard interview = {i} key = {i._id} />
                                    )
                                })}
                            </div>
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
                            <p style={{fontSize:18, fontWeight:500}}>Careers</p>
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
