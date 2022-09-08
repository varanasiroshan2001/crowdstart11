import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

import {
  ALL_PROJECT_FAIL,
  ALL_PROJECT_REQUEST,
  ALL_PROJECT_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/projectConstants";

export const getProject = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PROJECT_REQUEST,
    });

    const projectCollectionRef = collection(db, "projects");
    const projectSnapshot = await getDocs(projectCollectionRef);
    const projectList = projectSnapshot.docs.map((doc) => doc.data());
    console.log(projectList);

    dispatch({
      type: ALL_PROJECT_SUCCESS,
      payload: projectList,
    });
  } catch (error) {
    dispatch({
      type: ALL_PROJECT_FAIL,
      payload: error,
    });
  }
};
