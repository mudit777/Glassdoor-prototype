import React, { Component } from 'react';
import { Button, Card, Col, Input, notification, Row, Select,Radio } from 'antd';
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import { connect } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import { BACKEND } from '../../Config';
import { Redirect } from 'react-router-dom';
// import { Radio } from 'semantic-ui-react';

class AddSalary extends Component {
      BaseSalary = (e) => {
            this.setState({
                BaseSalary : e.target.value
            })
      }
      Bonus = e =>{
            this.setState({
                  Bonus : e.target.value
              })
      }
      JobTitle = e =>{
            this.setState({
                  JobTitle : e.target.value
              })
      }
      Location = e =>{
            this.setState({
                  Location : e.target.value
              })
      }
      Experience = e =>{
            this.setState({
                  Experience : e
              })
      }
      EmployementType = e =>{
            this.setState({
                  EmployementType : e
              })
      }
      EmployerName = e =>{
            this.setState({
                  EmployerName : e.target.value
              })
      }
      EmployementStatus = e =>{
            this.setState({
                  EmployementStatus : e.target.value
              })
      }
      Gender = e =>{
            this.setState({
                  Gender : e.target.value
              })
      }
      Submit = e =>{
            // console.log('clicked',this.state)
            var salary = {
                company_id : sessionStorage.getItem("company_id"),
                  BaseSalary : this.state.BaseSalary,
                  Bonus : this.state.Bonus,
                  JobTitle  : this.state.JobTitle,
                  Location : this.state.Location,
                  Experience : this.state.Experience,
                  EmployementType : this.state.EmployementType,
                  EmployerName : this.state.EmployerName,
                  EmployementStatus : this.state.EmployementStatus,
                  Gender : this.state.Gender
              }
            Axios.post(`${BACKEND}/addSalary`, salary).then(response => {
                  if(response.status === 200)
                  {
                      notification["success"]({
                          message: 'Salary added',
                          description:
                              'Sucessfully added',
                      });
                  }
              })
      }
      render() {
            return (
            <div>
                <div>
                    <CompanyHeaderBar />
                </div>
                <div>
                    <Row style = {{marginTop : "5%", marginLeft : "10%"}}> 
                        <Col>
                            <Card title = "Add a Salary" style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} actions = {[
                                <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} onClick = {this.Submit} >Add Salary</Button>
                            ]}>
                                <ul style = {{listStyleType : "none"}}>
                                    <li>
                                          <label style={{fontWeight:'bold'}}>Salary Details * </label>
                                          <br/>
                                          <br/>
                                    </li>
                                    <li >
                                        <Row>
                                            <Col>
                                                <ul style = {{listStyleType : "none", marginLeft : "-16%"}}>
                                                    <li>
                                                      <label>Base Salary: </label>
                                                    </li>
                                                    <li>
                                                      <Input style={{ width: 255, marginLeft : "0%"}} type = "text" placeholder='USD (per year)' onChange = {this.BaseSalary} />
                                                    </li>
                                                </ul>                                                
                                            </Col>
                                        </Row>
                                        
