import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import InterviewCard from '../InterviewCard/InterviewCard'
import axios from 'axios'
import { BACKEND } from '../../Config';
import Footer from '../Footer/Footer'
import {Pagination} from 'antd'


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
                  offset: 0,
                  elements: [],
                  perPage: 3,
                  currentPage: 1,
                  pageCount: 1
            }
      }
      setElementsForCurrentPage = () => {
            console.log("Student jobs are ", this.state.interview)
            let elements = this.state.interview.slice(this.state.offset, this.state.offset + this.state.perPage);
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
            axios.post(`${BACKEND}/getAllInterviews`).then(response => {
                  console.log('salary')
                  if(response.status === 200)
                  {
                      console.log(response.data,'salary')
                      this.setState({
                          interview : response.data
                      })
                      this.setElementsForCurrentPage();
                  }
              })
      }
      render() {
            let paginationElement;
        if(this.state.interview.length > 0)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.state.interview.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }
            return (
                  <div>
                        <CompanyHeaderBarForm type='student' />
                        <div style={{backgroundColor:'#f2f2f2',display:'flex',flexDirection:'column',paddingLeft:'24rem',paddingTop:'2rem'}}>
                              {this.state.elements.map(a =>{
                                return (<InterviewCard interview = {a}/>)
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
