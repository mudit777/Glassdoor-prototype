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
import CompanyBar from '../CompanyHeaderBar/CompanyBar';


export default class ShowApplicants extends Component {
      constructor(props)
    {
        super(props);
        this.state = {
            jobs : [],
            company : {},
            currentJob : {},
            applicants : [],
            salary : [],
            top_jobs:[],
            reviews : [],
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
            var company = {
                company_id : sessionStorage.getItem('company_id')
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
                              <CompanyHeaderBarForm type='company' /> 
                        </div>
                        <div>
                            <CompanyBar student='false' total_reviews = {this.state.reviews.length} company_id={sessionStorage.getItem('company_id')} total_salary = {this.state.salary.length} total_jobs = {this.state.jobs.length} company = {this.state.company}/>
                        </div>
                        <div style={{backgroundColor:'#f2f2f2',padding:'2rem 0'}}>
                                    <Card style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", marginLeft : "15rem",  width : "73rem"}}>
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
                                            <Link to={{pathname:'/companyJobs',state:{company_id:window.sessionStorage.getItem("company_id"),type:'company'}}} style={{fontWeight:'bold',color:'#5185CE'}}>View all Jobs</Link>
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
                                    </Card>
                        </div>
                  </div>
            )
      }
}
