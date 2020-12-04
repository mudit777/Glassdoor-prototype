import React, { Component } from 'react'
import {Button, Card, Checkbox, Col, Input, notification, Row, Rate, Modal} from 'antd';
import { FacebookOutlined, TwitterOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons';
import axios from 'axios'
import { BACKEND } from '../../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';


class MiniReviewCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            reply: "",
            company: []
        }
    }

    render() {

        return (
            <div>
                <Card title = "" style={{width:676}}>
                    <div className="column-left-reviews">
                        <img style ={{height:50,width:50}} src={this.state.company.company_photo} alt=""></img>
                    </div>
                    <div className="column-right-reviews">
                        <p style={{color:"#636363", marginTop:-15}}>{this.props.review.review_date.substring(0,10)}</p>
                        <p style={{fontSize:20, fontWeight:"bold", color:"#0048b9"}}>"{this.props.review.review_headline}"</p>
                    </div> 
                </Card>
            </div>
        )
    }
}

export default MiniReviewCard