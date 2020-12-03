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
        const { pageNumber, numPages } = this.state;
        return (
            <div>
                <div>
                <Document
                   file = {{
                       url : "https://s3.us-west-1.amazonaws.com/glassdoorcmpe273/0.542045176025933_Udit_Resume_final.pdf"
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
