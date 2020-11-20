import { Card } from 'antd';
import React, { Component } from 'react';
import "./CompanyCard.css";


class CompanyCard extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div style = {{marginTop : "5%"}}>
                <Card title = {this.props.company.company_name} style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : 300}}>
                    <div>

                    </div>
                </Card>
            </div>
        )
    }
}
export default CompanyCard;