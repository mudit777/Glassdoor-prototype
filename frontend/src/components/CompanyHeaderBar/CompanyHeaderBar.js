import React, { Component } from 'react'
import { ButtonGroup, Input } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBuilding, faChartBar, faCommentDots, faEnvelopeSquare, faMoneyBillWave, faNewspaper, faNotesMedical, faReceipt, faServer, faShoppingCart, faSignOutAlt, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import 'semantic-ui-css/semantic.min.css';
import { Redirect } from 'react-router-dom';
import { search_companies, search_jobs, search_interviews, search_salaries } from '../../js/actions';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { Link } from 'react-router-dom'

import Avatar from 'antd/lib/avatar/avatar';

class CompanyHeaderBar extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            searchType : "Companies",
            searchValue : "",
            location : "",
            companiesRedirect : false,
            jobsRedirect : false
        }
    }
    updateSearchType = (e) => {
        this.setState({
            searchType : e
        })
    }
    updateSearch = (e) => {
        this.setState({
            searchValue : e.target.value
        })
    }
    updateLocation = (e) => {
        this.setState({
            location : e.target.value
        })
    }
    handleLogout = (e) =>{
        sessionStorage.removeItem('student_id')
        window.location.replace('/login')
    }
    handleCompanyLogout = (e) =>{
        sessionStorage.removeItem('company_id')
        window.location.replace('/login')
    }
    handleActivity = (e) =>{
        window.location.replace('/studentActivity')
    }
    search = () => {
        var myJson = {
            searchValue  : this.state.searchValue,
        }
        if(this.state.searchType === "Companies")
        {
            this.props.search_companies(myJson);
        }
        else if(this.state.searchType === "Jobs")
        {
            myJson.location = this.state.location;
            this.props.search_jobs(myJson);
        }
        else if(this.state.searchType === "Interviews")
        {
            console.log("Hiiii searchin")
            this.props.search_interviews(myJson)
        }
        else if(this.state.searchType === "Salaries")
        {
            this.props.search_salaries(myJson);
        }
        
    }
    componentDidMount(){
        console.log(this.props.type)
    }
    render() {
        var redirectVar = null;
        if(this.props.message === "Companies searched")
        {
            redirectVar = <Redirect to = "/allCompanies"/>
        }
        else if(this.props.message === "Jobs searched")
        {
            redirectVar = <Redirect to = '/allJobs'/>
        }
        else if(this.props.message === "Interviews searched")
        {
            redirectVar = <Redirect to = "/searchedInterviews"/>
        }
        else if(this.props.message === "Salaries searched")
        {
            redirectVar = <Redirect to ="/searchedSalaries"/>
        }
        var b =null;
        if(this.props.type === 'student')
        {
            //student
            b=<div>
            {redirectVar}
            <div style={{height:72, borderBottomWidth:1, borderBottomStyle:"solid", borderColor:"#cfcfcf"}}>
                <div style={{marginLeft:30, paddingTop:10,display:'flex'}}>
                    <div style={{marginRight:'1rem'}}>
                        <img style={{width:'10rem',height:'2rem',marginTop:'.5rem'}} src = "https://gohire-website.s3.amazonaws.com/img/integration-logos/full/glassdoor-logo-full.png" alt = "home for employers"/>
                    </div>
                    <div>
                        <Input value = {this.state.searchValue} onChange = {this.updateSearch} icon='search' iconPosition='left' placeholder="Job Title, Keywords, or Company" style={{width:350, color:"#00a422"}}/>
                        <Input>
                            <Select style = {{width : 200, marginLeft : 15}} defaultValue = {this.state.searchType} value = {this.state.searchType} onChange = {this.updateSearchType}>
                                <Select.Option value = "Companies">Companies</Select.Option>
                                <Select.Option value = "Jobs">Jobs</Select.Option>
                                <Select.Option value = "Interviews">Interviews</Select.Option>
                                <Select.Option value = "Salaries">Salaries</Select.Option>
                            </Select>
                        </Input>
                        <Input onChange={this.updateLocation} value = {this.state.location} type="text" icon="" placeholder='Location' style={{width:350,marginLeft:16}}/>
                        <Button style={{backgroundColor:"#00a422", height:40, width:88, color:"white" }} onClick = {this.search} >Search</Button>
                        <FontAwesomeIcon onClick={this.handleActivity} icon={faUser} size="2x" style={{marginLeft:30, paddingTop:5}}/>
                        <Link to='/studentApplications' style={{color:'black'}}><FontAwesomeIcon icon={faServer} size="2x" style={{marginLeft:30, paddingTop:5}}/></Link>
                        <FontAwesomeIcon onClick={this.handleLogout} icon={faSignOutAlt} size="2x" style={{marginLeft:30, paddingTop:5}}/>
                    </div>
                </div>
            </div>
            <div style={{height:110, borderBottomWidth:1, borderBottomStyle:"solid", borderColor:"#cfcfcf"}}>
                <div style={{marginLeft:80}}>
                    <div style={{paddingTop:10}}>
                        <div>
                            <p style={{fontSize:22, fontWeight:"bold"}}>Hello, what would you like to explore today?</p>
                        </div>
                        <div style={{marginTop:15}}>
                        `    <span style={{ color:"#00a422"}}><FontAwesomeIcon onClick={this.handleCart} size="2x" icon={faSuitcase}/></span>
                            <span style={{fontSize:18, fontWeight:"bold", marginLeft:10}}>
                                <Link to='/allJobs' text='Jobs' style={{ paddingTop:10, marginBottom:10,color:'black'}} icon="angle down">
                                Jobs
                                </Link>
                            </span>
                            <span style={{marginLeft:50, color:"#00a422"}}><FontAwesomeIcon onClick = {this.handleRestProfile} size="2x" icon={faBuilding}/></span>
                            <span style={{fontSize:18, fontWeight:"bold", marginLeft:10}}>
                                <Link to='/allCompanies' text='Companies' style={{ paddingTop:10, marginBottom:10,color:'black'}} icon="angle down">
                                Companies
                                </Link>
                            </span>
                            <span style={{marginLeft:50, color:"#00a422"}}><FontAwesomeIcon onClick={this.handleCart} size="2x" icon={faMoneyBillWave}/></span>
                            <span style={{fontSize:18, fontWeight:"bold", marginLeft:10}}>
                                <Link to='/allSalary' text='Salaries' style={{ paddingTop:10, marginBottom:10,color:'black'}} icon="angle down">
                                Salaries 
                                </Link>
                            </span>
                            <span style={{marginLeft:50, color:"#00a422"}}><FontAwesomeIcon onClick={this.handleCart} size="2x" icon={faCommentDots}/></span>
                            <span style={{fontSize:18, fontWeight:"bold", marginLeft:10}}>
                                <Link to='/allInterviews' text='Interviews' style={{ paddingTop:10, marginBottom:10,color:'black'}} icon="angle down">
                                Interviews
                                </Link>
                            </span>
                            <span style={{marginLeft:50, color:"#00a422"}}><FontAwesomeIcon onClick={this.handleCart} size="2x" icon={faNewspaper}/></span>
                            <span style={{fontSize:18, fontWeight:"bold", marginLeft:10}}>
                                <Link to='/allReviews' text='Interviews' style={{ paddingTop:10, marginBottom:10,color:'black'}} icon="angle down">
                                Reviews
                                </Link>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        }
        else
        {
            //company
            b=<div style={{height:72, borderBottomWidth:1, borderBottomStyle:"solid", borderColor:"#cfcfcf"}}>
                <div style={{marginLeft:30, paddingTop:10,display:'flex',justifyContent:'space-between'}}>
                    <div>
                        <img style={{width:'20rem',height:'4rem'}} src = "https://gohire-website.s3.amazonaws.com/img/integration-logos/full/glassdoor-logo-full.png" alt = "home for employers"/>
                    </div>
                    <Link to='/companyProfile' style={{marginRight:30,color:'black'}}>
                        <FontAwesomeIcon onClick={this.handleCart} icon={faUser} size="2x" style={{marginLeft:30, paddingTop:5}}/>
                        <Link to='/report' style={{color:'black'}}><FontAwesomeIcon onClick={this.handleCart} icon={faChartBar} size="2x" style={{marginLeft:30, paddingTop:5}}/></Link>
                        <FontAwesomeIcon onClick={this.handleCompanyLogout} icon={faSignOutAlt} size="2x" style={{marginLeft:30, paddingTop:5}}/>
                    </Link>
                </div>
            </div>
        }
        return (
            <div>
                {b}
            </div>
        )
    }
}

// export default CompanyHeaderBar
function mapDispatchToProps(dispatch) {
    return {
        search_companies: user => dispatch(search_companies(user)),
        search_jobs: user => dispatch(search_jobs(user)),
        search_interviews: user => dispatch(search_interviews(user)),
        search_salaries: user => dispatch(search_salaries(user))
    };
  }
  
function mapStateToProps(store) {
    return {
        message : store.message,
        companies : store.companies
    };
}

const CompanyHeaderBarForm = connect(mapStateToProps, mapDispatchToProps)(CompanyHeaderBar);
export default CompanyHeaderBarForm;