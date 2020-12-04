import React, { Component } from 'react'
import { ButtonGroup, Input, Label } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBuilding, faCommentDots, faDotCircle, faEnvelopeSquare, faMoneyBillWave, faShoppingCart, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import 'semantic-ui-css/semantic.min.css';
import Axios from 'axios';
import { BACKEND } from '../../Config';
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom'

>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740

class CompanyBar extends Component {
      constructor(props)
      { 
            super(props);
            console.log(props);
            this.state = {
<<<<<<< HEAD
                  photo : props.photo
            }
            // "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"
      }
=======
                  company:{},
                  interviews:[],
                  photo:null,
            }
            // "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"
      }
      componentDidMount(){
            console.log('XXXXXXXXXXXX',this.props.company_id)
            var company = {
                  company_id : this.props.company_id
              }
              Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
              Axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
                  if(response.status === 200)
                  {
                      console.log(response.data)
                      this.setState({
                          company : response.data,
                              photo: response.data.company_profile_photo
                      })
                  }
              })
              Axios.post(`${BACKEND}/getCompanyInterview`, company).then(response => {
                  if(response.status === 200)
                  {
                      console.log(response.data)
                      this.setState({
                          interviews : response.data,
                      })
                  }
              })
      }
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
      uploadImage = (e) => {
            var formData = new FormData();
            formData.append('image', e.target.files[0]);
            Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
            Axios.post(`${BACKEND}/uploadImage`, formData).then(response => {
                  if(response.status === 200)
                  {
                        this.setState({
                              photo : response.data.image
                        })
                        var company = {
                              company_id : sessionStorage.getItem("company_id"),
                              company_profile_photo : this.state.photo
                        }
                        Axios.post(`${BACKEND}/updateCompanyDetails`, company).then(response => {
                              console.log(response,'-------GOT')
                        })
                  }
            })
      }
      triggerUpload = () =>{
            document.getElementById("image").click()
      }
      render() {
<<<<<<< HEAD
            return (
                  <div style={{backgroundColor:'#EAEAEA',margin:'-1rem 0'}}>
                  <div style={{display:'flex',flexDirection:'column',justifyContent:'center',margin:'1rem 15rem',backgroundColor:'white'}}>
                        <input type = 'file' id = "image" style = {{display : "none"}} onChange = {this.uploadImage}/>
                        <img src = {this.props.photo} style={{height:'15rem'}} onClick = {this.triggerUpload}></img>
                        
                        <div  style={{fontSize:'2rem',fontWeight:'bold',marginLeft:'1rem',background:'none',fontWeight:'bold',colo:'black'}}>Amazon</div>
=======
            var input=null;
            var t = null;
            var r = null;
            var p = null;
            if(this.props.student !== 'true')
            {
                  input=<div style={{backgroundColor:'#f2f2f2'}}><img src = {this.state.photo} style={{height:'7rem',width:'7rem',position:'relative',top:'15rem',borderRadius:'5%',border:'1px solid black'}} onClick = {this.triggerUpload}></img><img src = "https://media.glassdoor.com/banner/bh/6036/amazon-banner-1578695809222.jpg" style={{height:'15rem',width:'100%'}} ></img>
                  <input type = 'file' id = "image" style = {{display : "none"}} onChange = {this.uploadImage}/></div>
                  t='company'
                  p=<Link to={{pathname:'/addPhotosC',state:{company_id:this.props.company.company_id,company_name:this.props.company.company_name}}} style={{fontWeight:'bold',color:'#5185CE'}}>Photos</Link>

                  r=<Link to={{pathname:'/companyReviews',state:{company_id:this.props.company.company_id}}} style={{fontWeight:'bold',color:'#5185CE'}}>Reviews</Link>
                  // r='hello'
            }
            else
            {
                  t='student'
                  p=<Link to={{pathname:'/addPhotosU',state:{company_id:this.props.company.company_id,company_name:this.props.company.company_name}}} style={{fontWeight:'bold',color:'#5185CE'}}>Photos</Link>

                  input=<div style={{backgroundColor:'#f2f2f2'}}><img src = {this.state.photo} style={{height:'7rem',width:'7rem',position:'relative',top:'15rem',borderRadius:'5%',border:'1px solid black'}}></img><img src = "https://media.glassdoor.com/banner/bh/6036/amazon-banner-1578695809222.jpg" style={{height:'15rem',width:'100%'}}></img>
                  </div>
                  r=<Link to={{pathname:'/studentReviews',state:{company_id:this.props.company.company_id}}} style={{fontWeight:'bold',color:'#5185CE'}}>Reviews</Link> 

            }
            return (
                  <div style={{backgroundColor:'#f2f2f2',margin:'-1rem 0'}}>
                  <div style={{display:'flex',flexDirection:'column',justifyContent:'center',margin:'1rem 15rem',backgroundColor:'white'}}>
                        
                        {input}
                        <div  style={{fontSize:'2rem',fontWeight:'bold',marginLeft:'1rem',background:'none',fontWeight:'bold',colo:'black'}}>{this.props.company.company_name}</div>
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
                        
                        <div style={{display:'flex',margin:'.5rem 1rem',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                              
                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <FontAwesomeIcon icon={faDotCircle} size="2x"/>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Overview</div>
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>
                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
<<<<<<< HEAD
                                    <div>10</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Reviews</div>
=======
                                    <div>{this.props.total_reviews}</div>
                                    <div>{r}</div>
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
                              </div>
                              <div style={{ borderLeft: '.1rem solid #777678', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
<<<<<<< HEAD
                                    <div>remaining</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Jobs</div>
=======
                                    <div>{this.props.total_jobs}</div>
                                    <Link to={{pathname:'/companyJobs',state:{company_id:this.props.company_id,type:t}}} style={{fontWeight:'bold',color:'#5185CE'}}>Jobs</Link>
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
<<<<<<< HEAD
                                    <div>remaining</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Salaries</div>
=======
                                    <div>{this.props.total_salary}</div>
                                    <Link to={{pathname:'/salary',state:{company_id:this.props.company_id,type:t}}} style={{fontWeight:'bold',color:'#5185CE'}}>Salaries</Link>
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
<<<<<<< HEAD
                                    <div>remaining</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Interviews</div>
=======
                                    <div>{this.state.interviews.length}</div>
                                    <Link to={{pathname:'/studentInterviews',state:{company_id:this.props.company.company_id,type:t}}} style={{fontWeight:'bold',color:'#5185CE'}}>Interviews</Link>
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <div>520</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Benfits</div>
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <div>view</div>
<<<<<<< HEAD
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Photos</div>
=======
                                    {p}
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
                              </div>
                        </div>
                  </div>
                  </div>
            )
      }
}

export default CompanyBar