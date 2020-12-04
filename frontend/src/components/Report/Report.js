import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import Chart from './Chart'
import Footer from '../Footer/Footer'
import Axios from 'axios'
import axios from 'axios'
import {BACKEND} from '../../Config'

export default class Report extends Component {
      constructor(props){
            super(props)
            if(!sessionStorage.getItem('company_id'))
            {
                window.location.replace('/login')
            }
            else
            {
                
            }
            this.state={
                  chartData:null,
                  jobs:[],

            }
      }
      componentDidMount(){
          var company={
            company_id:sessionStorage.getItem('company_id')
          }
          axios.post(`${BACKEND}/getJob`, company).then(response2 => {
            if(response2.status === 200)
            {
                console.log(response2.data)
                this.setState({
                    jobs : response2.data
                },()=>{
                  let maleCount=0;
                  let femaleCount=0;
                  let disableCount=0;
                  let enableCount=0;
                  let veteran=0;
                  let noveteran=0;
                  let asian=0;
                  let african=0;
                  let white=0;
                  let latino=0;
                  let applied=0;
                  let selected=0;
                  let rejected=0;
                    Axios.post(`${BACKEND}/getCompanyApplications`, company).then(response => {
                      console.log(response)
                      if(response.status === 200)
                      {
                        console.log(response)
                        console.log(this.state.jobs.length)

                          for(var i=0;i<response.data.length;i++)
                          {
        
                              if(response.data[i].gender === 'Male'){
                                maleCount++;
                              }
                              else{
                                femaleCount++;
                              }
        
                              if(response.data[i].disability === 'I dont have disability'){
                                enableCount++;
                              }
                              else{
                                disableCount++;
                              }
        
                              if(response.data[i].veteran === 'I am not a veteran'){
                                noveteran++;
                              }
                              else{
                                veteran++;
                              }
        
                              if(response.data[i].application_status === 'Hired'){
                                selected++;
                              }
                              else if(response.data[i].application_status !== 'Withdrawn' && response.data[i].application_status !== 'Hired' && response.data[i].application_status !== 'Rejected'){
                                applied++;
                              }
                              else if(response.data[i].application_status === 'Rejected'){
                                rejected++;
                              }
        
                              if(response.data[i].race === 'Asian'){
                                asian++;
                              }
                              else if(response.data[i].race === 'African'){
                                african++;
                              }
                              else if(response.data[i].race === 'White'){
                                white++;
                              }
                              else{
                                latino++;
                              }
        
                          }
                              this.setState({
                                genderChartData:{
                                  labels: ["Male","Female"],
                                  datasets:[
                                    {
                                      data:[
                                        maleCount,
                                        femaleCount,
                                      ],
                                      backgroundColor:[
                                        '#05A521',
                                        '#05A521',
                                      ],
                                      borderWidth:1,
                                      borderColor:'#777',
                                      hoverBorderWidth:3,
                                      hoverBorderColor:'#FFF',
                                    }
                                  ]
                                },
                                disabilitychartData:{
                                  labels: ["YES","NO"],
                                  datasets:[
                                    {
                                      data:[
                                        disableCount,
                                        enableCount,
                                      ],
                                      backgroundColor:[
                                        '#05A521',
                                        '#05A521',
                                      ],
                                      borderWidth:1,
                                      borderColor:'#777',
                                      hoverBorderWidth:3,
                                      hoverBorderColor:'#FFF'
                                    }
                                  ]
                                },
                              veteranchartData:{
                                labels: ["YES","NO"],
                                datasets:[
                                  {
                                    
                                    data:[
                                      veteran,
                                      noveteran,
                                    ],
                                    backgroundColor:[
                                      '#05A521',
                                      '#05A521',
                                    ],
                                    borderWidth:1,
                                    borderColor:'#777',
                                    hoverBorderWidth:3,
                                    hoverBorderColor:'#FFF'
                                  }
                                ]
                              },
                              raceChartData:{
                                labels: ["Asian","African", "White","Latino"],
                                datasets:[
                                  {
                                    
                                    data:[
                                      asian,
                                      african,
                                      white,
                                      latino
                                    ],
                                    backgroundColor:[
                                      '#05A521',
                                      '#05A521',
                                      '#05A521',
                                      '#05A521'
                                    ],
                                    borderWidth:1,
                                    borderColor:'#777',
                                    hoverBorderWidth:3,
                                    hoverBorderColor:'#FFF'
                                  }
                                ]
                              },
                              jobChartData:{
                                labels: ["Jobs posted","Applicants applied", "Applicants selected","Applicants rejected"],
                                datasets:[
                                  {
                                    data:[
                                      this.state.jobs.length,
                                      applied,
                                      selected,
                                      rejected
                                    ],
                                    backgroundColor:[
                                      '#05A521',
                                      '#05A521',
                                      '#05A521',
                                      '#05A521'
                                    ],
                                    borderWidth:1,
                                    borderColor:'#777',
                                    hoverBorderWidth:3,
                                    hoverBorderColor:'#FFF'
                                  }
                                ],
                                
                              },
        
        
        
                              })
                      }
                    })
               
                })
            }
        })
               
      }
      render() {
            return (
                  <div >
                        <CompanyHeaderBarForm type='company'/>
                        <div style={{display:'flex'}}>
                              <div style={{width:'50rem',marginLeft:'3rem',marginRight:'3rem',marginTop:'2rem',marginBottom:'3rem'}}>
                                    <Chart chartData={this.state.jobChartData} title='Job Analysis' legendPosition="bottom"/>
                                    <Chart chartData={this.state.raceChartData} title='Applicants applied by Race' legendPosition="bottom"/>
                              </div>
                              <div style={{width:'34rem',marginLeft:'3rem',marginRight:'3rem',marginTop:'2rem',marginBottom:'3rem'}}>
                                    <Chart chartData={this.state.genderChartData} title='Applicants applied by Gender' legendPosition="bottom"/>
                                    <Chart chartData={this.state.disabilitychartData} title='Applicants having Disability' legendPosition="bottom"/>
                                    <Chart chartData={this.state.veteranchartData} title='Applicants who are Veteran' legendPosition="bottom"/>      
                              </div>
                        </div>
                        <Footer/>
                  </div>
            )
      }
}
