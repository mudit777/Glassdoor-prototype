import React, { Component } from 'react'
import { search_interviews } from '../../js/actions';
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar';
import InterviewCard from '../InterviewCard/InterviewCard';
import { connect } from 'react-redux';
import { Pagination } from 'antd';

class SearchedInterviews extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            interviews: [],
            offset: 0,
            elements: [],
            perPage: 2,
            currentPage: 1,
            pageCount: 1
        }
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                interviews : this.props.interviews
            })
            this.setElementsForCurrentPage();
        }, );
    }
    setElementsForCurrentPage = () => {
        console.log("State are ---------", this.state.interviews)
        let elements = this.state.interviews.slice(this.state.offset, this.state.offset + this.state.perPage);
        console.log("Elements are ---------", elements)
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            return(
                <InterviewCard interview = {i} key = {i._id} />
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
    render() {
        let paginationElement;
        if(this.props.interviews)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.interviews.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }
        return (
            <div>
                <div>
                    <CompanyHeaderBarForm  type='student'/>
                </div>
                <div>
                    {this.showCatalogicData()}
                </div>
                <div>
                    {paginationElement}
                </div>
            </div>
        )
    }
}
// export default SearchedInterviews;
function mapDispatchToProps(dispatch) {
    return {
        search_interviews: user => dispatch(search_interviews(user))
    };
  }
  
function mapStateToProps(store) {
    console.log("Store in searchd interviews are ", store)
    return {
        message : store.message,
        interviews : store.interviews
    };
}

const SearchedInterviewsForm = connect(mapStateToProps, mapDispatchToProps)(SearchedInterviews);
export default SearchedInterviewsForm;