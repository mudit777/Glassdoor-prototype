import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'

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
            <div>
                <div>
                    <Card title = "" style={{width:676}}>
                        <div className="column-left-intervies">
                            <p style={{fontWeight:"bold", marginTop: 0}}>Job Title:</p>
                            <p style={{marginTop:-8}}>{this.props.applications.job_title}</p>
                        </div>
                        <div className="column-right-intervies">
                            <p style={{fontWeight:"bold", marginTop: 0}}>Status</p>
                            <p style={{marginTop:-10}}>{this.props.applications.application_status}</p>
                        </div>
                        <div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default SalaryCard;