import React, { Component } from 'react'
import { get_all_jobs } from '../../js/actions';
import { connect } from 'react-redux';
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar';
import { Col, Row } from 'antd';
import JobCard from '../JobCard/JobCard';

class ViewJobs extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.get_all_jobs();
    }
    render() {
        var temp = null;
        if(this.props.studentJobs)
        {
           temp = this.props.studentJobs.map(i => {
               return(
                   <JobCard job = {i} key = {i.job_id} />
               )
           })
        }
        return (
            <div>
                <div>
                    <CompanyHeaderBarForm />
                </div>
                <div>
                    <Row>
                        <Col style = {{maxHeight : 600, overflowY : "scroll", width : "30%"}}>
                            {temp}
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