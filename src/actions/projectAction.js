import { db } from "../utils/firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";
import getCampaign from "../ethereum/campaign";

import {
  ALL_PROJECT_FAIL,
  ALL_PROJECT_REQUEST,
  ALL_PROJECT_SUCCESS,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  ADD_REQUEST_FAIL,
  ADD_REQUEST_REQUEST,
  ADD_REQUEST_SUCCESS,
  ALL_REQUEST_REQUEST,
  ALL_REQUEST_SUCCESS,
  ALL_REQUEST_FAIL,
  DONATE_FAIL,
  DONATE_REQUEST,
  DONATE_SUCCESS,
  APPROVE_REQUEST,
  APPROVE_FAIL,
  APPROVE_SUCCESS,
  FINALIZE_REQUEST,
  FINALIZE_SUCCESS,
  FINALIZE_FAIL,
} from "../constants/projectConstants";

export const getProject = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PROJECT_REQUEST,
    });

    const projectCollectionRef = collection(db, "projects");
    const projectSnapshot = await getDocs(projectCollectionRef);
    const projectList = projectSnapshot.docs.map((doc) => doc.data());
    // console.log(projectList);

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

export const addProject = (projectDetails, imageUrls) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_PROJECT_REQUEST,
    });

    const accounts = await web3.eth.getAccounts();

    await factory.methods
      .createCampaign(projectDetails.minimumContribution)
      .send({
        from: accounts[0],
      });

    const projectIds = await factory.methods.getDeployedCampaigns().call();

    // console.log({ projectIds });

    const {
      projectName,
      minimumContribution,
      projectDescription,
      creatorId,
      pledgedEth,
    } = projectDetails;

    // console.log({
    //   projectName,
    //   minimumContribution,
    //   projectDescription,
    //   creatorId,
    //   pledgedEth,
    //   imageUrls,
    // });

    const projectRef = await addDoc(collection(db, "projects"), {
      projectName,
      imageUrls: imageUrls,
      minimumContribution,
      projectDescription,
      projectEthId: projectIds[projectIds.length - 1],
      pledgedEth,
      receivedEth: 0,
      numDonaters: 0,
      numLikes: 0,
      creatorId,
      creatorEthId: accounts[0],
      id: "",
      requests: [],
      donaters: [],
    });

    const projectUpdateRef = doc(db, "projects", projectRef.id);
    await updateDoc(projectUpdateRef, {
      id: projectRef.id,
    });

    // console.log({ address });

    dispatch({
      type: ADD_PROJECT_SUCCESS,
      // payload: ,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_PROJECT_FAIL,
      payload: error,
    });
  }
};

export const getProjectDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_DETAILS_REQUEST,
    });

    const projectRef = doc(db, "projects", id);
    const projectSnap = await getDoc(projectRef);

    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
      payload: projectSnap.data(),
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const addRequest =
  (projectEthId, projectId, requestDetails) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_REQUEST_REQUEST,
      });

      console.log({ requestDetails });
      const accounts = await web3.eth.getAccounts();

      const campaign = getCampaign(projectEthId);

      const { requestDescription, requestAmount, receiverAddress } =
        requestDetails;

      await campaign.methods
        .createRequest(
          requestDescription,
          web3.utils.toWei(requestAmount, "ether"),
          receiverAddress
        )
        .send({
          from: accounts[0],
        });

      const projectRef = doc(db, "projects", projectId);
      const projectSnap = await getDoc(projectRef);

      const projectData = projectSnap.data();

      let requests = projectData.requests;

      requests.push({ ...requestDetails, isCompleted: false });

      const projectUpdateRef = doc(db, "projects", projectId);
      await updateDoc(projectUpdateRef, {
        requests: requests,
      });

      dispatch({
        type: ADD_REQUEST_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_REQUEST_FAIL,
        payload: error,
      });
    }
  };

export const getAllRequests = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_REQUEST_REQUEST,
    });

    const projectRef = doc(db, "projects", id);
    const projectSnap = await getDoc(projectRef);
    const projectDetails = projectSnap.data();

    const campaign = getCampaign(projectDetails?.projectEthId);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestsCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requestsMap(index).call();
        })
    );

    console.log({ requests });

    dispatch({
      type: ALL_REQUEST_SUCCESS,
      payload: projectDetails.requests,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ALL_REQUEST_FAIL,
      payload: error,
    });
  }
};

export const donateAction = (id, value, name) => async (dispatch) => {
  try {
    dispatch({
      type: DONATE_REQUEST,
    });

    const projectRef = doc(db, "projects", id);
    const projectSnap = await getDoc(projectRef);

    const projectData = projectSnap.data();

    const accounts = await web3.eth.getAccounts();

    const campaign = getCampaign(projectData?.projectEthId);

    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });

    let donaters = projectData.donaters;
    const numDonaters = projectData.numDonaters + 1;
    donaters.push({ address: accounts[0], name: name });

    await updateDoc(projectRef, {
      donaters: donaters,
      numDonaters: numDonaters,
    });

    dispatch({
      type: DONATE_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DONATE_FAIL,
      payload: error,
    });
  }
};

export const approveAction = (id, index) => async (dispatch) => {
  try {
    dispatch({
      type: APPROVE_REQUEST,
    });

    const projectRef = doc(db, "projects", id);
    const projectSnap = await getDoc(projectRef);

    const projectData = projectSnap.data();

    // const accounts = await web3.eth.getAccounts();

    // const campaign = getCampaign(projectData?.projectEthId);

    // await campaign.methods.approveRequest(index).send({
    //   from: accounts[0],
    // });

    let requests = projectData.requests;

    console.log(requests[index]);

    requests[index].numApprovers = requests[index].numApprovers + 1;

    await updateDoc(projectRef, {
      requests: requests,
    });

    dispatch({
      type: APPROVE_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: APPROVE_FAIL,
      payload: error,
    });
  }
};

export const finalizeAction = (id, index) => async (dispatch) => {
  try {
    dispatch({
      type: FINALIZE_REQUEST,
    });

    const projectRef = doc(db, "projects", id);
    const projectSnap = await getDoc(projectRef);

    const projectData = projectSnap.data();

    // const accounts = await web3.eth.getAccounts();

    // const campaign = getCampaign(projectData?.projectEthId);

    // await campaign.methods.finalizeRequest(index).send({
    //   from: accounts[0],
    // });

    let requests = projectData.requests;

    console.log(requests[index]);

    requests[index].isFinalized = true;

    await updateDoc(projectRef, {
      requests: requests,
    });

    dispatch({
      type: FINALIZE_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FINALIZE_FAIL,
      payload: error,
    });
  }
};
