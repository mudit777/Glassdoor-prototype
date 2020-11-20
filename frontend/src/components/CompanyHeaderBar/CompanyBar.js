import React, { Component } from 'react'
import { ButtonGroup, Input, Label } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBuilding, faCommentDots, faDotCircle, faEnvelopeSquare, faMoneyBillWave, faShoppingCart, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import 'semantic-ui-css/semantic.min.css';

class CompanyBar extends Component {
    render() {
        return (
            <div>
                  <img style={{backgroundColor:'red',height:'15rem',width:'100%'}}></img>
                  
                  <div  style={{fontSize:'2rem',fontWeight:'bold'}}>Company Name</div>
                  
                  <div style={{display:'flex',margin:'.5rem 1rem',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                        
                        <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                              <FontAwesomeIcon icon={faDotCircle} size="2x"/>
                              <div style={{fontWeight:'bold',color:'#5185CE'}}>Overview</div>
                        </div>
                        <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>
                        <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                              <div>1.4k</div>
                              <div style={{fontWeight:'bold',color:'#5185CE'}}>Reviews</div>
                        </div>
                        <div style={{ borderLeft: '.1rem solid #777678', height: '4rem', top: '0'}} ></div>

                        <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                              <div>5.6k</div>
                              <div style={{fontWeight:'bold',color:'#5185CE'}}>Jobs</div>
                        </div>
                        <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                        <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                              <div>2.1k</div>
                              <div style={{fontWeight:'bold',color:'#5185CE'}}>Salaries</div>
                        </div>
                        <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                        <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                              <div>591</div>
                              <div style={{fontWeight:'bold',color:'#5185CE'}}>Interviews</div>
                        </div>
                        <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                        <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                              <div>520</div>
                              <div style={{fontWeight:'bold',color:'#5185CE'}}>Benfits</div>
                        </div>
                        <div style={{ borderLeft: '.1rem solid grey', height: '4rem', top: '0'}} ></div>

                        <div style={{display:'flex',margin:'.5rem 1rem',flexDirection:'column',alignItems:'center',justifyContent:'normal',alignContent:'center'}}>
                              <div>50</div>
                              <div style={{fontWeight:'bold',color:'#5185CE'}}>Photos</div>
                        </div>
                  </div>
            </div>
        )
    }
}

export default CompanyBar