import {
  ALL_PROJECT_REQUEST,
  ALL_PROJECT_SUCCESS,
  ALL_PROJECT_FAIL,
  CLEAR_ERRORS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  ALL_REQUEST_FAIL,
  ALL_REQUEST_REQUEST,
  ALL_REQUEST_SUCCESS,
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

export const projectDetailsReducer = (
  state = { projectDetails: {} },
  action
) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return {
        loading: true,
        projectDetails: {},
      };
    case PROJECT_DETAILS_SUCCESS:
      return {
        loading: false,
        projectDetails: action.payload,
      };
    case PROJECT_DETAILS_FAIL:
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

export const requestsReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case ALL_REQUEST_REQUEST:
      return {
        loading: true,
        projects: [],
      };
    case ALL_REQUEST_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };
    case ALL_REQUEST_FAIL:
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
