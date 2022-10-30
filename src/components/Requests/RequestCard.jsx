import React from "react";
import "./RequestCard.css";
import {
  approveAction,
  getProjectDetails,
  finalizeAction,
} from "../../actions/projectAction";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Title from "../Headers/Title";
import { PrimaryButton } from "../Button/Button";
import ethereumImg from "../../assets/vectors/etherium.svg";
import { useEffect } from "react";
import addressFormatter from "../../utils/addressFormatter";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useAlert } from "react-alert";

const RequestCard = ({ request, index }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projectDetails } = useSelector((state) => state.projectDetails);
  const alert = useAlert();

  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, []);

  const handleApprove = () => {
    dispatch(approveAction(id, index));
  };

  const handleFinalize = () => {
    dispatch(finalizeAction(id, index));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(request?.receiverAddress);
    alert.info("Address copied to clipboard");
  };

  return (
    <div className={`request_card`}>
      <div className={`finalized ${request?.isFinalized ? "success" : ""} `}>
        COMPLETED
      </div>
      <div className="request_details">
        <div>
          <Title
            title={`${index + 1} ${request?.requestTitle}`}
            color="blue"
            font="1rem"
          />
          <p>{request?.requestDescription}</p>
          <h4>Receiver: {request?.receiverDescription}</h4>
          <h3>
            Receiver address: {addressFormatter(request?.receiverAddress)}{" "}
            <span>
              <ContentCopyRoundedIcon onClick={() => handleCopy()} />
            </span>
          </h3>
        </div>
        <div
          className={`request_buttons_container ${
            request?.isFinalized ? "hidden" : ""
          }`}
        >
          <PrimaryButton
            label="Approve"
            color="pink"
            style={{ width: "200px" }}
            onClick={() => handleApprove()}
          />
          <PrimaryButton
            label="Finalize"
            color="blue"
            style={{ width: "200px" }}
            disabled={request?.numApprovers * 2 < projectDetails?.numDonaters}
            onClick={() => handleFinalize()}
          />
        </div>
      </div>
      <div className="request_amount_details">
        <div>
          <h4>Amount:</h4>
          <p>
            <span>
              <img src={ethereumImg} alt="ethreum" style={{ width: "1rem" }} />
            </span>
            {request?.requestAmount} Ether
          </p>
        </div>
        <div>
          <h4>Donaters:</h4>
          <p>{projectDetails?.numDonaters}</p>
        </div>
        <div>
          <h4>Approvers:</h4>
          <p>{request?.numApprovers}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
