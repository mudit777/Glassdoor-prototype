import React, { Component } from 'react'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Pdf from '../Pdf/Pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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
      }
      onDocumentLoad({numPages}) {
            this.setState({numPages});
      }
      render() {
            const { pageNumber, numPages } = this.state;
            return (
                  <div>
                        <Pdf file = {this.state.resumepath} />
                  </div>
            )
      }
}
