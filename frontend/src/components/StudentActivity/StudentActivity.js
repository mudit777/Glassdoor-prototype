import React, { Component } from 'react'
import Student from '../Cards/Student'
import CompanyBar from '../CompanyHeaderBar/CompanyBar'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import ReviewCard from '../ReviewCard/ReviewCard'
import Axios from 'axios'
import { BACKEND } from '../../Config';
import { Card, Button } from 'antd';
import StudentReviewCard from '../StudentReviewCard/StudentReviewCard'



export default class StudentActivity extends Component {
      constructor(props){
            super(props)
            this.state={
                  reviews:[],
            }
      }
      componentDidMount(){
            var myJson = {
                  student_id: window.sessionStorage.getItem("student_id")
              }
            Axios.post(`${BACKEND}/getStudentReviews`,myJson)
            .then(response => {
                console.log("Status Code in Getting Reviews : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING REVIEWS!")
                    console.log(response.data);
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
      }
      render() {
            return (
                  <div>
                        <CompanyHeaderBarForm type='student'/>
                        <div style={{display:'flex',justifyContent:'flex-start',alignContent:'flex-start',backgroundColor:'#f2f2f2'}}>
                              <div>
                                    <Student/>
                                    <Card title = 'User reviews' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '52rem',marginTop:'2rem',marginLeft:'6rem'}} actions = {[
                                    ]}>
                                          {this.state.reviews.map(i=>{
                                          return(
                                                <div>
                                                      <StudentReviewCard review = {i} key={i.review_id}/>
                                                </div>
                                          )
                                          })}
                                    </Card>
                              </div>
                              <div>
                                    <Card title = 'User photos' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '30rem',margin:'2rem 1rem'}} actions = {[
                                    ]}>
                                          All user photos
                                          
                                    </Card>
                              </div>
                        </div> 
                  </div>
            )
      }
}
