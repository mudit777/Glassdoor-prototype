import React, { Component } from 'react'
import { ButtonGroup, Input, Label } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBuilding, faCommentDots, faDotCircle, faEnvelopeSquare, faMoneyBillWave, faShoppingCart, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import 'semantic-ui-css/semantic.min.css';
import Axios from 'axios';
import { BACKEND } from '../../Config';

class CompanyBar extends Component {
      constructor(props)
      { 
            super(props);
            console.log(props);
            this.state = {
                  photo : props.photo
            }
            // "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"
      }
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
            return (
                  <div style={{backgroundColor:'#EAEAEA',margin:'-1rem 0'}}>
                  <div style={{display:'flex',flexDirection:'column',justifyContent:'center',margin:'1rem 15rem',backgroundColor:'white'}}>
                        <input type = 'file' id = "image" style = {{display : "none"}} onChange = {this.uploadImage}/>
                        <img src = {this.props.photo} style={{height:'15rem'}} onClick = {this.triggerUpload}></img>
                        
                        <div  style={{fontSize:'2rem',fontWeight:'bold',marginLeft:'1rem',background:'none',fontWeight:'bold',colo:'black'}}>{this.props.company.company_name}</div>
                        
                        <div style={{display:'flex',margin:'.5rem 1rem',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                              
                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <FontAwesomeIcon icon={faDotCircle} size="2x"/>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Overview</div>
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>
                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <div>{this.props.company.company_total_reviews_count}</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Reviews</div>
                              </div>
                              <div style={{ borderLeft: '.1rem solid #777678', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <div>remaining</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Jobs</div>
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <div>remaining</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Salaries</div>
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <div>remaining</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Interviews</div>
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <div>520</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Benfits</div>
                              </div>
                              <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                              <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                                    <div>view</div>
                                    <div style={{fontWeight:'bold',color:'#5185CE'}}>Photos</div>
                              </div>
                        </div>
                  </div>
                  </div>
            )
      }
}

export default CompanyBar