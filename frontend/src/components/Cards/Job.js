import { Card } from 'antd';
import React, { Component } from 'react';


class Job extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div style = {{margin:'2.5rem 3rem'}}>
                {/* <Card title = 'All Jobs' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '20rem'}}> */}
                    <div style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'2rem',fontWeight:'bold'}}> {this.props.job.job_title} </div>
                        <div>visit</div>
                    </div>
                {/* </Card> */}
            </div>
        )
    }
}
export default Job;