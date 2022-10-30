import {
  ETH_ID_ERROR,
  ETH_ID_REQUEST,
  ETH_ID_SUCCESS,
  UPDATE_PROFILE_IMAGE_FAIL,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstant";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ETH_ID_REQUEST:
    case UPDATE_PROFILE_IMAGE_REQUEST:
      return {
        loading: true,
        user: {},
      };
    case ETH_ID_SUCCESS:
    case UPDATE_PROFILE_IMAGE_SUCCESS:
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case ETH_ID_ERROR:
    case UPDATE_PROFILE_IMAGE_FAIL:
    case LOGOUT_FAIL:
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
