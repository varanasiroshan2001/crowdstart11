import React, { useState } from "react";
import "./projectDetails.css";
import { getProjectDetails, donateAction } from "../../actions/projectAction";
import { useDispatch, useSelector } from "react-redux";
import SimpleImageSlider from "react-simple-image-slider";
import sampleImg from "../../assets/images/sample.png";
import ethereumImg from "../../assets/vectors/etherium.svg";
import peopleImg from "../../assets/vectors/team.svg";
import timeImg from "../../assets/vectors/clock.svg";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Title from "../../components/Headers/Title";
import Navbar from "../../components/Navbar/Navbar";
import { PrimaryButton, SecondaryButton } from "../../components/Button/Button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useAuth } from "../../contexts/authContext";
import Modal from "react-modal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loading from "../../components/Loading/Loading";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projectDetails, loading } = useSelector(
    (state) => state.projectDetails
  );
  const { user } = useSelector((state) => state.user);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "50%",
    },
  };

  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");
  const [donaterName, setDonaterName] = useState("");

  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, []);

  console.log({ id });

  const handleDonate = () => {
    confirmAlert({
      title: `Are you sure to donate ${donateAmount} ether`,
      // message: 'Are you sure to do this.',
      buttons: [
        {
          label: "Donate",
          onClick: () => dispatch(donateAction(id, donateAmount, donaterName)),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  return (
    <div>
      <Navbar />
      {loading ? <Loading /> : ""}
      <div className="container">
        <div className="project_details_container">
          <Title
            title={projectDetails?.projectName}
            color="var(--primary-pink)"
            style={{ padding: 0 }}
          />
          <p>{projectDetails?.projectDescription}</p>
          <div className="project_details">
            <div className="project_image_slider">
              <div className="image_slider_full">
                {projectDetails?.imageUrls && (
                  <SimpleImageSlider
                    width={"90%"}
                    height={504}
                    images={projectDetails?.imageUrls}
                    showBullets={true}
                    showNavs={true}
                    slideDuration={1.5}
                    autoPlay={true}
                  />
                )}
              </div>
              <div className="image_slider_half">
                {projectDetails?.imageUrls && (
                  <SimpleImageSlider
                    width={"45%"}
                    height={504}
                    images={projectDetails?.imageUrls}
                    showBullets={true}
                    showNavs={true}
                    slideDuration={1.5}
                    autoPlay={true}
                  />
                )}
              </div>
            </div>
            <div className="project_details_2">
              <div className="flex_1">
                <div className="eth_card_2">
                  <img src={ethereumImg} alt="ether" />
                  <div>
                    <h4>{projectDetails?.pledgedEth} Ethereum</h4>
                    <p>Initial goal</p>
                  </div>
                </div>{" "}
                <div className="eth_card_2">
                  <img src={ethereumImg} alt="ether" />
                  <div>
                    <h4>{projectDetails?.receivedEth} Ethereum</h4>
                    <p>Received</p>
                  </div>
                </div>
              </div>
              <div className="eth_card_2">
                <img src={peopleImg} alt="ether" />
                <div>
                  <h4>{projectDetails?.numDonaters}</h4>
                  <p>People donated</p>
                </div>
              </div>{" "}
              <div className="eth_card_2">
                <img src={timeImg} alt="ether" />
                <div>
                  <h4>15</h4>
                  <p>Days to go</p>
                </div>
              </div>
              <div className="project_details_buttons">
                <PrimaryButton
                  label="Donate"
                  color="pink"
                  style={{ width: "200px" }}
                  onClick={() => setDonateModalOpen(true)}
                />
                {user?.userEthId === projectDetails?.creatorEthId ? (
                  <PrimaryButton
                    label="Create request"
                    color="blue"
                    style={{ width: "200px", marginLeft: "2rem" }}
                    onClick={() => {
                      alert.removeAll();
                      if (!currentUser) {
                        alert.show("You have to create an account to donate");
                        return;
                      } else if (
                        user?.userEthId !== projectDetails?.creatorEthId
                      ) {
                        alert.show("Only the creator can make a new request ");
                        return;
                      }
                      navigate(`new-request`);
                    }}
                  />
                ) : (
                  ""
                )}
                <PrimaryButton
                  label="All requests"
                  color="pink"
                  style={{
                    width: "200px",
                    marginLeft: "2rem",
                  }}
                  onClick={() => navigate("requests")}
                />
              </div>
            </div>
          </div>
          <div className="like_buttons">
            <div>
              <Checkbox
                icon={
                  <FavoriteBorder style={{ color: "var(--primary-pink)" }} />
                }
                checkedIcon={
                  <Favorite style={{ color: "var(--primary-pink)" }} />
                }
              />
              <p>Like</p>
            </div>
            <div>
              <Checkbox
                icon={
                  <BookmarkBorderIcon
                    style={{ color: "var(--primary-blue)" }}
                  />
                }
                checkedIcon={
                  <BookmarkIcon style={{ color: "var(--primary-blue)" }} />
                }
              />
              <p>Save</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={donateModalOpen}
        onRequestClose={() => setDonateModalOpen(false)}
        style={customStyles}
      >
        <div className="donate_card">
          <Title
            title={`Donate to ${projectDetails?.projectName}`}
            color="var(--primary-pink)"
            font="1rem"
          />
          <div className="input_section">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={donaterName}
              onChange={(e) => setDonaterName(e.target.value)}
            />
          </div>
          <div className="input_section">
            <label htmlFor="name">Amount(in Ether)</label>
            <input
              type="text"
              value={donateAmount}
              onChange={(e) => setDonateAmount(e.target.value)}
            />
          </div>
          <PrimaryButton
            label="Donate"
            color={"blue"}
            onClick={() => handleDonate()}
            style={{ width: "100%", marginTop: "1rem" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetails;
