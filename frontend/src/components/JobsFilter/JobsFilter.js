import { Checkbox, Col, Row, Select } from 'antd';
import React, { Component } from 'react'
import axios from 'axios';
import { BACKEND } from '../../Config';
import { sortMostRecent, sortLeastRecent, filterSalary, filterJobType } from '../../js/actions';
import { connect } from 'react-redux';

class JobsFilter extends Component {
    constructor(props)
    {
        super(props)
        {
            this.state = {
                mostRecentDate : false,
                leastRecentDate : false,
                salary : "",
                jobType : ""
            }
        }
    }
    mostRecent = () => {
        this.setState({
            mostRecentDate : true,
            leastRecentDate : false
        })
        this.props.sortMostRecent(this.props.studentJobs);
    }
    leastRecent = () => {
        this.setState({
            mostRecentDate : false,
            leastRecentDate : true
        })
        this.props.sortLeastRecent(this.props.studentJobs);
    }
    updateSalary = (e) => {
        this.setState({
            salary : e
        })
        var filter = {
            salary : e
        }
        console.log("filter ")
        this.props.filterSalary(filter);
    }
    updateType = (e) => {
        var filter = {
            job_type : e
        }
        this.setState({
            jobType : e
        })
        this.props.filterJobType(filter);
    }
    render() {
        return (
            <div>
                <div style = {{width : "100%", borderBottom : "1px solid lightgrey", paddingBottom : "1%", paddingTop : "2%"}}>
                    <Row>
                        <Col style = {{marginLeft : "6%"}}>
                            <ul style = {{listStyleType:"none"}}>
                                <li>
                                    <Checkbox checked = {this.state.mostRecentDate} onClick = {this.mostRecent}>Most recently Posted</Checkbox>
                                </li>
                                <li>
                                    <Checkbox  checked = {this.state.leastRecentDate} onClick = {this.leastRecent}>Least recently Posted</Checkbox>
                                </li>
                            </ul>
                        </Col>
                        <Col style = {{marginLeft : "6%", marginTop : "-5px"}}>
                            <label>Salary Range</label>
                            <Select value = {this.state.salary} style = {{width : "180px"}} onChange = {this.updateSalary}>
                                <Option value = '0-50000'>$ 0 - 50000</Option>
                                <Option value = '50000-100000'>$ 50000 - 100000</Option>
                                <Option value = '100000-150000'>$ 100000 - 150000</Option>
                                <Option value = '150000-200000'>$ 150000 - 200000</Option>
                                <Option value = '200000-'>$ 200000 - </Option>
                            </Select>
                        </Col>
                        <Col style = {{marginLeft : "12%", marginTop : "-5px"}}>
                            <label>
                                Job Type: 
                            </label>
                            <Select value = {this.state.jobType} style = {{width : "180px"}} onChange = {this.updateType}>
                                <Select.Option value = "In-Person">In-Person</Select.Option>
                                <Select.Option value = "Remote">Remote</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
// export default JobsFilter;
function mapDispatchToProps(dispatch) {
    return {
        sortMostRecent: user => dispatch(sortMostRecent(user)),
        sortLeastRecent: user => dispatch(sortLeastRecent(user)),
        filterSalary : user => dispatch(filterSalary(user)),
        filterJobType: user => dispatch(filterJobType(user))
    };
  }
  
function mapStateToProps(store) {
    return {
        message : store.message,
        studentJobs : store.studentJobs
    };
}

const JobsFilterForm = connect(mapStateToProps, mapDispatchToProps)(JobsFilter);
export default JobsFilterForm;