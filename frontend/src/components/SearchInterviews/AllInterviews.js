import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import InterviewCard from '../InterviewCard/InterviewCard'
import axios from 'axios'
import { BACKEND } from '../../Config';


export default class AllInterviews extends Component {
      constructor(props){
            super(props)
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
                        {this.state.interview.map(a =>{
                                return (<InterviewCard interview = {a}/>)
                            })}
                  </div>
            )
      }
}
