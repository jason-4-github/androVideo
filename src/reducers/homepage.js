import * as actionTypes from './../constants/actionTypes';

const homepage = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.LOAD_MARKDOWN_REQUEST:
    case actionTypes.LOAD_MARKDOWN_SUCCESS:
    case actionTypes.LOAD_MARKDOWN_FAILURE:
    default:
      return {
        ...state,
        ...action,
      }
  }
};

export default homepage;