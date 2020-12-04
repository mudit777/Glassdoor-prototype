import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import axios from 'axios'
import {Modal, Button} from 'semantic-ui-react'
import Company from '../Cards/Company'
import Job from '../Cards/Job'
import CompanyBar from '../CompanyHeaderBar/CompanyBar'
import { BACKEND } from '../../Config';
import { Link } from 'react-router-dom'
import { Card } from 'antd';


class CompanyProfilePage extends Component {
    constructor(){
        super();
        this.state = {  
            firstname : "",
            open: false,
            setOpen: false,
            company : {},
            salary : [],
            jobs:[],
            top_jobs:[],
            reviews : [],
        }
        this.getCompanyDetails();
    }
    getCompanyDetails = () => {
        var company = {
            company_id : sessionStorage.getItem("company_id")
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
        // console.log("The state is ==============", this.state)
        return (
            <div>
                <CompanyHeaderBar/>
                <CompanyBar total_reviews = {this.state.reviews.length} company_id={sessionStorage.getItem("company_id")} total_salary = {this.state.salary.length} total_jobs = {this.state.jobs.length} company = {this.state.company}/>
                <div style={{display:'flex',justifyContent:'flex-start',backgroundColor:'#f2f2f2',margin:'0 0'}}>
                    <Company user='false' company = {this.state.company} />
                    {/* loop the jobs */}
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignContent:'flex-start'}}>
                        <Card title = 'All Jobs Posted' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '20rem',margin:'2.5rem 3rem'}}>
                            {this.state.top_jobs.map(a =>{
                                //console.log(a)
                                return (<Link to='#' style={{color:"black"}} ><Job job = {a}/></Link>)
                            })}
                            <br/>
                            <Link style={{backgroundColor:"#00a422",color:'white' , height:'2rem', width:'10rem', color:"white",padding:'1rem 1rem' }} to={{pathname:'/companyJobs',state:{company_id:sessionStorage.getItem('company_id'),type:'company'}}}>View all jobs</Link>

                        </Card>

                    </div>
                </div>
                
            </div>
        )
    }
}

export default CompanyProfilePage;
