import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
// import { useAuth } from "../contexts/authContext";
import { updateDoc, doc } from "firebase/firestore";
import web3 from "../ethereum/web3";

import {
  ETH_ID_ERROR,
  ETH_ID_REQUEST,
  ETH_ID_SUCCESS,
  UPDATE_PROFILE_IMAGE_FAIL,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  // LOGIN_FAIL,
  // LOGIN_REQUEST,
  // LOGIN_SUCCESS,
  // REGISTER_USER_FAIL,
  // REGISTER_USER_REQUEST,
  // REGISTER_USER_SUCCESS,
  // FORGOT_PASSWORD_FAIL,
  // FORGOT_PASSWORD_REQUEST,
  // FORGOT_PASSWORD_SUCCESS,
  // CLEAR_ERRORS,
} from "../constants/userConstant";

export const getUser = (currentUser) => async (dispatch) => {
  try {
    dispatch({
      type: ETH_ID_REQUEST,
    });

    const accounts = await web3.eth.getAccounts();

    const userCollectionRef = collection(db, "users");
    const userSnapshot = await getDocs(userCollectionRef);
    let user = userSnapshot.docs.filter(
      (doc) => doc.data().email === currentUser?.email
    );

    // console.log(user[0].data());

    if (accounts[0]) {
      const userRef = doc(db, "users", user[0].data().id);
      await updateDoc(userRef, {
        userEthId: accounts[0],
      });
    }

    user = userSnapshot.docs.filter(
      (doc) => doc.data().email === currentUser?.email
    );

    const userData = user[0].data();

    dispatch({
      type: ETH_ID_SUCCESS,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ETH_ID_ERROR,
      payload: error.message,
    });
  }
};

export const handleLogoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: {},
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGOUT_FAIL,
      payload: error,
    });
  }
};

export const updateUserProfileImage =
  (currentUser, imgUrl) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_IMAGE_REQUEST,
      });

      const userCollectionRef = collection(db, "users");
      const userSnapshot = await getDocs(userCollectionRef);
      let user = userSnapshot.docs.filter(
        (doc) => doc.data().email === currentUser?.email
      );

      const userRef = doc(db, "users", user[0].data().id);
      await updateDoc(userRef, {
        imgUrl: imgUrl,
      });

      user = userSnapshot.docs.filter(
        (doc) => doc.data().email === currentUser?.email
      );

      const userData = user[0].data();

      dispatch({
        type: UPDATE_PROFILE_IMAGE_SUCCESS,
        payload: { ...userData },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_PROFILE_IMAGE_FAIL,
        payload: error,
      });
    }
  };
