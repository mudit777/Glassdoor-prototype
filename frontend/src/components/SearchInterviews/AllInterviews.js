import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import InterviewCard from '../InterviewCard/InterviewCard'
import axios from 'axios'
import { BACKEND } from '../../Config';
import Footer from '../Footer/Footer'


export default class AllInterviews extends Component {
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
                  interview:[],
            }
      }
      componentDidMount(){
            axios.post(`${BACKEND}/getAllInterviews`).then(response => {
                  console.log('salary')
                  if(response.status === 200)
                  {
                      console.log(response.data,'salary')
                      this.setState({
                          interview : response.data
                      })
                  }
              })
      }
      render() {
            return (
                  <div>
                        <CompanyHeaderBarForm type='student' />
                        <div style={{backgroundColor:'#f2f2f2',display:'flex',flexDirection:'column',paddingLeft:'24rem',paddingTop:'2rem'}}>
                              {this.state.interview.map(a =>{
                                return (<InterviewCard interview = {a}/>)
                            })}
                        </div>
                        <Footer/>
                  </div>
            )
      }
}
