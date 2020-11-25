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
            updateProfile : false,
            industryType : "",
            positions : "",
            typeOfSearch : "",
            targetedSalary: "",
            openToRelocation: "",
            first_name : "" ,
            last_name : "",
            race: "",
            gender: "",
            photo: "",
            disability: "",
            veteran : "",
            email : ""
        }
        this.getAllCompanies();
        this.getStudentJobPreferences();
        this.getStudentDetails();
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
    getStudentDetails = () => {
        var myJson = {
            student_id: window.sessionStorage.getItem("student_id")
        }
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.post(`${BACKEND}/getStudentDetails`, myJson).then(response => {
            if(response.status === 200)
            {
                var race = response.data.student_race
                if(response.data.student_race === null)
                {
                    race = ""
                }
                var photo = response.data.student_profile_photo
                if(response.data.student_profile_photo === null)
                {
                    photo = "https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif"
                }
                var gender = "Male";
                var disability = "I have disabilty";
                var veteran = "I am a veteran";
                if(response.data.student_gender === 0)
                {
                    gender = "Female"
                }
                if(response.data.student_disability === 0)
                {
                    disability = "I dont have disability"
                }
                if(response.data.student_veteran === 0)
                {
                    veteran = "I am not a veteran"
                }
                this.setState({
                    first_name : response.data.student_first_name,
                    last_name : response.data.student_last_name,
                    race: race,
                    gender: gender,
                    photo: photo,
                    disability: disability,
                    veteran : veteran,
                    email : response.data.student_email
                })
            }
        })
    }
    getStudentJobPreferences = () => {
        var myJson = {
            student_id: window.sessionStorage.getItem("student_id")
        }
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.post(`${BACKEND}/getStudentJobPreferences`, myJson).then(response => {
            if(response.status === 204)
            {

            }
            else if(response.status === 200)
            {
                console.log(response.data)
                var titles = ""
                response.data.job_titles.map(i => {
                    titles += i;
                })
                this.setState({
                    industryType : response.data.preferred_industries,
                    positions : titles,
                    typeOfSearch : response.data.job_search_status,
                    targetedSalary: response.data.target_salary,
                    openToRelocation: response.data.open_to_relocation.toString(),
                })
            }
        })
    }
    redirectToUpdateProfile = () => {
        this.setState({
            updateProfile : true
        })
    }
    render() {
        var email = ""
        var name =  this.state.first_name +" " + this.state.last_name;
        var redirectVar = null;
        if(window.sessionStorage.getItem("isLoggedIn") !== 'true')
        {
            redirectVar = <Redirect to = "/login" />
        }
        if(this.state.updateProfile)
        {
            redirectVar = <Redirect to = "/updateStudentProfile" />
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
                    <h3 style = {{fontWeight : "bolder"}}><Link to ="/allCompanies">See All Companies ></Link></h3>
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
                                <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} onClick = {this.redirectToUpdateProfile} >Update Profile</Button>
                            ]}>
                                <div>
                                    <Avatar size = {50} src = {this.state.photo} />
                                </div>
                                <br />
                                <div>
                                    <h4 style = {{fontWeight : "bolder"}}>{this.state.email}</h4>
                                </div>
                                <br />
                                <div style = {{borderTop : "1px solid lightgrey"}}>
                                    <br />
                                    <h3 style = {{fontWeight : "bolder"}}>Lets get you your desired job</h3>
                                    <Row>
                                        <Col>
                                            <h4 style = {{fontWeight : "bolder"}}>Interested Industry: {this.state.industryType}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4 style = {{fontWeight : "bolder"}}>Job titles looking for: {this.state.positions}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4 style = {{fontWeight : "bolder"}}>Type of search: {this.state.typeOfSearch}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4 style = {{fontWeight : "bolder"}}>Open to relocation: {this.state.openToRelocation}</h4>
                                        </Col>
                                    </Row>                                    
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