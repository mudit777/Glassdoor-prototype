import React, { Component } from 'react'
import { search_interviews } from '../../js/actions';
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar';
import InterviewCard from '../InterviewCard/InterviewCard';
import { connect } from 'react-redux';

class SearchedInterviews extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }
    render() {
        
        var temp = null
        if(this.props.interviews)
        {
            console.log("The props are ", this.props.interviews)
            temp = this.props.interviews.map(i => {
                return(
                    <InterviewCard interview = {i} key = {i._id} />
                )
            })
        }
        return (
            <div>
                <div>
                    <CompanyHeaderBarForm />
                </div>
                <div>
                    {temp}
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