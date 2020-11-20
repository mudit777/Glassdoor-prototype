import { Card } from 'antd';
import React, { Component } from 'react';
import "./Company.css";


class Company extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div style = {{marginTop : "5%"}}>
                <Card title = 'Name Overview' style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : '50rem'}}>
                    <div style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'4rem',fontWeight:'bold'}}>Website:</div>
                        <div>www.abc.com</div>
                    </div>

                    <div  style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'1.2rem',fontWeight:'bold'}}>Headquarters:</div>
                        <div>Seattle</div>
                    </div>

                    <div  style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'5.8rem',fontWeight:'bold'}}>Size:</div>
                        <div>10,000+ employees</div>
                    </div>

                    <div  style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'3.6rem',fontWeight:'bold'}}>Founded:</div>
                        <div>1997</div>
                    </div>

                    <div  style={{display:'flex',margin:'0.5rem 1rem'}}>
                        <div style={{marginRight:'3.8rem',fontWeight:'bold'}}>Revenue:</div>
                        <div>$2 billion (USD) per year</div>
                    </div>
                </Card>
            </div>
        )
    }
}
export default Company;