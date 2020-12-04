import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import { Button, Input, Rate, Checkbox, Progress } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { BACKEND } from '../../Config'
import StudentReviewCard from '../StudentReviewCard/StudentReviewCard';
import DonutChart from "react-svg-donut-chart"
import CompanyBar from '../CompanyHeaderBar/CompanyBar'
import { Link } from 'react-router-dom'



const { Search } = Input;

class StudentReviews extends Component {

    constructor(props){
        super(props);
        this.state = { 
            positive_review: [],
            negative_review: [],
            company: {},
            salary : [],
            jobs:[],
            top_jobs:[],
            reviews : [],
        }
        console.log(props)
    }
    
    componentDidMount(){
        var company = {
            company_id : this.props.location.state.company_id
        }
        // console.log(this.props)
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
            if(response.status === 200)
            {
                console.log(response.data)
                this.setState({
                    company : response.data
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
        axios.post(`${BACKEND}/getPositiveReview`,company)
            .then(response => {
                console.log("Status Code in Getting Positive Reviews : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING POSITIVE REVIEWS!")
                    console.log(response.data);
                    this.setState(
                    {
                        positive_review : response.data
                    })
                }else{
                }
            })
            .catch(err => {
                
        })
        axios.post(`${BACKEND}/getNegativeReview`,company)
            .then(response => {
                console.log("Status Code in Getting Negative Reviews : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING NEGATIVE REVIEWS!")
                    console.log(response.data);
                    this.setState(
                    {
                        negative_review : response.data
                    })
                }else{
                }
            })
            .catch(err => {
                
        })

        axios.post(`${BACKEND}/getCompanyReviews`,company)
      .then(response => {
          console.log("Status Code in Getting Reviews : ",response.status);
          if(response.status === 200){
              console.log("HERE IN ACTIONS - GETTING REVIEWS!")
              console.log(response.data);
              var average_ratings=0;
              var recommend_to_friend=0;
              var ceo_approval=0;
              for(var i=0;i<response.data.length;i++)
              {
                  average_ratings+=response.data[i].review_rating;
                  if(response.data[i].recommend_to_friend === '1')
                  {
                        recommend_to_friend++;
                  }
                  if(response.data[i].ceo_approval === '1')
                  {
                        ceo_approval++;
                  }
                  
              }
              average_ratings/=response.data.length
              recommend_to_friend = (recommend_to_friend*100)/response.data.length
                  ceo_approval = (ceo_approval*100)/response.data.length
            //   console.log('this is itttttttttttttt',average_ratings,recommend_to_friend,ceo_approval)
              this.setState(
              {
                  reviews : response.data,
                  average_ratings : average_ratings,
                  recommend_to_friend : recommend_to_friend,
                  ceo_approval : ceo_approval,
                  
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
        var datapie1 = [
            {value: this.state.average_ratings, stroke: "#dcee95", strokeWidth: 5},
            {value: 5-this.state.average_ratings, stroke: "#0caa41", strokeWidth: 5},
        ]
        var datapie2 = [
            {value: this.state.recommend_to_friend, stroke: "#dcee95", strokeWidth: 5},
            {value: 100-this.state.recommend_to_friend, stroke: "#0caa41", strokeWidth: 5},
        ]
        var datapie3 = [
            {value: this.state.ceo_approval, stroke: "#dcee95", strokeWidth: 5},
            {value: 100-this.state.ceo_approval, stroke: "#0caa41", strokeWidth: 5},
        ]
        return (
            <div>
                <CompanyHeaderBarForm type='student' />
                <CompanyBar student='true' total_reviews = {this.state.reviews.length} company_id={this.props.location.state.company_id} total_salary = {this.state.salary.length} total_jobs = {this.state.jobs.length} company = {this.state.company}/>
                <div style={{display:'flex',backgroundColor:'#f2f2f2'}} >
                    <div className="column-left-add-reviews" style={{backgroundColor:"#f2f2f2"}}> 
                        <div style={{marginLeft: 208, width:676, backgroundColor:"white", marginTop: 7, padding: 15}}>
                            <p style={{fontSize: 20}}>Reviews</p>
                            <Search placeholder="Search Job Titles" allowClear size="large" style={{width:505}}/>
                            <span><Link to={{pathname:'/addReview',state:{company:this.state.company}}}  style={{height: 40, backgroundColor:"#004fb4", color:"white", borderRadius:5, fontWeight:"bold", marginLeft:10,padding:'1rem'}}>Add a Review</Link></span>
                            
                            <div style={{height:66,marginBottom:'5rem',marginTop:'3rem'}}>
                                <div style={{display:'flex',justifyContent:'flex-start'}}>
                                        <div style={{width:'4rem',height:'8rem',marginRight:'5rem'}}>
                                            <DonutChart data={datapie1} />
                                            <p>Average ratings</p>
                                        </div>
                                        <div style={{width:'4rem',height:'8rem',marginRight:'5rem'}}>
                                            <DonutChart data={datapie2} />
                                            <p>Recommend to Friend</p>
                                        </div>
                                        <div style={{width:'4rem',height:'8rem',marginRight:'5rem'}}>
                                            <DonutChart data={datapie3} />
                                            <p>CEO approval</p>
                                        </div>
                                </div>                   
                            </div>
                            <div style={{marginLeft:-15}}>
                                {this.state.positive_review.map(i=>{
                                    return(
                                        <StudentReviewCard photo={this.state.company.company_profile_photo} review = {i} key={i.review_id}/>
                                    )
                                })}
                            </div>
                            <div style={{marginLeft:-15}}>
                                {this.state.negative_review.map(i=>{
                                    return(
                                        <StudentReviewCard photo={this.state.company.company_profile_photo} review = {i} key={i.review_id}/>
                                    )
                                })}
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

export default StudentReviews;
