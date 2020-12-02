import { FILTERJOBS, GETALLCOMPANIES, GETALLSTUDENTJOBS, LOGIN, SEARCHCOMPANIES, SEARCHJOBS } from "../constants";



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
    return state;  
}

export default rootReducer;