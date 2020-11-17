import { Button, Card, Col, Pagination, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import CompanyCard from '../CompanyCard/CompanyCard';
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import './StudentProfile.css';
class StudentProfile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            comapnies : [],
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1
        }
        this.getAllCompanies();
    }
    getAllCompanies = () => {
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.get(`${BACKEND}/getAllCompanies`).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    comapnies : response.data
                })
            }
        })
    }
    render() {
        var email = ""
        var name = ""
        var photo = "https://www.pinclipart.com/picdir/big/351-3519728_png-file-svg-default-profile-picture-free-clipart.png"
        if(this.props.student)
        {
            email = this.props.student.student_email;
            name = this.props.student.student_first_name + " " + this.props.student.student_last_name;
            if(this.props.student.student_profile_photo !== null)
            {
                console.log(this.props.student.student_profile_photo)
                photo = this.props.student.student_profile_photo
            }
                
        }
        var redirectVar = null;
        if(window.sessionStorage.getItem("isLoggedIn") !== 'true')
        {
            redirectVar = <Redirect to = "/login" />
        }
        
        var companyTemp = null;
        if(this.state.comapnies.length > 0)
        {
            companyTemp = <ul style = {{listStyleType : "none"}}>
                <li>
                    <Row style = {{width : "200%"}}>
                        <Col>
                            <CompanyCard company = {this.state.comapnies[0]} />
                        </Col>
                        <Col style = {{marginLeft : "1%"}}>
                            <CompanyCard company = {this.state.comapnies[1]} />
                        </Col>
                    </Row>
                </li>
                <li>
                    <Row style = {{width : "200%"}}>
                        <Col>
                            <CompanyCard company = {this.state.comapnies[2]} />
                        </Col>
                        <Col style = {{marginLeft : "1%"}}>
                            <CompanyCard company = {this.state.comapnies[3]} />
                        </Col>
                    </Row>
                </li>
                <li className = "seeAllCompanies">
                    <h3 style = {{fontWeight : "bolder"}}><Link to ="/">See All Companies ></Link></h3>
                </li>
            </ul>
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <CompanyHeaderBar />
                </div>
                <div>
                    <Row style = {{marginLeft : "5%", marginTop : "3%"}}>
                        <Col>
                            <Card title = {name} style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : "150%"}} actions = {[
                                <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}}>Update Profile</Button>
                            ]}>
                                <div>
                                    <Avatar size = {50} src = {photo} />
                                </div>
                                <br />
                                <div>
                                    <h4 style = {{fontWeight : "bolder"}}>{email}</h4>
                                </div>
                                <br />
                                <div style = {{borderTop : "1px solid lightgrey"}}>
                                    <br />
                                    <h3 style = {{fontWeight : "bolder"}}>Lets get you your desired job</h3>
                                    <h4 style = {{fontWeight : "bolder"}}>Job titles looking for</h4>
                                    <h4 style = {{fontWeight : "bolder"}}>Type of search</h4>
                                    <h4 style = {{fontWeight : "bolder"}}>Open to relocation</h4>
                                </div>
                                <br />
                                <div style = {{borderTop : "1px solid lightgrey"}}>
                                    <br />
                                    <Row>
                                        <Col>
                                            <h4 style = {{fontWeight : "bolder"}}><Link to = "">Primary resume</Link></h4>
                                        </Col>
                                        <Col style = {{marginLeft : "37%"}}>
                                            <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}}>Upload a resume</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                        <Col style = {{marginLeft : "20%"}}>
                            <h1 style = {{fontWeight : "bolder"}}>Exlpore the Right companies for you</h1>
                            {companyTemp}
                        </Col>
                    </Row>
                </div>
                <div style = {{marginLeft : "75%", marginTop : "3%"}}>
                </div>
            </div>
        )
    }
}
// export default StudentProfile;
function mapDispatchToProps(dispatch) {
    return {
      login: user => dispatch(login(user))
    };
  }
  
function mapStateToProps(store) {
return {
    student : store.student
};
}

const StudentProfileForm = connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
export default StudentProfileForm;