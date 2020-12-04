import React, { Component } from 'react'
import Axios from 'axios';
import { BACKEND } from '../../Config';
import { Card, Button,notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'

const options = [
                  { key: 1, text: 'Submitted', value: 1 },
                  { key: 3, text: 'Reviewed', value: 3 },
                  { key: 4, text: 'Initial Screening', value: 4},
                  { key: 5, text: 'Interviewing', value: 5},
                  { key: 6, text: 'Hired', value: 6}
              ]


export default class Applicant extends Component {
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
                  email : "",
                  name_div:'',
                  button_div:'',
            }
            this.getStudentDetails();
      }
      getStudentDetails = () => {
            console.log(this.props)
            var myJson = {
                student_id: this.props.student_id
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
                        race: response.data.student_race,
                        gender: response.data.student_gender,
                        photo: response.data.student_profile_photo,
                        disability: response.data.student_disability,
                        veteran : response.data.student_veteran,
                        email : response.data.student_email,
                        totalreviews : response.data.student_total_reviews_count,
                    })
                }
            })
        }
        
      
      update=e=>{
            console.log('clicked')
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
            var myJson = {
                  student : student,
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
                  }
              })
           
      }
      changeStatusHandler = (event, {values}) =>{
                    var a = document.getElementById("dropdown")
                    console.log(a)
                    console.log("DATA IS", event.target.textContent)
                    this.setState({
                        status: event.target.textContent
                    })
                    
                }
      updateStatus=e=>{
            // console.log(this.props.application_id)
            // console.log('clicked')
            var myJson = {
                  application_id : this.props.application_id,
                  application_status : this.state.status
              }
            Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
            Axios.post(`${BACKEND}/updateStatus`, myJson).then(response => {
                  if(response.status === 200)
                  {
                      notification["success"]({
                          message: 'Profile Details Updated',
                          description:
                              'User successfully signed in',
                      });
                  }
              })
      }
      render() {
            var resume=this.props.resume;
            console.log(resume);
            var coverletter=this.props.coverletter
            return (
                  <div style={{margin:'2rem 1rem'}}>
                        <Card  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '25rem',marginLeft:'5rem'}} actions = {[
                        ]}>
                              <div style={{display:'flex',margin:'0.5rem 1rem'}}>
                                    <div style={{marginRight:'4rem',fontWeight:'bold',fontSize:'1.5rem',color:'#0049B9'}}>Name:</div>
                                    <div style={{fontSize:'1.5rem'}}>{this.state.first_name}</div>
                              </div>
                              <div style={{display:'flex',margin:'0.5rem 1rem'}}>
                                    <Link to={'/viewResume/'+resume} target='_blank' style={{marginRight:'4rem',fontWeight:'bold',fontSize:'1rem'}}>View Resume</Link>
                              </div>
                              <div style={{display:'flex',margin:'0.5rem 1rem'}}>
                                    <Link to={'/viewCoverLetter/'+coverletter} target='_blank' style={{marginRight:'4rem',fontWeight:'bold',fontSize:'1rem'}}>View Cover Letter</Link>
                              </div>
                              <Dropdown onChange={this.changeStatusHandler} id = 'dropdown'  placeholder={this.props.status} options={options} fluid selection />
                              <Button onClick={this.updateStatus} style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder",margin:'1rem 0'}} >Update</Button>
                        </Card>
                  </div>
            )
      }
}
