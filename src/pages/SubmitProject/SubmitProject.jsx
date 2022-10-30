import React, { useState, useRef } from "react";
import "./submitProject.css";
import Navbar from "../../components/Navbar/Navbar";
import { addProject } from "../../actions/projectAction";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/authContext";
import { PrimaryButton } from "../../components/Button/Button";
import addImageImg from "../../assets/vectors/addImg.svg";
import "react-datepicker/dist/react-datepicker.css";

const SubmitProject = () => {
  const { user } = useSelector((state) => state.user);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const inputFile = useRef();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [minimumContribution, setMinimumContribution] = useState("");
  const [projectImagesUrls, setProjectImagesUrls] = useState([]);
  const [pledgedEth, setPledgedEth] = useState("");
  // const [percent, setPercent] = useState(0);
  const [projectImages, setProjectImages] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatch(addProject(projectDetails));

    // console.log(projectImages);

    // Upload images
    const storage = getStorage();
    let data = [];
    for (let i = 0; i < projectImages.length; i++) {
      const storageRef = ref(
        storage,
        `/files/projects/${currentUser?.email}/${projectName}_${i}`
      );
      const uploadTask = uploadBytesResumable(storageRef, projectImages[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const percent = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // update progress
          // setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            data.push(url);
            if (data.length === projectImages.length) {
              console.log("data...", data);
              handleAddProject(data);
            }
          });
        }
      );
    }

    // console.log({ projectDetails });
    // console.log(data);

    // dispatch(addProject(projectDetails));
  };

  const handleAddProject = async (imageUrls) => {
    let projectDetails = {
      projectName,
      projectDescription,
      minimumContribution,
      pledgedEth,
      creatorId: user.id,
    };
    console.log({ projectDetails });
    dispatch(addProject(projectDetails, imageUrls));
  };

  const handleProjectImage = (e) => {
    setProjectImages(e.target.files);
    const urlList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const url = URL.createObjectURL(e.target.files[i]);
      urlList.push(url);
    }
    setProjectImagesUrls(urlList);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="submit_project_container">
          <div className="input_form">
            <h1>Add your project</h1>
            <div className="input_section">
              <label htmlFor="name">Project name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="input_section">
              <label htmlFor="">Description</label>
              <textarea
                type="text"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
            <div className="input_section">
              <label htmlFor="name">
                Minimum contribution(in wei) *Once set can't be changed later
              </label>
              <input
                type="text"
                value={minimumContribution}
                onChange={(e) => setMinimumContribution(e.target.value)}
              />
            </div>
            <div className="input_section">
              <label htmlFor="name">Peldged ethereum</label>
              <input
                type="text"
                value={pledgedEth}
                onChange={(e) => setPledgedEth(e.target.value)}
              />
            </div>
            <div className="input_section add_image">
              <label htmlFor="">Add images</label>
              <input
                type="file"
                onChange={(e) => {
                  handleProjectImage(e);
                  // handlePic();
                }}
                ref={inputFile}
                hidden
                multiple
              />
              <img
                className=""
                src={addImageImg}
                height="100"
                width="100"
                alt="add"
                onClick={() => inputFile.current.click()}
              />
              <div className="project_images">
                {projectImagesUrls &&
                  projectImagesUrls.map((item, index) => (
                    <img src={item} key={index} alt={index} />
                  ))}
              </div>
            </div>
            <div className="submit_button_container">
              <PrimaryButton
                color="blue"
                label="Submit"
                onClick={(e) => handleSubmit(e)}
                style={{ mrginTop: "1rem", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitProject;
