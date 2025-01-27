import { CHANGE_HEADER } from "./actions"


const initialState = [];

const changeHeaderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_HEADER:
        return action.payload
      default:
        return state;
    }
  };
  
  export default changeHeaderReducer;