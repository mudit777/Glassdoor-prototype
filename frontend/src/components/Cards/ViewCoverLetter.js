import React, { Component } from 'react'

export default class ViewCoverLetter extends Component {
      constructor(props){
            super(props)
            this.state={
                  coverletterpath:'',
                  numPages:null,
                  pageNumber:1
            }
      }
      componentDidMount(){
            console.log(this.props)
            this.setState({
                  coverletterpath:this.props.location.pathname.slice(17)
            })
            // console.log(this.props.location.pathname.slice(17))
      }
      render() {
            return (
                  <div>
                        coverletter
                  </div>
            )
      }
}
