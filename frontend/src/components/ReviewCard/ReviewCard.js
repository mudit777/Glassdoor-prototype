import React, { Component } from 'react'
import {Button, Card, Checkbox, Col, Input, notification, Row, Rate, Modal} from 'antd';
import { FacebookOutlined, TwitterOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons';
import axios from 'axios'
import { BACKEND } from '../../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';


class ReviewCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            reply: ""
        }
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
            reply: this.state.reply,
            review_id: e
        }
        console.log("DATA1 IS :", data1)
        axios.post(`${BACKEND}/addReply`, data1)
            .then(response => {
                console.log("Status Code in Adding Reply : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - ADDING REPLY!")
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

    submitSaveReview = e =>{
        var data = {
            review_id: e
        }
        console.log("Review ID is:",data);
        axios.post('http://localhost:8080/saveCompanyReview',data)
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

    replyChangeHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            reply: e.target.value
        })
    }

    render() {

        var icon2 = <FontAwesomeIcon icon={faSquare}/>
        if(this.props.review.ceo_approval === "0")
        {
            icon2 = <FontAwesomeIcon icon={faSquare} style={{color:"#bf0808"}}/>
        }
        else if(this.props.review.ceo_approval === "1")
        {
            icon2 = <FontAwesomeIcon icon={faSquare} style={{color:"#24b00e"}}/>
        }

        var icon1 = <FontAwesomeIcon icon={faSquare}/>
        if(this.props.review.recommend_to_friend === "0")
        {
            icon1 = <FontAwesomeIcon icon={faSquare} style={{color:"#bf0808"}}/>
        }
        else if(this.props.review.recommend_to_friend === "1")
        {
            icon1 = <FontAwesomeIcon icon={faSquare} style={{color:"#24b00e"}}/>
        }

        return (
            <div>
                <Card title = "" style={{width:676}}>
                    <div className="column-left-reviews">
                        <img style ={{height:50,width:50}} src={this.props.photo} alt=""></img>
                    </div>
                    <div className="column-right-reviews">
                        <p style={{color:"#636363", marginTop:-15}}>{this.props.review.review_date.substring(0,10)}</p>
                        <p style={{fontSize:20, fontWeight:"bold", color:"#0048b9"}}>"{this.props.review.review_headline}"</p>
                        <Rate disabled defaultValue={this.props.review.review_rating} style={{color:"#00a422", marginTop:-25}} />
                        <div style={{marginTop:7}}>
                            <div className="column-left-intervies">
                                {icon1} Recommends
                            </div>
                            <div className="column-right-intervies">
                                {icon2} CEO Approval
                            </div>
                        </div>
                        <p style={{marginTop: 40}}>{this.props.review.review_desc}</p>
                        <p style={{fontWeight:"bold", marginTop: 7}}>Pros</p>
                        <p style={{marginTop:-10}}>{this.props.review.review_pros}</p>
                        <p style={{fontWeight:"bold"}}>Cons</p>
                        <p style={{marginTop:-10}}>{this.props.review.review_cons}</p>
                        <FacebookOutlined style={{fontSize:30, backgroundColor:"#cfcfcf", color:"white"}}/><TwitterOutlined style={{fontSize:30, marginLeft:30, backgroundColor:"#cfcfcf", color:"white"}}/><MailOutlined style={{fontSize:30, marginLeft:30, backgroundColor:"#cfcfcf", color:"white"}}/><LinkOutlined style={{fontSize:30, marginLeft:30, backgroundColor:"#cfcfcf", color:"white"}}/>
                        <span><Button onClick={this.showModal} style={{backgroundColor:"white", color:"#0048b9", fontWeight:"bold", borderRadius:5, borderColor:"#0048b9", marginLeft:70}}>Reply</Button></span>
                        <Modal
                        title="Reply to the Review"
                        visible={this.state.visible}
                        onOk={ () =>this.handleOk(this.props.review.review_id)}
                        onCancel={this.handleCancel}
                        >
                            <Input onChange={this.replyChangeHandler} placeholder="Add a comment"></Input>
                        </Modal>
                        <Button onClick = { () =>this.submitSaveReview(this.props.review.review_id)} style={{backgroundColor:"white", color:"#0048b9", fontWeight:"bold", borderRadius:5, borderColor:"#0048b9", marginLeft:10}}>Save</Button>
                    </div> 
                </Card>
            </div>
        )
    }
}

export default ReviewCard