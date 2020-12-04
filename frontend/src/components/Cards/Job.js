import React, { Component } from 'react';


class Job extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div style = {{margin:'0rem 0rem'}}>
                
                    <div style={{display:'flex',margin:'0.5rem 0rem'}}>
                        <div style={{marginRight:'2rem',fontWeight:'bold'}}> {this.props.job.job_title} </div>
                    </div>
            </div>
        )
    }
}
export default Job;