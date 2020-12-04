import React, { Component } from 'react'
import axios from 'axios';
import { BACKEND } from '../../Config';
import CompanyJobCard from '../CompanyJobCard/CompanyJobCard';
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar';
import { Col, Row ,Button, Pagination} from 'antd';
import CompanyJobDetails from '../CompanyJobDetails/CompanyJobDetails';
import StudentJobDetails from '../StudentJobDetails/StudentJobDetails'
import CompanyBar from '../CompanyHeaderBar/CompanyBar';
import Footer from '../Footer/Footer';

class CompanyJobs extends Component {
    constructor(props)
    {
        super(props);
        if(!sessionStorage.getItem('company_id') && !sessionStorage.getItem('student_id'))
        {
            window.location.replace('/login')
        }
        else
        {
            
        }
        this.state = {
            jobs : [],
            company : {},
            currentJob : {},
            salary : [],
            top_jobs:[],
            reviews : [],
            offset: 0,
            elements: [],
            perPage: 2,
            currentPage: 1,
            pageCount: 1
        }
        this.getCompanyJobs();
    }
    componentDidMount(){
        // console.log(this.props)
        this.getCompanyDetails();
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
            // console.log('state',this.props.location.state.company_id)
            var company = {
                company_id : this.props.location.state.company_id
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
            // console.log('state',this.props.location.state.company_id)
            var company = {
                company_id : this.props.location.state.company_id
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
        var c = null;
        if(this.props.location.state){
            if(this.props.location.state.type === 'student')
                {
                    c=<CompanyBar student='true' total_reviews = {this.state.reviews.length} company_id={this.props.location.state.company_id} total_salary = {this.state.salary.length} total_jobs = {this.state.jobs.length} company = {this.state.company}/>
                }
                else{
                    c=<CompanyBar student='false' total_reviews = {this.state.reviews.length} company_id={this.props.location.state.company_id} total_salary = {this.state.salary.length} total_jobs = {this.state.jobs.length} company = {this.state.company}/>
                }
        }
        if(this.state.currentJob.job_id > 0)
        {

            if(this.props.location.state){
                if(this.props.location.state.type === 'student')
                {
                    jobDetails = <StudentJobDetails job = {this.state.currentJob} company = {this.state.company} key = {this.state.currentJob.job_id}  />
                }
                else{
                    jobDetails = <CompanyJobDetails job = {this.state.currentJob} company = {this.state.company} key = {this.state.currentJob.job_id}  />
                }
            }
            else{
                jobDetails = <CompanyJobDetails job = {this.state.currentJob} company = {this.state.company} key = {this.state.currentJob.job_id}  />

            }
            
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
                    <CompanyHeaderBarForm type={this.props.location.state.type} /> 
                </div>
                <div>
                    {c}
                </div>
                <div style={{backgroundColor:'#f2f2f2'}}>
                    <Row style = {{marginLeft : "2%",paddingTop:'3rem'}}>
                        <Col style = {{width : "20rem",paddingRight:'1rem',marginLeft:'13rem'}}>
                            {temp}
                            <div>
                                {paginationElement}
                            </div>
                        </Col>
                        <Col style = {{width : "60rem",height : "600px", overflowY : "scroll"}}>
                            {jobDetails}
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default CompanyJobs;