import React, { useState, useRef } from "react";
import "./profile.css";
import { storage } from "../../utils/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../contexts/authContext";
import profileBgImg from "../../assets/images/profileBg.png";
import editImg from "../../assets/vectors/edit.svg";
import addImg from "../../assets/vectors/addImg.svg";
import { updateUserProfileImage } from "../../actions/userAction";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { currentUser } = useAuth();

  const [profilePic, setProfilePic] = useState();
  // const [percent, setPercent] = useState(0);
  const inputFile = useRef();

  const handleProfilePic = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      console.log(e.target.files[0].name);
    }

    if (currentUser?.imgUrl !== "") {
      const storage = getStorage();

      // Create a reference to the file to delete
      const profileRef = ref(storage, `/files/profiles/${currentUser?.email}`);

      // Delete the file
      deleteObject(profileRef)
        .then(() => {
          // File deleted successfully
          console.log("file deleted");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    }

    const storageRef = ref(storage, `/files/profiles/${currentUser?.email}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        // setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          dispatch(updateUserProfileImage(currentUser, url));
        });
      }
    );
  };

  const handlePic = () => {};

  return (
    <div>
      <Navbar />
      <div className="profile_header_container">
        <img src={profileBgImg} alt="BG" className="profile_bg" />
        <div className="profile_details_container">
          <div className="profile_image_conatiner">
            {user?.imgUrl !== "" ? (
              <div className="profile_image">
                <img src={user?.imgUrl} className="pic" alt="user" />
                <input
                  type="file"
                  onChange={(e) => {
                    handleProfilePic(e);
                    handlePic();
                  }}
                  ref={inputFile}
                  hidden
                />
                <img
                  src={editImg}
                  alt="edit"
                  onClick={() => inputFile.current.click()}
                  className="edit_image"
                />
              </div>
            ) : (
              <div className="empty_image">
                <input
                  type="file"
                  onChange={(e) => {
                    handleProfilePic(e);
                    handlePic();
                  }}
                  ref={inputFile}
                  hidden
                />
                <img
                  src={addImg}
                  alt="add"
                  onClick={() => inputFile.current.click()}
                />
              </div>
            )}
          </div>
          <div className="profile_details">
            <h1>{user?.name}</h1>
            <h3>{user?.email}</h3>
          </div>
        </div>
      </div>
      <div className="container"></div>
    </div>
  );
};

export default Profile;
