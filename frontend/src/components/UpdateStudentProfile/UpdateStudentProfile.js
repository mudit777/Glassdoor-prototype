import { Button, Card, Col, Input, notification, Row, Select } from 'antd';
import React, { Component } from 'react';
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import './UpdateStudentProfile.css';
import { connect } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import { BACKEND } from '../../Config';
import { Redirect } from 'react-router-dom';

class UpdateStudentProfile extends Component {
    constructor(props)
    {
        super(props);
        this.getStudentDetails();
            this.state = {
                first_name : "" ,
                last_name : "",
                race: "",
                gender: "",
                photo: "",
                disability: "",
                veteran : "",
                industryType : "",
                positions : "",
                typeOfSearch : "",
                targetedSalary: "",
                openToRelocation: "",
                industries: [], 
                profileUpdated : false
            }
        this.getAllIndustries();
        this.getStudentJobPreferences();
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
    getAllIndustries = () => {
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.get(`${BACKEND}/getAllIndustries`).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    industries : response.data
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
                    veteran : veteran
                })
            }
        })
    }
    handleCLick = () => {
        document.getElementById("imageUpload").click();
    }
    updateFirstName = (e) => {
        this.setState({
            first_name : e.target.value
        })
    }
    updateLastName = (e) => {
        this.setState({
            last_name : e.target.value
        })
    }
    updateGender = (e) => {
        this.setState({
            gender : e
        })
    }
    updateRace = (e) => {
        this.setState({
            race : e
        })
    }
    updateDisablity = (e) => {
        this.setState({
            disability : e
        })
    }
    updateVeteran = (e) => {
        this.setState({
            veteran : e
        })
    }
    updateStudentProfile = () => {
        var student = {
            student_id : window.sessionStorage.getItem("student_id"),
            student_first_name : this.state.first_name,
            student_last_name  : this.state.last_name,
            student_race : this.state.race,
            student_gender : this.state.gender,
            student_veteran : this.state.veteran,
            student_disability : this.state.disability,
            student_profile_photo : this.state.photo
        }
        var titles = this.state.positions.split(",");
        var jobPreference = {
            student_id : window.sessionStorage.getItem("student_id"),
            job_search_status : this.state.typeOfSearch,
            preferred_industries : this.state.industryType,
            job_titles : titles,
            target_salary : this.state.targetedSalary,
            open_to_relocation : this.state.openToRelocation
        }
        console.log(student);
        console.log(jobPreference);
        var myJson = {
            student : student,
            jobPreference : jobPreference
        }
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.post(`${BACKEND}/updateStudentDetails`, myJson).then(response => {
            if(response.status === 200)
            {
                notification["success"]({
                    message: 'Profile Details Updated',
                    description:
                        'User successfully signed in',
                });
                this.setState({
                    profileUpdated : true
                })
            }
        })
    }
    uploadImage = (e) => {
        var formData = new FormData();
        formData.append('image', e.target.files[0]);
        console.log("Form data _____________", formData);
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.post(`${BACKEND}/uploadImage`, formData).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    photo : response.data.image
                })
            }
        })
    }
    updateIndustryType = (e) => {
        this.setState({
            industryType : e
        })
    }
    updatePositions = (e) => {
        this.setState({
            positions : e.target.value
        })
    }
    updateSalary = (e) => {
        this.setState({
            targetedSalary : e.target.value
        })
    }
    updateTypeOfSearch = (value) => {
        this.setState({
            typeOfSearch : value
        })
    }
    updateRelocation = (value) => {
        this.setState({
            openToRelocation : value
        })
    }
    render() {
        console.log("The state is -----------", this.state)
        var industries = [];
        this.state.industries.map(industry => {
            var op = <Option value = {industry.toi_type}>{industry.toi_type}</Option>
            industries.push(op);
        })
        var redirectVar = null
        if(this.state.profileUpdated)
        {
            redirectVar = <Redirect to = "/studentProfile" />
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <CompanyHeaderBar />
                </div>
                <div>
                    <Row style = {{marginTop : "5%", marginLeft : "10%"}}> 
                        <Col>
                            <Card title = "Profile" style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} actions = {[
                                <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} onClick = {this.updateStudentProfile} >Update Profile</Button>
                            ]}>
                                <ul style = {{listStyleType : "none"}}>
                                    <li>
                                        <Avatar size = {100} src = {this.state.photo} onClick = {this.handleCLick} style = {{marginLeft : "34%" }}/>
                                        <Input type = "file" id = "imageUpload" accept = ".jpg, .jpeg, .png" style = {{display : "none"}} onChange = {this.uploadImage} />
                                    </li>
                                    <li>
                                        <Row>
                                            <Col>
                                                <label>First Name: </label>
                                                <Input type = "text" value = {this.state.first_name} onChange = {this.updateFirstName} />
                                            </Col>
                                            <Col style = {{marginLeft : "1%"}}>
                                                <label>Last Name: </label>
                                                <Input type = "text" value = {this.state.last_name} onChange = {this.updateLastName} />
                                            </Col>
                                        </Row>
                                        
                                    </li>
                                    <li style = {{marginTop : "3%"}}>
                                        <Row>
                                            <Col>
                                                <ul style = {{listStyleType : "none", marginLeft : "-16%"}}>
                                                    <li>
                                                        <label>Race: </label>
                                                    </li>
                                                    <li>
                                                        <Select value = {this.state.race} style={{ width: 255, marginLeft : "0%"}} onChange = {this.updateRace}>
                                                            <Option value="Asian">Asian</Option>
                                                            <Option value="African">African</Option>
                                                            <Option value="White">White</Option>
                                                            <Option value="Latino">Latino</Option>
                                                        </Select> 
                                                    </li>
                                                </ul>
                                            </Col>
                                            <Col>
                                                <ul style = {{listStyleType : "none", marginLeft : "-27%"}}>
                                                    <li>
                                                        <label>Gender: </label>
                                                    </li>
                                                    <li>
                                                        <Select value = {this.state.gender} style={{ width: 255, marginLeft : "0%" }} onChange = {this.updateGender}>
                                                            <Option value="1">Male</Option>
                                                            <Option value="0">Female</Option>
                                                        </Select> 
                                                    </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li style = {{marginTop : "3%"}}>
                                        <Row>
                                            <Col>
                                                <ul style = {{listStyleType : "none", marginLeft : "-16%"}}>
                                                    <li>
                                                        <label>Disablity: </label>
                                                    </li>
                                                    <li>
                                                        <Select value = {this.state.disability} style={{ width: 255, marginLeft : "0%" }} onChange = {this.updateDisablity}>
                                                            <Option value="1">I have disabilty</Option>
                                                            <Option value="0">I dont have disability</Option>
                                                        </Select> 
                                                    </li>
                                                </ul>
                                            </Col>
                                            <Col>
                                                <ul style = {{listStyleType : "none", marginLeft : "-27%"}}>
                                                    <li>
                                                        <label>Veteran: </label>
                                                    </li>
                                                    <li>
                                                        <Select  value = {this.state.veteran} style={{ width: 255, marginLeft : "0%" }} onChange = {this.updateVeteran}>
                                                            <Option value="1">I am a Veteran</Option>
                                                            <Option value="0">I am not a veteran</Option>
                                                        </Select> 
                                                    </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </li>
                                </ul>
                            </Card>
                        </Col>
                        <Col style = {{marginLeft : "5%"}}>
                            <Card title = "Job Preferences" style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                                <ul style = {{listStyleType : "none"}}>
                                    <li>
                                        <ul style = {{listStyleType : "none"}}>
                                            <li>
                                                <label>Preferred Industry: </label>
                                            </li>
                                            <li>
                                                <Select style = {{width: "100%", maxWidth : "100%"}} mode="multiple" allowClear value = {this.state.industryType} onChange = {this.updateIndustryType}>
                                                    {industries}
                                                </Select>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul style = {{listStyleType : "none"}}>
                                            <li>
                                                <label>Job titles: </label>
                                            </li>
                                            <li>
                                                <Input type = "text" value = {this.state.positions} onChange = {this.updatePositions}/>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul style = {{listStyleType : "none"}}>
                                            <li>
                                                <label>Job Search Status: </label>
                                            </li>
                                            <li>
                                                <Select style = {{width: "100%"}} value = {this.state.typeOfSearch} onChange = {this.updateTypeOfSearch}>
                                                    <Option value = "Not Looking">Not Looking</Option>
                                                    <Option value = "Casually Looking">Casually Looking</Option>
                                                    <Option value = "Actively Looking">Actively Looking</Option>
                                                </Select>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul style = {{listStyleType : "none"}}>
                                            <li>
                                                <label>Target Salary: </label>
                                            </li>
                                            <li>
                                                <Input type = "number" value = {this.state.targetedSalary} onChange = {this.updateSalary}/>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul style = {{listStyleType : "none"}}>
                                            <li>
                                                <label>Open to relocation: </label>
                                            </li>
                                            <li>
                                                <Select style = {{width: "100%"}} value = {this.state.openToRelocation} onChange = {this.updateRelocation}>
                                                    <Option value = "true">true</Option>
                                                    <Option value = "false">false</Option>
                                                </Select>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </Card>
                        </Col>
                    </Row>
                    
                </div>
            </div>
        )
    }
}
// export default UpdateStudentProfile;
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

const updateStudentProfileForm = connect(mapStateToProps, mapDispatchToProps)(UpdateStudentProfile);
export default updateStudentProfileForm;
