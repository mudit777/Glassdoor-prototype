import { LOGIN } from "../constants";



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
    return state;  
}

export default rootReducer;