import React, { Component } from 'react'
import { ButtonGroup, Input } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBuilding, faCommentDots, faEnvelopeSquare, faMoneyBillWave, faShoppingCart, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import 'semantic-ui-css/semantic.min.css';

class CompanyHeaderBar extends Component {
    render() {
        return (
            <div>
                <div style={{height:72, borderBottomWidth:1, borderBottomStyle:"solid", borderColor:"#cfcfcf"}}>
                    <div style={{marginLeft:100, paddingTop:10}}>
                        <div>
                            <Input icon='search' iconPosition='left' placeholder="Job Title, Keywords, or Company" style={{width:350, color:"#00a422"}}/>
                            <Input>
                                <Dropdown placeholder='Jobs' style={{marginLeft:20, width: 100}} search selection>
                                    <Dropdown.Menu>
                                        <Dropdown.Item text='Companies'/>
                                        <Dropdown.Item text='Salaries'/>
                                        <Dropdown.Item text='Interviews'/>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Input>
                            <Input onChange={this.searchLocChangeHandler} type="text" icon="" placeholder='Location' style={{width:350,marginLeft:16}}/>
                            <Button style={{backgroundColor:"#00a422", height:40, width:88, color:"white" }}>Search</Button>
                            <FontAwesomeIcon onClick={this.handleCart} icon={faEnvelopeSquare} size="2x" style={{marginLeft:30, paddingTop:5}}/>
                            <FontAwesomeIcon onClick={this.handleCart} icon={faUser} size="2x" style={{marginLeft:30, paddingTop:5}}/>
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
                                    <Dropdown text='Jobs' style={{ paddingTop:10, marginBottom:10}} icon="angle down">
                                        <Dropdown.Menu>
                                            <Dropdown.Item text='Recent Activities' />
                                            <Dropdown.Item text='Career Insights'/>
                                            <Dropdown.Item text='Job Alerts'/>
                                            <Dropdown.Item text='Saved'/>
                                            <Dropdown.Item text='Applications' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </span>
                                <span style={{marginLeft:50, color:"#00a422"}}><FontAwesomeIcon onClick = {this.handleRestProfile} size="2x" icon={faBuilding}/></span>
                                <span style={{fontSize:18, fontWeight:"bold", marginLeft:10}}>
                                    <Dropdown text='Companies' style={{ paddingTop:10, marginBottom:10}} icon="angle down">
                                        <Dropdown.Menu>
                                            <Dropdown.Item text='Discover Companies' />
                                            <Dropdown.Item text='Compare Companies'/>
                                            <Dropdown.Item text='Suggested Follows'/>
                                            <Dropdown.Item text='Write A Review'/>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </span>
                                <span style={{marginLeft:50, color:"#00a422"}}><FontAwesomeIcon onClick={this.handleCart} size="2x" icon={faMoneyBillWave}/></span>
                                <span style={{fontSize:18, fontWeight:"bold", marginLeft:10}}>
                                    <Dropdown text='Salaries' style={{ paddingTop:10, marginBottom:10}} icon="angle down">
                                        <Dropdown.Menu>
                                            <Dropdown.Item text='Discover Salaries' />
                                            <Dropdown.Item text='Salary Calculator'/>
                                            <Dropdown.Item text='Analyze Offer'/>
                                            <Dropdown.Item text='Add a Salary'/>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </span>
                                <span style={{marginLeft:50, color:"#00a422"}}><FontAwesomeIcon onClick={this.handleCart} size="2x" icon={faCommentDots}/></span>
                                <span style={{fontSize:18, fontWeight:"bold", marginLeft:10}}>
                                    <Dropdown text='Interviews' style={{ paddingTop:10, marginBottom:10}} icon="angle down">
                                        <Dropdown.Menu>
                                            <Dropdown.Item text='Discover Interviews' />
                                            <Dropdown.Item text='Add an Inteview'/>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </span>`
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default CompanyHeaderBar