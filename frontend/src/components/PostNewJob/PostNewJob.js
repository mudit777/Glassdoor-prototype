import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar'
import 'antd/dist/antd.css';
import {Button, Card, Checkbox, Col, Input, notification, Row, Rate, Modal, Pagination} from 'antd';
import { FacebookOutlined, TwitterOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons';
import axios from 'axios'
import ReviewCard from '../ReviewCard/ReviewCard';
import { BACKEND } from '../../Config';
import CompanyBar from '../CompanyHeaderBar/CompanyBar'


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
            pageCount: 1,
            company:{},
            salary : [],
            jobs:[],
            top_jobs:[],
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
        var company = {
            company_id : sessionStorage.getItem('company_id')
        }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
            if(response.status === 200)
            {
                console.log(response.data)
                this.setState({
                    company : response.data,
                        photo: response.data.company_profile_photo
                })
            }
        })
        axios.post(`${BACKEND}/getCompanySalary`, company).then(response => {
            console.log('salary')
            if(response.status === 200)
            {
                console.log(response.data,'salary')
                this.setState({
                    salary : response.data
                })
            }
        })
        axios.post(`${BACKEND}/getJob`, company).then(response => {
            if(response.status === 200)
            {
                console.log(response.data)
                this.setState({
                    jobs : response.data
                })
                var temp = this.state.jobs.slice(0,5)
                this.setState({
                    top_jobs : temp
                })
            }
        })
        axios.post(`${BACKEND}/getCompanyReviews`,company)
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
            temp = <div>
                {this.state.elements.map(i => {
                    return(
                        <ReviewCard photo={this.state.company.company_profile_photo} review = {i} key = {i.review_id} />
                    )
                })}
            </div>
        }
        // {console.log("STATE REVIEWS IS:", this.state.reviews)}
        return (
            <div>
                <CompanyHeaderBar/>
                <CompanyBar student='false' total_reviews = {this.state.reviews.length} company_id={this.props.location.state.company_id} total_salary = {this.state.salary.length} total_jobs = {this.state.jobs.length} company = {this.state.company}/>

                <div style={{backgroundColor:"#f2f2f2"}}>
                    <div style={{marginLeft:224}}>
                        <Card title = "Reviews" style={{width:676}}>
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
