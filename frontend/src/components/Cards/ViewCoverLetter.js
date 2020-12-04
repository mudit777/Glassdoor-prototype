import React, { Component } from 'react'
import Pdf from '../Pdf/Pdf'

export default class ViewCoverLetter extends Component {
      constructor(props)
      {
            console.log
            super(props);
            this.state = {
                  coverletterpath : ""
            }
      }
      componentDidMount(){
            console.log("props are ---------------",this.props);
            this.setState({
                  coverletterpath:this.props.location.pathname.slice(17)
            })
            // console.log(this.props.location.pathname.slice(12))
      }
      render() {
            console.log("Path is ------------------->",this.state.coverletterpath)
            return (
                  <div>
                        <Pdf file = {this.state.coverletterpath} />
                  </div>
            )
      }
}
