import { Button, Card, Col, notification, Rate, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Axios from 'axios';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';

class StudentJobDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            company : {},
            resumeModel: false,
            coverModel: false,
            resumes: [],
            coverLetters: [],
            resume: "",
            coverLetter: ""
        }
        this.getStudentFiles();
    }
    // componentDidMount(){
    //     this.getCompanyDetails();
    // }
    UNSAFE_componentWillReceiveProps(){
        setTimeout(() => {
            if(this.props.job.job_title)
            {
                this.getCompanyDetails();
                this.getStudentFiles();
            }
        })
    }
    getCompanyDetails = () => {
        var company = {
            company_id : this.props.job.company_id
        }
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    company : response.data
                })
            }
        })
    }
    resumeShow = () => {
        this.setState({
            resumeModel : true
        })
    }
    coverShow = () => {
        this.setState({
            coverModel : true
        })
    }
    triggerResume = () => {
        document.getElementById("resumeUpload").click();
    }
    triggerCover = () => {
        document.getElementById("coverLetterUpload").click();
    }
    uploadResume = (e) => {
        var formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('student_id', window.sessionStorage.getItem("student_id"));
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.post(`${BACKEND}/uplaodResume`, formData).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    resumes : response.data.resumes
                })
            }
        })
    }
    uploadCoverLetter = (e) => {
        var formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('student_id', window.sessionStorage.getItem("student_id"));
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.post(`${BACKEND}/uploadCoverLetters`, formData).then(response => {
            if(response.status === 200)
            {
                this.setState({
                    coverLetters : response.data.coverLetters
                })
            }
        })
    }
    getStudentFiles = () => {
        var student = {
            student_id : window.sessionStorage.getItem("student_id")
        }
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        Axios.post(`${BACKEND}/getStudentFiles`, student).then(response => {
            if(response.status === 200)
            {
                if(response.data !== null)
                {
                    if(response.data.primary_resume)
                    {
                        this.setState({
                            resumes: response.data.resumes,
                            coverLetters: response.data.cover_letters,
                            resume : response.data.primary_resume
                       })
                    }
                    else
                    {
                        this.setState({
                            resumes: response.data.resumes,
                            coverLetters: response.data.cover_letters
                       })
                    }
                   
                }
            }
        })
    }
    selectResume = (resume) => {
        this.setState({
            resumeModel : false,
            resume : resume
        })
    }
    selectCoverLetter = (coverLetter) => {
        this.setState({
            coverModel : false,
            coverLetter : coverLetter
        })
    }
    applyToJob = () => {
        var isEmpty = false;
        if(this.state.resume === "" || this.state.coverLetter === "")
        {
            isEmpty = true;
            notification["error"]({
                message: 'Empty Fields',
                description:
                    'Please select both resume and cover letter',
            });
        }
        if(!isEmpty)
        {
            let resume = "";
            let coverLetter = "";
            this.state.resumes.map(i => {
                console.log("resume is -------------", this.state.resume[0].length)
                if(this.state.resume[0].length === 1)
                {
                    if(Object.keys(i)[0] === this.state.resume)
                    {
                        resume = Object.values(i)[0];
                    }
                    
                }
                else
                {
                    if(Object.keys(i)[0] === this.state.resume[0])
                    {
                        resume = Object.values(i)[0];
                    }
                }
                
            })
            this.state.coverLetters.map(i => {
                if(Object.keys(i)[0] === this.state.coverLetter[0])
                {
                    coverLetter = Object.values(i)[0];
                }
            })
            var application = {
                student_id : window.sessionStorage.getItem("student_id"),
                job_id : this.props.job.job_id,
                resume : resume,
                cover_letter : coverLetter,
                application_status: "Submitted"
            }
            console.log(application);
            Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
            Axios.post(`${BACKEND}/applyToJob`, application).then(response => {
                if(response.status === 200)
                {
                    console.log("Applied")
                    notification["success"]({
                        message: 'Applied',
                        description:
                            'Applied to job',
                        });
                }
                else if(response.status === 299)
                {
                    notification["error"]({
                        message: 'Already Apploed',
                        description:
                            'You have already applied to the job',
                    });
                }
            })
        }
    }
    render() {
        var temp = null;
        var resume = null;
        if(this.state.resume !== "")
        {
            resume = <p style = {{fontWeight : "bolder"}}>{this.state.resume}</p>
        }
        var coverLetter = null;
        if(this.state.coverLetter !== "")
        {
            coverLetter = <p style = {{fontWeight : "bolder"}}>{this.state.coverLetter}</p>
        }
        var description = [];
        if(this.props.job.job_title)
        {
            description = this.props.job.job_desc.split('. ')
            var qualifications = this.props.job.job_qual.split('. ');
            var responsibilities = this.props.job.job_res.split('. ');
            temp = <Card style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", marginTop : "3%", marginLeft : "4%", marginRight : "4%", width : "930px"}}>
            <Row style = {{borderBottom : "1px solid lightGrey"}}>
                <Col>
                    <ul style = {{listStyleType : "none"}}>
                        <li>
                            <h3>{this.props.job.job_company_name}</h3>
                        </li>
                        <li>
                            <h2 style = {{fontWeight : 'bolder'}}>{this.props.job.job_title}</h2>
                        </li>
                        <li>
                            <Rate defaultValue = {5} disabled />
                        </li>
                        <li>
                            <p style = {{color : 'grey'}}>{this.props.job.job_city}, {this.props.job.job_state}</p>
                        </li>
                        <li>
                            <p style = {{color : 'grey'}}>Estimated Salary:  ${this.props.job.job_expected_salary}</p>
                        </li>
                    </ul>
                </Col>
                <Col style = {{marginTop : "2%", marginLeft : "5%", width: "59%"}}>
                    <Row>
                        <Col>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <Button onClick = {this.resumeShow} style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} >Select Resume</Button>
                                </li>
                                <li>
                                    {resume}
                                </li>
                            </ul>
                            
                        </Col>
                        <Col style = {{marginLeft : "2%"}}>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <Button onClick = {this.coverShow} style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} >Select Cover Letter</Button>
                                </li>
                                <li>
                                    {coverLetter}
                                </li>
                            </ul>
                        </Col> 
                        <Col style = {{marginLeft : "10%"}}>
                            <Button onClick = {this.applyToJob} style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} >Apply</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div>
                <Row style = {{borderBottom : "1px solid lightGrey", paddingBottom : "3%"}}>
                    <Col>
                        <Card title = "Company Insights">
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <h5>Size: {this.state.company.company_size}</h5>
                                </li>
                                <li>
                                    <h5>
                                        Type: {this.state.company.company_type}
                                    </h5>
                                </li>
                                <li>
                                    <h5>
                                        Revenue: {this.state.company.company_revenue}
                                    </h5>
                                </li>
                                <li>
                                    <h5>
                                        HeadQuarter: {this.state.company.company_headquarter}
                                    </h5>
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    <Col>
                        <Col style = {{marginLeft : "3%"}}>
                            <Card title = "Job Insights">
                                <ul style = {{listStyleType: "none"}}>
                                    <li>
                                        <h5>Industry type: {this.props.job.job_industry}</h5>
                                    </li>
                                    <li>
                                        <h5>
                                            Address: {this.props.job.job_street_address}
                                        </h5>
                                    </li>
                                    <li>
                                        <h5>
                                            Roles: {this.props.job.job_roles}
                                        </h5>
                                    </li>
                                </ul>
                            </Card>
                        </Col>
                    </Col>
                </Row>
                <Card title = "Job Description" style = {{width : "880px", marginTop: "3%"}}>
                    <ul>
                        {description.map(i => {
                            return(
                                <li>
                                    {i}
                                </li>
                            )
                        })}
                    </ul>
                </Card>   
                <Card title = "Job Qualifications" style = {{width : "880px", marginTop: "3%"}}>
                    <ul>
                        {qualifications.map(i => {
                            return(
                                <li>
                                    {i}
                                </li>
                            )
                        })}
                    </ul>
                </Card>     
                <Card title = "Job Responsibilities" style = {{width : "880px", marginTop: "3%"}}>
                    <ul>
                        {responsibilities.map(i => {
                            return(
                                <li>
                                    {i}
                                </li>
                            )
                        })}
                    </ul>
                </Card>         
            </div>
        </Card>
        }
        var resumes = <h2>No Resumes Uploaded yet</h2>;
        if(this.state.resumes.length > 0)
        {
            resumes = 
                this.state.resumes.map(i => {
                    return(
                            <ul style = {{listStyleType : "none"}}>
                                <li style = {{marginBottom : "1px solid lightGrey"}}>
                                    <div >
                                        <Row>
                                            <Col>
                                                <h3>{Object.keys(i)}</h3>
                                            </Col>
                                            <Col style = {{position : "absolute", marginLeft : "65%"}}>
                                                <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} onClick = {() => this.selectResume(Object.keys(i))}>Select</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>
                            </ul>
                        )
                    
                })
        }
        var coverLetters = <h2>No Resumes Uploaded yet</h2>;
        if(this.state.coverLetters.length > 0)
        {
            coverLetters = 
                this.state.coverLetters.map(i => {
                    return(
                            <ul style = {{listStyleType : "none"}}>
                                <li style = {{marginBottom : "1px solid lightGrey"}}>
                                    <div >
                                        <Row>
                                            <Col>
                                                <h3>{Object.keys(i)}</h3>
                                            </Col>
                                            <Col style = {{position : "absolute", marginLeft : "65%"}}>
                                                <Button style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} onClick = {() => this.selectCoverLetter(Object.keys(i))}>Select</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>
                            </ul>
                        )
                    
                })
        }
        return (
            <div>
                {temp}
                <div>
                    <Modal
                        title="Select Resume"
                        visible={this.state.resumeModel}
                        footer = {[
                            <Button onClick = {this.triggerResume} style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} >Upload new Resume</Button>
                        ]}
                    >
                        {resumes}
                        <div style = {{float : "right"}}>
                            <input id = "resumeUpload" type = "file" accept = ".pdf" style = {{display : "none"}} onChange = {this.uploadResume}/>
                            
                        </div>
                    </Modal>
                    <Modal
                        title="Select Cover Letter"
                        visible={this.state.coverModel}
                        footer = {[
                            <Button onClick = {this.triggerCover} style = {{backgroundColor : "#0caa41", color : "white", fontWeight : "bolder"}} >Upload new coverLetter</Button>
                        ]}
                    >
                        {coverLetters}
                        <div style = {{float : "right"}}>
                            <input id = "coverLetterUpload" type = "file" accept = ".pdf" style = {{display : "none"}} onChange = {this.uploadCoverLetter}/>
                            
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default StudentJobDetails;