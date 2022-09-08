import { db } from "../utils/firebase";
import {
  ALL_PROJECT_REQUEST,
  ALL_PROJECT_SUCCESS,
  ALL_PROJECT_FAIL,
  CLEAR_ERRORS,
} from "../constants/projectConstants";

export const projectReducer = (state = { pojects: [] }, action) => {
  switch (action.type) {
    case ALL_PROJECT_REQUEST:
      return {
        loading: true,
        projects: [],
      };
    case ALL_PROJECT_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case ALL_PROJECT_FAIL:
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
