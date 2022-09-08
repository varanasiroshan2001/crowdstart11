import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
// import web3 from "../ethereum/web3";

import {
  ETH_ID_ERROR,
  ETH_ID_REQUEST,
  ETH_ID_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstant";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: ETH_ID_REQUEST,
    });

    let account = "";

    if (window.ethereum) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => (account = res[0]));
    }

    dispatch({
      type: ETH_ID_SUCCESS,
      payload: { ethId: account },
    });
  } catch (error) {
    dispatch({
      type: ETH_ID_ERROR,
      payload: error,
    });
  }
};
