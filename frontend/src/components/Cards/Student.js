import React, { Component } from 'react'
import Axios from 'axios';
import { BACKEND } from '../../Config';
import { Card, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';


export default class Student extends Component {
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
                        race: response.data.student_race,
                        gender: response.data.student_gender,
                        photo: response.data.student_profile_photo,
                        disability: response.data.student_disability,
                        veteran : response.data.student_veteran,
                        email : response.data.student_email,
                        totalreviews : response.data.student_total_reviews_count,
                        name_div:response.data.student_first_name,
                        button_div:<FontAwesomeIcon onClick={this.handleEdit} icon={faPen} size="2x" style={{marginLeft:30, paddingTop:5}}/>,
                    })
                }
            })
        }
        updateName=e=>{
              this.setState({
                    first_name:e.target.value
              })
        }
      handleEdit=e=>{
            this.setState({
                  name_div:<input defaultValue={this.state.first_name} onChange={this.updateName}></input>,
                  button_div:<Button style={{backgroundColor:"#00a422", height:40, width:88, color:"white",marginLeft:'1rem' }} onClick = {this.update} >Update</Button>
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
            this.setState({
                  name_div:this.state.first_name,
                  button_div:<FontAwesomeIcon onClick={this.handleEdit} icon={faPen} size="2x" style={{marginLeft:30, paddingTop:5}}/>,
            })
      }
      render() {
            return (
                  <div style={{margin:'2rem 1rem'}}>
                        <Card title = 'Profile' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '52rem',marginLeft:'5rem'}} actions = {[
                        ]}>
                              <div style={{display:'flex',margin:'0.5rem 1rem'}}>
                                    <div style={{marginRight:'4rem',fontWeight:'bold',fontSize:'1.5rem',color:'#0049B9'}}>Name:</div>
                                    <div style={{fontSize:'1.5rem'}}>{this.state.name_div}</div>
                                    {this.state.button_div}
                              </div>

                              <div  style={{display:'flex',margin:'0.5rem 1rem'}}>
                                    <div style={{marginRight:'1.2rem',fontWeight:'bold',fontSize:'1.5rem',color:'#0049B9'}}>Total reviews:</div>
                                    <div style={{fontSize:'1.5rem'}}> {this.props.totalreviews} </div>
                              </div>
                        </Card>
                  </div>
            )
      }
}
