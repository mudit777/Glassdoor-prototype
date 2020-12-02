import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import axios from 'axios'
import {Modal, Button} from 'semantic-ui-react'
import Company from '../Cards/Company'
import Job from '../Cards/Job'
import CompanyBar from '../CompanyHeaderBar/CompanyBar'
import { BACKEND } from '../../Config';
import { Link } from 'react-router-dom'
import { Card } from 'antd';
import ReviewCard from '../ReviewCard/ReviewCard';
import StudentReviewCard from '../StudentReviewCard/StudentReviewCard';
import DonutChart from "react-svg-donut-chart"

const dataPie = [
      {value: 60, stroke: "#dcee95", strokeWidth: 5},
      {value: 40, stroke: "#0caa41", strokeWidth: 5},
  ]
class CompanyProfilePageForUser extends Component {
    constructor(){
        super();
        this.state = {  
            firstname : "",
            open: false,
            setOpen: false,
            company : {},
            jobs:[],
            top_jobs:[],
            positive_review : [],
            negative_review : [],
            salary : [],
            reviews :[]
        }
        
    }
    componentDidMount(){
        // console.log(this.props)
      // var myJson = {
      //       company_id: window.sessionStorage.getItem("company_id")
      //   }
      this.getCompanyDetails();
      axios.post(`${BACKEND}/getCompanyReviews`)
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
      axios.post(`${BACKEND}/getPositiveReview`)
      .then(response => {
          console.log("Status Code in Getting Reviews : ",response.status);
          if(response.status === 200){
              console.log("HERE IN ACTIONS - GETTING REVIEWS!")
              console.log(response.data);
              this.setState(
              {
                  positive_review : response.data[0]
              })
              // Object.keys(this.state.reviews).map(i=>{
              //     console.log("REVIEW IS",this.state.reviews[i].review_cons)
              // })
          }else{
          }
      })
      .catch(err => {
          
  })
      axios.post(`${BACKEND}/getNegativeReview`)
      .then(response => {
          console.log("Status Code in Getting Reviews : ",response.status);
          if(response.status === 200){
              console.log("HERE IN ACTIONS - GETTING REVIEWS!")
              console.log(response.data);
              this.setState(
              {
                  negative_review : response.data[0]
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
    getCompanyDetails = () => {
        
        var company = {
            company_id : this.props.location.state.company_id
        }
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
    }
    render() {
      //   console.log("The state is ==============", this.state)
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
                <CompanyHeaderBar/>
                <CompanyBar photo = {this.state.company.company_profile_photo} total_salary = {this.state.salary.length} total_jobs = {this.state.jobs.length} total_reviews = {this.state.reviews.length} company = {this.state.company}/>
                <div style={{display:'flex',justifyContent:'flex-start',backgroundColor:'#EAEAEA',margin:'0 0'}}>
                    <Company user='true' company = {this.state.company} />
                    {/* loop the jobs */}
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignContent:'flex-start'}}>
                        <Card title = 'All Jobs Posted' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '20rem',marginTop:'2.5rem',marginLeft:'3rem'}}>
                            {this.state.top_jobs.map(a =>{
                                return (<Link to='#' style={{color:"black"}} ><Job job = {a}/></Link>)
                            })}
                        </Card>
                    </div>
                </div>
                
                <div style={{display:'flex',justifyContent:'flex-start',backgroundColor:'#EAEAEA',margin:'0 0'}}>
                  <Card title = 'Average reviews' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '52rem',marginBottom:'2rem',marginLeft:'15rem'}} actions = {[
                        ]}>
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
                        </Card>
                  </div>


                
                <div style={{display:'flex',justifyContent:'flex-start',backgroundColor:'#EAEAEA',margin:'0 0'}}>
                  <Card title = 'User reviews' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '52rem',marginTop:'0rem',marginLeft:'15rem'}} actions = {[
                  ]}>
                        <div>
                              <StudentReviewCard review = {this.state.positive_review} />
                              <StudentReviewCard review = {this.state.negative_review} />
                        </div>
                  </Card>
                </div>
                
            </div>
        )
    }
}

export default CompanyProfilePageForUser;
