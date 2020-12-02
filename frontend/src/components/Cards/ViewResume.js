import React, { Component } from 'react'
import { Document, Page,pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default class ViewResume extends Component {
      constructor(props){
            super(props)
            this.state={
                  resumepath:'',
                  numPages:null,
                  pageNumber:1
            }
      }
      componentDidMount(){
            this.setState({
                  resumepath:this.props.location.pathname.slice(12)
            })
            // console.log(this.props.location.pathname.slice(12))
      }
      onDocumentLoad({numPages}) {     this.setState({numPages}); }
      render() {
            return (
                  <div>
                       {/* <iframe style={{ width:'100%',height:'100%'}} src='./demo'/> */}
                       {/* <Document file= {{ url: this.state.resumepath }} onLoadSuccess={this.onDocumentLoad} >
                             <Page pageNumber={this.state.pageNumber}> </Page>
                        </Document> */}
                        {/* <a href={this.state.resumepath} target='_blank'>view</a> */}
                        {/* <embed src={this.state.pathname} type='application/pdf'></embed> */}
                  </div>
            )
      }
}
