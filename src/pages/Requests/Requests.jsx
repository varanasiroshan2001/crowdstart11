import React from "react";
import "./Requests.css";
import RequestCard from "../../components/Requests/RequestCard";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllRequests, getProjectDetails } from "../../actions/projectAction";
import Title from "../../components/Headers/Title";

const Requests = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  const { projectDetails } = useSelector((state) => state.projectDetails);

  useEffect(() => {
    dispatch(getProjectDetails(id));
    dispatch(getAllRequests(id));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="requests_container">
          <Title
            title={projectDetails?.projectName}
            color="var(--primary-pink)"
          />
          <h2>All requests</h2>
          <div className="requests_card_container">
            {requests &&
              requests.length > 0 &&
              requests.map((item, index) => (
                <RequestCard request={item} key={index} index={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
