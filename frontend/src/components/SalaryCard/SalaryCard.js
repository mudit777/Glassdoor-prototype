import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import {Card} from 'antd'

class SalaryCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            reply: ""
        }
    }
    
    render() {
        return (
            <div style={{backgroundColor:'#f2f2f2',padding:'1rem 0'}}>
                    <Card style={{width:'73rem',margin:'1rem 14.9rem'}}>
                        <div >
                            <div className="column-left-intervies">
                                <p style={{marginTop: 0}}>
                                    <span style={{fontWeight:"bold",marginTop:-8,margin:'1rem 1rem'}}>Job title:</span>
                                    <span style={{marginTop:-8}}> {this.props.salary.JobTitle} </span>
                                </p>
                            </div>
                            <div className="column-right-intervies">
                                <span style={{fontWeight:"bold",marginTop:-8,margin:'1rem 1rem'}}>Base salary:</span>
                                <span style={{marginTop:-8}}> {this.props.salary.BaseSalary} </span>
                            </div>
                            <div className="column-left-intervies"> 
                                <span style={{fontWeight:"bold",marginTop:-8,margin:'1rem 1rem'}}>Location:</span>
                                <span style={{marginTop:-8}}> {this.props.salary.Location} </span>
                            </div>
                            <div className="column-right-intervies">
                                <span style={{fontWeight:"bold",marginTop:-8,margin:'1rem 1rem'}}>Experience:</span>
                                <span style={{marginTop:-8}}> {this.props.salary.Experience} </span>
                            </div>
                            <div className="column-right-intervies">
                                <span style={{fontWeight:"bold",marginTop:-8,margin:'1rem 1rem'}}>Employment type:</span>
                                <span style={{marginTop:-8}}> {this.props.salary.EmployementType} </span>
                            </div>
                            <div className="column-right-intervies">
                                <span style={{fontWeight:"bold",marginTop:-8,margin:'1rem 1rem'}}>Employment status:</span>
                                <span style={{marginTop:-8}}> {this.props.salary.EmployementStatus} </span>
                            </div>
                            <div className="column-right-intervies">
                                <span style={{fontWeight:"bold",marginTop:-8,margin:'1rem 1rem'}}>Gender:</span>
                                <span style={{marginTop:-8}}> {this.props.salary.Gender} </span>
                            </div>
                        </div>
                    </Card>
            </div>
        )
    }
}

export default SalaryCard;