                                    </li>
                                    <li style = {{marginTop : "3%"}}>
                                        <Row>
                                            <Col>
                                                <ul style = {{listStyleType : "none", marginLeft : "-29%"}}>
                                                    <li>
                                                      <label>Do you get bonus? </label>
                                                    </li>
                                                    <li>
                                                    <Radio.Group onChange={this.Bonus}>
                                                      <Radio.Button value="Yes">Yes</Radio.Button>
                                                      <Radio.Button value="No">No</Radio.Button>
                                                    </Radio.Group>
                                                    </li>
                                                </ul>                                                
                                            </Col>
                                        </Row> 
                                    </li>
                                    <br/>
                                    <li style = {{marginTop : "3%"}}>
                                          <label style={{fontWeight:'bold'}}>Job Details* </label>
                                          <br/>
                                    </li>
                                    <li style = {{marginTop : "3%"}}>
                                        <Row>
                                            <Col>
                                                <ul style = {{listStyleType : "none", marginLeft : "-16%"}}>
                                                    <li>
                                                        <label>Title: </label>
                                                    </li>
                                                    <li>
                                                      <Input style={{ width: 255, marginLeft : "0%"}} type = "text" placeholder='Title' onChange = {this.JobTitle} />
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
                                                        <label>Location: </label>
                                                    </li>
                                                    <li>
                                                      <Input style={{ width: 255, marginLeft : "0%"}} type = "text" placeholder='Location' onChange = {this.Location} />
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
                                                        <label>Years of experience: </label>
                                                    </li>
                                                    <li>
                                                        <Select  style={{ width: 255, marginLeft : "0%" }} onChange = {this.Experience}>
                                                            <Option value="0">Less than a year</Option>
                                                            <Option value="1">1</Option>
                                                            <Option value="2">2</Option>
                                                            <Option value="3">3</Option>
                                                            <Option value="4">4</Option>
                                                            <Option value="5">More than 4</Option>
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
                                                        <label>Employement type: </label>
                                                    </li>
                                                    <li>
                                                        <Select style={{ width: 255, marginLeft : "0%" }} onChange = {this.EmployementType}>
                                                            <Option value="Fulltime">Fulltime</Option>
                                                            <Option value="Parttime">Parttime</Option>
                                                            <Option value="Temporary">Temporary</Option>
                                                            <Option value="Contract">Contract</Option>
                                                            <Option value="Intern">Intern</Option>
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
                                                        <label>Employer Name: </label>
                                                    </li>
                                                    <li>
                                                      <Input style={{ width: 255, marginLeft : "0%"}} type = "text" placeholder='Employer' onChange = {this.EmployerName} />
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
                                                      <label>Are you current or former employee? </label>
                                                    </li>
                                                    <li>
                                                    <Radio.Group onChange={this.EmployementStatus}>
                                                      <Radio.Button value="Current">Current</Radio.Button>
                                                      <Radio.Button value="Former">Former</Radio.Button>
                                                    </Radio.Group>
                                                    </li>
                                                </ul>                                                
                                            </Col>
                                        </Row>
                                    </li>
                                    <li style = {{marginTop : "3%"}}>
                                        <Row>
                                            <Col>
                                                <ul style = {{listStyleType : "none", marginLeft : "-11%"}}>
                                                    <li>
                                                      <label>Optional: Specify your gender to contribute anonymously to</label>
                                                      <br/>
                                                      <label> Glassdoor research into fair wages.</label>
                                                    </li>
                                                    <li>
                                                    <Radio.Group onChange={this.Gender}>
                                                      <Radio.Button value="Male">Male</Radio.Button>
                                                      <Radio.Button value="Female">Female</Radio.Button>
                                                    </Radio.Group>
                                                    </li>
                                                </ul>                                                
                                            </Col>
                                        </Row>  
                                    </li>
                                </ul>
                            </Card>
                        </Col>
                        <Col style = {{marginLeft : "5%"}}>
                            <Card title = "How can this really be anonymous?" style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)",maxWidth:'40rem'}}>
                              <div>
                                    We will never display any personal information with your salary. The only personal information we require is your email (i.e., no name, no address, etc.) and we only do that to make sure you're a real person.
                              </div>
                              <br/>
                              <div>
                                    Plus there's more to protect your anonymity:
                              </div>
                              <br/>
                              <ul>
                                    <li>
                                    If you work at a small company or are the only person with your job title, you're not required to tell us your employer. Simply select "I prefer not to specify my employer" and your salary will not be displayed on the site.
                                    </li>
                                    <br/>
                                    <li>
                                    If you are among the first to post a salary for your job title and company, we will automatically add and/or subtract a small amount from the salary you post. This "anonymous salary range" offers a bit more anonymity while minimizing the difference from the actual salary.
                                    </li>
                              </ul>
                              <br/>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            );
      }
}

export default AddSalary;