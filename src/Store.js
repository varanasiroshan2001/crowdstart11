import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  projectReducer,
  projectDetailsReducer,
  requestsReducer,
} from "./reducers/projectReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  projects: projectReducer,
  user: userReducer,
  projectDetails: projectDetailsReducer,
  requests: requestsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
