import React, { useEffect, useState } from "react";
import "./NewRequest.css";
import {
  addRequest,
  getAllRequests,
  getProjectDetails,
} from "../../actions/projectAction";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { PrimaryButton } from "../../components/Button/Button";

const NewRequest = () => {
  const dispatch = useDispatch();
  const { projectDetails } = useSelector((state) => state.projectDetails);
  const { id } = useParams();

  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestAmount, setRequestAmount] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverDescription, setReceiverDescription] = useState("");

  const handleSubmit = () => {
    const requestDetails = {
      requestTitle,
      requestDescription,
      requestAmount,
      receiverAddress,
      receiverDescription,
    };
    dispatch(
      addRequest(
        projectDetails?.projectEthId,
        projectDetails?.id,
        requestDetails
      )
    );
  };

  useEffect(() => {
    dispatch(getProjectDetails(id));
    dispatch(getAllRequests(projectDetails?.projectEthId));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="new_request_container">
          <div className="input_form">
            <h1>Add your request</h1>
            <div className="input_section">
              <label htmlFor="name">Request title</label>
              <input
                type="text"
                value={requestTitle}
                onChange={(e) => setRequestTitle(e.target.value)}
              />
            </div>
            <div className="input_section">
              <label htmlFor="">Description</label>
              <textarea
                type="text"
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
              />
            </div>
            <div className="input_section">
              <label htmlFor="name">Request amount</label>
              <input
                type="text"
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
              />
            </div>
            <div className="input_section">
              <label htmlFor="name">Receiver address</label>
              <input
                type="text"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
              />
            </div>
            <div className="input_section">
              <label htmlFor="name">Receiver description</label>
              <input
                type="text"
                value={receiverDescription}
                onChange={(e) => setReceiverDescription(e.target.value)}
              />
            </div>

            <div className="submit_button_container">
              <PrimaryButton
                color="blue"
                label="Create"
                onClick={(e) => handleSubmit(e)}
                style={{ marginTop: "1rem", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;
