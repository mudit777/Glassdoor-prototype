import React, { Component } from 'react'
import axios from 'axios'
import MiniReviewCard from '../MiniCards/MiniReviewCard';
import { BACKEND } from '../../Config';
import {Pagination} from 'antd'

class GetAllReviews extends Component {

    constructor(props){
        super(props);
        this.state = {
            reviews: [],
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1
    }

    setElementsForCurrentPage = () => {
        console.log("Student jobs are ", this.state.reviews)
        let elements = this.state.reviews.slice(this.state.offset, this.state.offset + this.state.perPage);
        console.log("The elements are -----------", elements);
        this.setState({ 
            elements : elements
        });
    }

    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            return(
                <MiniReviewCard review = {i} key = {i.review_id}/>
            )
        })
    }

    handlePageClick = (pageNo) => {
        const selectedPage = pageNo - 1; 
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, 
            () => this.setElementsForCurrentPage()
        );
    }

    componentDidMount(){
        axios.post(`${BACKEND}/getAllReviews`)
            .then(response => {
                console.log("Status Code in Adding INTERVIEW : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - ADDING INTERVIEW!")
                    console.log(response.data)
                    this.setState({
                        reviews: response.data
                    })
                    this.setElementsForCurrentPage()
                }
                else{
                    console.log("ERROR!!!")
                }
            }) 
            .catch(err => {
                console.log("Error in catch", err)
            })
    }

    render() {

        let paginationElement;
        if(this.state.reviews.length > 0)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.state.reviews.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }

        return (
            <div>
                <div>

                    {this.showCatalogicData()}
                    {paginationElement}
                </div>
            </div>
        )
    }
}

export default GetAllReviews;
