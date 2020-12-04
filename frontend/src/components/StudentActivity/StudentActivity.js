import React, { Component } from 'react'
import Student from '../Cards/Student'
import CompanyBar from '../CompanyHeaderBar/CompanyBar'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import ReviewCard from '../ReviewCard/ReviewCard'
import Axios from 'axios'
import { BACKEND } from '../../Config';
import { Card, Button } from 'antd';
import StudentReviewCard from '../StudentReviewCard/StudentReviewCard'
import Footer from '../Footer/Footer'
import MiniReviewCard from '../MiniCards/MiniReviewCard'
import MiniInterviewCard from '../MiniCards/MiniInterviewCard'
import MiniSalaryCard from '../MiniCards/MiniSalaryCard'
import { Link } from 'react-router-dom'



export default class StudentActivity extends Component {
      constructor(props){
            super(props)
            if(!sessionStorage.getItem('student_id'))
        {
            window.location.replace('/login')
        }
        else
        {
            
        }
            this.state={
                  reviews:[],
                  interviews:[],
                  salaries:[],
            }
      }
      componentDidMount(){
            var myJson = {
                  student_id: window.sessionStorage.getItem("student_id")
              }
            Axios.post(`${BACKEND}/getStudentReviews`,myJson)
            .then(response => {
            //     console.log("Status Code in Getting Reviews : ",response.status);
                if(response.status === 200){
                  //   console.log("HERE IN ACTIONS - GETTING REVIEWS!")
                  //   console.log(response.data);
                    this.setState(
                    {
                        reviews : response.data
                    })
                    // Object.keys(this.state.reviews).map(i=>{
                    //     console.log("REVIEW IS",this.state.reviews[i].review_cons)
                    // })
                }else{
                }
            })
            .catch(err => {
                
        })
            Axios.post(`${BACKEND}/getStudentInterviews`,myJson)
            .then(response => {
            //     console.log("Status Code in Getting Reviews : ",response.status);
                if(response.status === 200){
                  //   console.log("HERE IN ACTIONS - GETTING REVIEWS!")
                  //   console.log(response.data);
                    this.setState(
                    {
                        interviews : response.data
                    })
                    // Object.keys(this.state.reviews).map(i=>{
                    //     console.log("REVIEW IS",this.state.reviews[i].review_cons)
                    // })
                }else{
                }
            })
            .catch(err => {
                
        })
            Axios.post(`${BACKEND}/getStudentSalaries`,myJson)
            .then(response => {
            //     console.log("Status Code in Getting Reviews : ",response.status);
                if(response.status === 200){
                  //   console.log("HERE IN ACTIONS - GETTING REVIEWS!")
                    console.log(response.data);
                    this.setState(
                    {
                        salaries : response.data
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
            return (
                  <div>
                        <CompanyHeaderBarForm type='student'/>
                        <div style={{display:'flex',justifyContent:'flex-start',alignContent:'flex-start',backgroundColor:'#f2f2f2'}}>
                              <div>
                                    <Student totalreviews={this.state.reviews.length} />
                                    <Card title = 'Reviews' style={{height : '20rem', overflowY : "scroll",boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '52rem',marginTop:'2rem',marginLeft:'6rem'}} actions = {[
                                    ]}>
                                          {this.state.reviews.map(i=>{
                                          return(
                                                <div>
                                                      <Link to='/allReviews'>

                                                      <MiniReviewCard review = {i} key={i.review_id}/>

                                                      </Link>
                                                </div>
                                          )
                                          })}
                                    </Card>
                                    <Card title = 'Interviews' style={{height : '20rem', overflowY : "scroll",boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '52rem',marginTop:'2rem',marginLeft:'6rem'}} actions = {[
                                    ]}>
                                          {this.state.interviews.map(i=>{
                                          return(
                                                <div>
                                                      {/* <InterviewCard interviews = {i} key={i._id}></InterviewCard> */}
                                                      <Link to='/allInterviews'>
                                                      <MiniInterviewCard interview = {i} key={i._id}/>
                                                      </Link>
                                                </div>
                                          )
                                          })}
                                    </Card>
                                    <Card title = 'Salaries' style={{height : '20rem', overflowY : "scroll",boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '52rem',marginTop:'2rem',marginLeft:'6rem'}} actions = {[
                                    ]}>
                                          {this.state.salaries.map(i=>{
                                          return(
                                                <div style={{marginLeft:'-17rem',width:'0rem'}}>
                                                      {/* <InterviewCard interviews = {i} key={i._id}></InterviewCard> */}
                                                      <Link to='/allSalary'>
                                                            <MiniSalaryCard salary = {i} key={i._id}/>
                                                      </Link>
                                                </div>
                                          )
                                          })}
                                    </Card>
                              </div>
                              
                        </div> 
                        <Footer/>
                  </div>
            )
      }
}
