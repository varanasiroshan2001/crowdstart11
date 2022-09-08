import {
  ETH_ID_ERROR,
  ETH_ID_REQUEST,
  ETH_ID_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstant";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ETH_ID_REQUEST:
      return {
        loading: true,
        ethId: "",
      };
    case ETH_ID_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case ETH_ID_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
