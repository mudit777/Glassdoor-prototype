import React, { Component } from 'react'
import { search_salaries } from '../../js/actions';
import SalaryCard from '../SalaryCard/SalaryCard';
import { connect } from 'react-redux';
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar';

class SearchedSalaries extends Component {

    constructor(props)
    {
        super(props);
        if(!sessionStorage.getItem('student_id'))
        {
            window.location.replace('/login')
        }
        else
        {
            
        }
        this.state = {

        }
    }
    
    render() {

        var temp = null
        if(this.props.SearchedSalaries)
        {
            console.log("The props are ", this.props.salaries)
            temp = this.props.salaries.map(i => {
                return(
                    <SalaryCard salaries = {i} key = {i._id} />
                )
            })
        }

        return (
            <div>
                <div>
                    <CompanyHeaderBarForm type='student' />
                </div>
                <div>
                    {temp}
                </div>
                <Footer/>
            </div>
        )
    }
}

// export default SearchedSalaries;
function mapDispatchToProps(dispatch) {
    return {
        searched_salaries: user => dispatch(search_salaries(user))
    };
  }
  
function mapStateToProps(store) {
    console.log("Store in searchd salaries are ", store)
    return {
        message : store.message,
        salaries : store.salaries
    };
}

const SearchedSalariesForm = connect(mapStateToProps, mapDispatchToProps)(SearchedSalaries);
export default SearchedSalariesForm;