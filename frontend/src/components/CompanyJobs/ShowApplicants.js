import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import axios from 'axios';
import { BACKEND } from '../../Config';
import CompanyJobCard from '../CompanyJobCard/CompanyJobCard';
import { Col, Row,Card, Rate, Pagination } from 'antd';
import CompanyJobDetails from '../CompanyJobDetails/CompanyJobDetails';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react';
import Student from '../Cards/Student';
import Applicant from '../Cards/Applicant';


export default class ShowApplicants extends Component {
      constructor(props)
    {
        super(props);
        this.state = {
            jobs : [],
            company : {},
            currentJob : {},
            applicants : [],
            offset: 0,
            elements: [],
            perPage: 2,
            currentPage: 1,
            pageCount: 1
        }
        
    }
    componentDidMount(){
          console.log(this.props)
      this.getCompanyJobs();
        this.getCompanyDetails();
            this.setState({
                  currentJob  : this.props.location.state.job
            })
            var job = {
                  job_id : this.props.location.state.job.job_id
              }
              
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
             console.log('----------------------------------')

            axios.post(`${BACKEND}/getApplicants`, job).then(response => {
                  console.log('----------------------------------')
                      
                    this.setState({
                        applicants : response.data
                    })
                
            })
            
    }
    getCompanyJobs = () => {
      if(!window.sessionStorage.getItem('company_id'))
      {
          console.log('state',this.props.location.state.company_id)
          var company = {
              company_id : this.props.location.state.job.company_id
          }
      }
      else{
          console.log('session')

          var company = {
              company_id : window.sessionStorage.getItem("company_id")
          }
      }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCompanyJobs`, company).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    jobs : response.data
                })
                this.setElementsForCurrentPage();
            }
        })
    }
    getCompanyDetails = () => {
      if(!window.sessionStorage.getItem('company_id'))
      {
          console.log('state',this.props.location.state.company_id)
          var company = {
              company_id : this.props.location.state.job.company_id
          }
      }
      else{
          console.log('session')

          var company = {
              company_id : window.sessionStorage.getItem("company_id")
          }
      }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    company : response.data
                })
            }
        })
    }
    updateSelectedJob = (job) => {
        this.setState({
            currentJob  : job
        })
    }
    showjob=e=>{
          
    }
    setElementsForCurrentPage = () => {
        let elements = this.state.jobs.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            <CompanyJobCard updateSelectedJob = {this.updateSelectedJob} job = {i} key = {i.job_id} company = {this.state.company} />
        })
    }
    handlePageClick = (pageNo) => {
        const selectedPage = pageNo - 1; 
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, 
            () => this.setElementsForCurrentPage()
        );
    }
      render() {
            var temp = null;
            if(this.state.jobs.length > 0)
            {
                  temp = this.state.elements.map(i => {
                  return(
                        <CompanyJobCard updateSelectedJob = {this.updateSelectedJob} job = {i} key = {i.job_id} company = {this.state.company} />
                  )
                  })
            }
            var jobDetails = null;
            if(this.state.currentJob.job_id > 0)
            {
                  jobDetails = <CompanyJobDetails job = {this.state.currentJob} company = {this.state.company} key = {this.state.currentJob.job_id}  />
            }
            let paginationElement;
        if(this.state.jobs.length > 0)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.state.jobs.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }
            return (
                  <div>
                       <div>
                              <CompanyHeaderBarForm /> 
                        </div>
                        <div>
                              <Row style = {{marginLeft : "2%"}}>
                                    <Col style = {{width : "30%"}}>
                                    {temp}
                                    {paginationElement}
                                    </Col>
                                    <Col style = {{height : "600px", overflowY : "scroll"}}>
                                    <Card style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", marginTop : "3%", marginLeft : "4%", marginRight : "4%", width : "930px"}}>
                                          <Row style = {{borderBottom : "1px solid lightGrey"}}>
                                          <Col>
                                                <ul style = {{listStyleType : "none"}}>
                                                      <li>
                                                      <h3>{this.state.currentJob.job_company_name}</h3>
                                                      </li>
                                                      <li>
                                                      <h2 style = {{fontWeight : 'bolder'}}>{this.state.currentJob.job_title}</h2>
                                                      </li>
                                                      <li>
                                                      <Rate defaultValue = {5} disabled />
                                                      </li>
                                                      <li>
                                                      <p style = {{color : 'grey'}}>{this.state.currentJob.job_city}, {this.state.currentJob.job_state}</p>
                                                      </li>
                                                      <li>
                                                      <p style = {{color : 'grey'}}>Estimated Salary:  ${this.state.currentJob.job_expected_salary}</p>
                                                      </li>
                                                </ul>
                                          </Col>
                                          <Col style = {{marginTop : "2%", marginLeft : "5%", width: "59%"}}>
                                                <Link to='/companyJobs' style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder",padding:'1rem 1rem'}} >Show Job Description</Link>
                                          </Col>
                                          </Row>
                                          <div>
                                                {this.state.applicants.map(i => {
                                                return(
                                                      <Applicant resume={i.resume} application_id={i._id} status={i.application_status} coverletter={i.cover_letter} student_id={i.student_id}/>
                                                )
                                                })}
                                          </div>
                                    </Card>
                                    </Col>
                              </Row>
                        </div>
                  </div>
            )
      }
}
