import React, { Component } from 'react'
import {Button, Card, Checkbox, Col, Input, notification, Row, Rate, Modal, Pagination} from 'antd';
import { FacebookOutlined, TwitterOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faQuestionCircle, faSquare } from '@fortawesome/free-solid-svg-icons';


class InterviewCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            reply: ""
        }
    }

    render() {

        var temp = null;

        if(this.props.interview.questions_answers.length > 0 ){
            temp = this.props.interview.questions_answers.map( i => {
                <h4>Interview Question</h4>
                
            })
        }

        var icon1 = <FontAwesomeIcon icon={faSquare}/>
        if(this.props.interview.got_offer === 'Yes, I accepted the offer')
        {
            icon1 = <FontAwesomeIcon icon={faSquare} style={{color:"#24b00e"}}/>
        }
        else if(this.props.interview.got_offer === 'Yes, but I did not accepted')
        {
            icon1 = <FontAwesomeIcon icon={faSquare} style={{color:"#f2b305"}}/>
        }
        else if(this.props.interview.got_offer === 'No')
        {
            icon1 = <FontAwesomeIcon icon={faSquare} style={{color:"#bf0808"}}/>
        }

        var icon2 = <FontAwesomeIcon icon={faSquare}/>
        if(this.props.interview.process_rating === 'positive')
        {
            icon2 = <FontAwesomeIcon icon={faSquare} style={{color:"#24b00e"}}/>
        }
        else if(this.props.interview.process_rating === 'neutral')
        {
            icon2 = <FontAwesomeIcon icon={faSquare} style={{color:"#f2b305"}}/>
        }
        else if(this.props.interview.process_rating === 'negative')
        {
            icon2 = <FontAwesomeIcon icon={faSquare} style={{color:"#bf0808"}}/>
        }
        

        var icon3 = <FontAwesomeIcon icon={faSquare}/>
        if(this.props.interview.interview_difficulty === 'Very Easy')
        {
            icon3 = <FontAwesomeIcon icon={faSquare} style={{color:"#24b00e"}}/>
        }
        if(this.props.interview.interview_difficulty === 'Easy')
        {
            icon3 = <FontAwesomeIcon icon={faSquare} style={{color:"#24b00e"}}/>
        }
        if(this.props.interview.interview_difficulty === 'Average')
        {
            icon3 = <FontAwesomeIcon icon={faSquare} style={{color:"#f2b305"}}/>
        }
        if(this.props.interview.interview_difficulty === 'Difficult')
        {
            icon3 = <FontAwesomeIcon icon={faSquare} style={{color:"#bf0808"}}/>
        }
        if(this.props.interview.interview_difficulty === 'Very Difficult')
        {
            icon3 = <FontAwesomeIcon icon={faSquare} style={{color:"#bf0808"}}/>
        }

        return (
            <div>
                <Card title = "" style={{width:676}}>
                    <div className="column-left-reviews">
                        <img style ={{height:50,width:50}} src={this.props.photo} alt=""></img>
                    </div>
                    <div className="column-right-reviews">
                        <p style={{fontSize:20, fontWeight:"bold", color:"#0048b9"}}>{this.props.interview.job_title} Interview</p>
                        <div>
                            <div className="sr-column-left-1">
                                {icon1} Accepted offer
                            </div>
                            <div className="sr-column-middle-1" style={{marginLeft:-30}}>
                                {icon2} Experience:
                            </div>
                            <div className="sr-column-right-1" style={{marginLeft:-70}}>
                                {icon3} Interview Difficulty

                            </div>
                        </div>
                        <p style={{fontWeight:"bolder", marginTop: 70}}>Interview Description</p>
                        <p style={{marginTop:-10}}>{this.props.interview.description}</p>

                        <p style={{fontWeight:"bolder"}}>Interview Question :</p>
                        {this.props.interview.questions_answers.map(i => {
                            return(
                                // <h2>{Object.keys(i)[0]}</h2>
                                <ul style={{listStyleType:"none", marginLeft:-40}}>
                                    <li>
                                        <FontAwesomeIcon style={{color:"#5e5d5d"}} icon={faQuestionCircle}/>  {Object.keys(i)[0]}
                                    </li>
                                    <li>
                                        <FontAwesomeIcon style={{color:"#5e5d5d"}} icon={faArrowRight}/>  {Object.values(i)[0]}
                                    </li>
                                </ul>
                            )
                        })}
                        <p style={{marginTop:-10}}>{this.props.interview.review_pros}</p>
                        <p style={{marginTop:-10}}>{this.props.interview.review_cons}</p>
                        <FacebookOutlined style={{fontSize:30, backgroundColor:"#cfcfcf", color:"white"}}/><TwitterOutlined style={{fontSize:30, marginLeft:30, backgroundColor:"#cfcfcf", color:"white"}}/><MailOutlined style={{fontSize:30, marginLeft:30, backgroundColor:"#cfcfcf", color:"white"}}/><LinkOutlined style={{fontSize:30, marginLeft:30, backgroundColor:"#cfcfcf", color:"white"}}/>
                        <span><Button onClick={this.showModal} style={{backgroundColor:"white", color:"#0048b9", fontWeight:"bold", borderRadius:5, borderColor:"#0048b9", marginLeft:170}}>Helpful</Button></span>
                    </div> 
                </Card>
            </div>
        )
    }
}

export default InterviewCard;