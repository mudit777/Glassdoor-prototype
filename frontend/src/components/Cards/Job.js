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
            <div style = {{marginTop : "5%"}}>
                <Card title = 'All Jobs' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '50rem'}}>
                    <div style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'4rem',fontWeight:'bold'}}>Job Title:</div>
                        <div>apply link</div>
                    </div>
                </Card>
            </div>
        )
    }
}
export default Job;