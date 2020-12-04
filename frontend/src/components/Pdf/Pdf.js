import React, { Component } from 'react'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default class Pdf extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1
        }
    }
    onDocumentLoad({numPages}) {
        this.setState({numPages});
    }
    render() {
        console.log("Inside pdf ", this.props.file)
        const { pageNumber, numPages } = this.state;
        return (
            <div>
                <div>
                <Document
                   file = {{
                       url : this.props.file
                   }}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                    <Page pageNumber={pageNumber} />
                </Document>
                </div>
            </div>
        )
    }
}
