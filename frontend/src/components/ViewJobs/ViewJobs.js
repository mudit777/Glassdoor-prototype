import React, { Component } from 'react'
import { get_all_jobs } from '../../js/actions';
import { connect } from 'react-redux';
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar';
import { Col, Pagination, Row } from 'antd';
import JobCard from '../JobCard/JobCard';
import Axios from 'axios';
import { BACKEND } from '../../Config';
import StudentJobDetails from '../StudentJobDetails/StudentJobDetails';
import JobsFilter from '../JobsFilter/JobsFilter';

class ViewJobs extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            favourites : [],
            selectedJob : {},
            jobs : [],
            offset: 0,
            elements: [],
            perPage: 3,
            currentPage: 1,
            pageCount: 1
        }
        

    }
    componentDidMount(){
        setTimeout(() => {
            if(this.props.studentJobs)
            {
                // console.log("Hi there are jobs here")
            }
            else
            {
                // console.log("no jobs")
            }
        }, );
        // console.log("STUDENT jobs `~~~~~~~~", this.props.studentJobs)
    }
    componentWillReceiveProps()
    {
        
        setTimeout(() => {
            if(this.props.studentJobs)
            {
                console.log("jobs in recieve method")
                // this.props.studentJobs.sort((a, b) => (a.event_date > b.event_date) ? 1 : (a.event_date === b.event_date) ? ((a.event_time > b.event_time) ? 1 : -1) : -1 )
                this.setState({
                    jobs : this.props.studentJobs
                })
                this.setElementsForCurrentPage();
            }
            else{
                console.log("No jobs in recieve")
                this.props.get_all_jobs();
            }
            
        }, );
        this.getFavouriteJobs();
    }
    setElementsForCurrentPage = () => {
        console.log("Student jobs are ", this.state.jobs)
        let elements = this.state.jobs.slice(this.state.offset, this.state.offset + this.state.perPage);
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
    getFavouriteJobs = () => {
        var student = {
            student_id : window.sessionStorage.getItem("student_id")
        }
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.post(`${BACKEND}/getFavouriteJobs`, student).then(response => {
            if(response.status === 200)
            {
                if(response.data !== null)
                {
                    this.setState({
                        favourites : response.data.jobs
                    })
                }
                
                
            }
        })
    }
    updateSelectedJob = (job) => {
        this.setState({
            selectedJob : job
        })
    } 
    render() {
        var temp = null;
        
        if(this.props.studentJobs)
        {
            console.log("The state is", this.state);
           temp = this.state.elements.map(i => {
            
               if(this.state.favourites.length > 0)
               {
                    if(this.state.favourites.includes(i.job_id))
                    {
                        return(
                            <JobCard job = {i} key = {i.job_id} favourite = {true} updateSelectedJob = {this.updateSelectedJob}/>
                        )
                    }
                    else
                    {
                        return(
                            <JobCard job = {i} key = {i.job_id} favourite = {false}  updateSelectedJob = {this.updateSelectedJob}/>
                        )
                    }
               }
               else 
               {
                    return(
                        <JobCard job = {i} key = {i.job_id} favourite = {false}   updateSelectedJob = {this.updateSelectedJob}/>
                    )
               }
           })
        }
        else
        {
            this.props.get_all_jobs();
        }
        let paginationElement;
        if(this.props.studentJobs)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.studentJobs.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }
        return (
            <div>
                <div>
                    <CompanyHeaderBarForm type='student' />
                </div>
                <div>
                    <JobsFilter />
                </div>
                <div>
                    <Row>
                        <Col style = {{maxHeight : 600, overflowY : "scroll", width : "30%"}}>
                            {temp}
                            <div>
                                {paginationElement}
                            </div>
                        </Col>
                        <Col style = {{maxHeight : 600, overflowY : "scroll", width : "70%"}}>
                            <StudentJobDetails job = {this.state.selectedJob} />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
// export default ViewJobs;
function mapDispatchToProps(dispatch) {
    return {
        get_all_jobs: user => dispatch(get_all_jobs())
    };
  }
  
function mapStateToProps(store) {
    return {
        message : store.message,
        studentJobs : store.studentJobs
    };
}

const ViewJobsForm = connect(mapStateToProps, mapDispatchToProps)(ViewJobs);
export default ViewJobsForm;