import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar'
import 'antd/dist/antd.css';
import {Button, Card, Checkbox, Col, Input, notification, Row, Rate, Modal, Pagination} from 'antd';
import { FacebookOutlined, TwitterOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons';
import axios from 'axios'
import ReviewCard from '../ReviewCard/ReviewCard';


class PostNewJob extends Component {

    constructor(props){
        super(props);
        this.state = { 
            visible:false,
            reviews: [],
            offset: 0,
            elements: [],
            perPage: 6,
            currentPage: 1,
            pageCount: 1
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
                    // console.log("HERE IN ACTIONS - GETTING REVIEWS!")
                    // console.log(response.data);
                    this.setState(
                    {
                        reviews : response.data
                    })
                    this.setElementsForCurrentPage();
                }else{
                }
            })
            .catch(err => {
                
        })
    }
    setElementsForCurrentPage = () => {
        let elements = this.state.reviews.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    handlePageClick = (pageNo) => {
        const selectedPage = pageNo - 1; 
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, 
            () => this.setElementsForCurrentPage()
        );
    }
    render() {
        let paginationElement;
        if(this.state.reviews)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.state.reviews.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }
        var temp = null;
        console.log(this.state)
        if(this.state.elements.length > 0)
        {
            console.log("~~~~~~~~~~~~~~~ Hi")
            temp = <div>
                {this.state.elements.map(i => {
                    console.log("i~~~~~~~~~~~~~~~~~~~~~~~~~", i)
                    return(
                        <ReviewCard review = {i} key = {i.review_id} />
                    )
                })}
            </div>
        }
        // {console.log("STATE REVIEWS IS:", this.state.reviews)}
        return (
            <div>
                <CompanyHeaderBar/>
                <div style={{backgroundColor:"#cfcfcf"}}>
                    <div style={{marginLeft:224}}>
                        <Card title = "Amazon Reviews" style={{width:676}}>
                        </Card>
                        {/* {this.state.reviews.map(i=>{
                            return(
                                <ReviewCard review = {i} key={i.review_id}/>
                            )
                        })} */}
                        {temp}
                    </div>
                </div>
                <div>
                    {paginationElement}
                </div>
            </div>
        )
    }
}

export default PostNewJob;
