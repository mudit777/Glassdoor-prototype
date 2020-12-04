import { FILTERJOBS, GETALLCOMPANIES, GETALLSTUDENTJOBS, LOGIN, SEARCHCOMPANIES, SEARCHINTERVIEWS, SEARCHJOBS, SEARCHSALARIES } from "../constants";



const initialState = {
    
  };

function rootReducer(state = initialState, action)
{
  if(action.type === LOGIN)
  {
    if(action.data.type === 'student')
    {
      return Object.assign({},state,{
        student : action.data.student,
        message : action.data.message,
        type : action.data.type,
      })
    }
    else if(action.data.type === 'company')
    {
      return Object.assign({},state,{
        company : action.data.company,
        message : action.data.message,
        type : action.data.type,
      })
    }
    else if(action.data.type === 'Admin')
    {
      return Object.assign({},state,{
        type : action.data.type,
      })
    }
  }
  else if(action.type === GETALLCOMPANIES)
  {
    return Object.assign({}, state, {
      companies : action.data.companies,
      message : action.data.message
    })
  }
  else if(action.type === SEARCHCOMPANIES)
  {
    console.log("~~~~~~~~~~~~~~~~~");
    return Object.assign({}, state, {
      companies : action.data.companies,
      message : action.data.message
    })
  }
  else if(action.type === SEARCHJOBS)
  {
    return Object.assign({}, state, {
      studentJobs : action.data.studentJobs,
      message : action.data.message
    })
  }
  else if(action.type === GETALLSTUDENTJOBS)
  {
    return Object.assign({}, state, {
      studentJobs : action.data.studentJobs,
      message : action.data.message
    })
  }
  else if(action.type === FILTERJOBS)
  {
    return Object.assign({}, state, {
      studentJobs : action.data.studentJobs,
      message : action.data.message
    })
  }
  else if(action.type === SEARCHINTERVIEWS)
  {
    console.log("~~~~~~~~~~~~~~~~~");
    return Object.assign({}, state, {
      interviews : action.data.interviews,
      message : action.data.message
    })
  }
  else if(action.type === SEARCHSALARIES)
  {
    console.log("~~~~~~~~~~~~~~~~~");
    return Object.assign({}, state, {
      salaries : action.data.salaries,
      message : action.data.message
    })
  }
    return state;  
}

export default rootReducer;