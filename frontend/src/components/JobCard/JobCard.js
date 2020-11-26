import { Card, Col, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { Component } from 'react'

class JobCard extends Component {
    render() {
        return (
            <div>
                <Card title = {this.props.job.job_title} style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", marginTop : "3%", marginLeft : "4%", marginRight : "4%"}}>
                    {/* <Row>
                        <Col>
                            <Avatar src = {} />
                        </Col>
                        <Col>
                            {}
                        </Col>
                    </Row> */}
                </Card>
            </div>
        )
    }
}
export default JobCard;