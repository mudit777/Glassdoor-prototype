import React, { Component } from 'react'
import { get_all_jobs } from '../../js/actions';
import { connect } from 'react-redux';
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar';
import { Col, Row } from 'antd';
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
            jobs : []
        }
        

    }
    componentDidMount(){
        setTimeout(() => {
            if(this.props.studentJobs)
            {
                console.log("Hi there are jobs here")
            }
            else
            {
                console.log("no jobs")
            }
        }, );
        console.log("STUDENT jobs `~~~~~~~~", this.props.studentJobs)
    }
    componentWillReceiveProps()
    {
        
        setTimeout(() => {
            if(this.props.studentJobs)
            {
                console.log("jobs in recieve method")
                // this.props.studentJobs.sort((a, b) => (a.event_date > b.event_date) ? 1 : (a.event_date === b.event_date) ? ((a.event_time > b.event_time) ? 1 : -1) : -1 )
                // this.setState({
                //     jobs : this.props.studentJobs
                // })
            }
            else{
                console.log("No jobs in recieve")
                this.props.get_all_jobs();
            }
            
        }, );
        this.getFavouriteJobs();
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
           temp = this.props.studentJobs.map(i => {
            
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