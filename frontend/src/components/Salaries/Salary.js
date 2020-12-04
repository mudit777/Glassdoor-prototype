import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import SalaryCard from '../SalaryCard/SalaryCard'
import axios from 'axios'
import { BACKEND } from '../../Config'
import CompanyBar from '../CompanyHeaderBar/CompanyBar'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import {Pagination} from 'antd'

export default class Salary extends Component {
      constructor(props){
            super(props);
            if(!sessionStorage.getItem('company_id') && !sessionStorage.getItem('student_id'))
            {
                window.location.replace('/login')
            }
            else
            {
                
            }
            this.state = { 
                positive_review: [],
                negative_review: [],
                company: {},
                salary : [],
                jobs:[],
                top_jobs:[],
                reviews : [],
                offset: 0,
                  elements: [],
                  perPage: 3,
                  currentPage: 1,
                  pageCount: 1
            }
            // console.log(props)
        }
        setElementsForCurrentPage = () => {
            console.log("Student jobs are ", this.state.salary)
            let elements = this.state.salary.slice(this.state.offset, this.state.offset + this.state.perPage);
            console.log("The elements are -----------", elements);
            this.setState({ 
                elements : elements
            });
        }
        showCatalogicData = () => {
            console.log("Inside show catolgocal data function", this.state.elements);
            return <CompanyCard company = {this.state.elements[0]} />
        }
        handlePageClick = (pageNo) => {
            const selectedPage = pageNo - 1; 
            const offset = selectedPage * this.state.perPage;
            this.setState({ currentPage: selectedPage, offset: offset }, 
                () => this.setElementsForCurrentPage()
            );
        }
      componentDidMount(){
            console.log(this.props)
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
                      this.setElementsForCurrentPage();
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
      render() {
            var com_bar=null;
            var b=null;
            if(this.props.location.state.type === 'student')
            {
                  //studnet
                  com_bar=<CompanyBar student='true' total_reviews = {this.state.reviews.length} company_id={this.props.location.state.company_id} total_salary = {this.state.salary.length} total_jobs = {this.state.jobs.length} company = {this.state.company}/>
                  b=<Link to={{pathname:'/addSalary',state:{company_id:this.props.location.state.company_id}}} style={{height: 40, backgroundColor:"#004fb4", color:"white", borderRadius:5, fontWeight:"bold", marginLeft:'78rem',marginTop:'15rem',padding:'1rem'}}>Add Salary</Link>

            }
            else
            {
                  //company
                  com_bar=<CompanyBar student='false' total_reviews = {this.state.reviews.length} company_id={this.props.location.state.company_id} total_salary = {this.state.salary.length} total_jobs = {this.state.jobs.length} company = {this.state.company}/>

            }
            let paginationElement;
            if(this.state.salary.length > 0)
            {
                if(this.state.pageCount > 0)
                {
                    paginationElement = (<Pagination
                        defaultCurrent={1} 
                        onChange={this.handlePageClick}       
                        size="small" 
                        total={this.state.salary.length}
                        showTotal={(total, range) => 
                        `${range[0]}-${range[1]} of ${total} items`}   
                        defaultPageSize={this.state.perPage}
                    />)
                }
            }
            return (
                  <div>
                        <CompanyHeaderBarForm type={this.props.location.state.type} />
                        <div style={{backgroundColor:'f2f2f2'}}>
                              {com_bar}
                              <div style={{backgroundColor:'#f2f2f2',margin:'0 0',padding:'2rem 0'}}>
                                    {b}
                              </div>
                              {this.state.elements.map(i=>{
                                    return(
                                        <SalaryCard salary={i} />
                                    )
                                })}
                                <div>
                                {paginationElement}
                            </div>
                                
                        </div>
                        <Footer/>
                  </div>
            )
      }
}
