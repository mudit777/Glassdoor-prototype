import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import Chart from './Chart'

export default class Report extends Component {
      constructor(props){
            super(props)
            this.state={
                  chartData:null
            }
      }
      componentDidMount(){
            this.setState({
                  jobChartData:{
                    labels: ["Jobs posted","Applicants applied", "Applicants selected","Applicants rejected"],
                    datasets:[
                      {
                        data:[
                          200,
                          168,
                          115,
                          53
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
                  raceChartData:{
                        labels: ["Asian","African", "White","Latino"],
                        datasets:[
                          {
                            
                            data:[
                              200,
                              168,
                              115,
                              53
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
                      genderChartData:{
                        labels: ["Male","Female"],
                        datasets:[
                          {
                            
                            data:[
                              200,
                              168,
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
                              200,
                              168,
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
                              200,
                              168,
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
                  </div>
            )
      }
}
