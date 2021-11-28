import React, { useRef, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";

import { axiosInstance } from "../../config";
import "./share.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Share = () => {
  const { user } = useContext(AuthContext);
  const sharedesc = useRef("");
  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submit clicked");
    const newPost = {
      userId: user._id,
      description: sharedesc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name.toLowerCase();
      console.log(fileName);
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(data);
      try {
        await axiosInstance.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axiosInstance.post("/posts", newPost);
      window.location.reload();
    } catch (error) {}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            type="text"
            src={
              user.profilePicture ? PF + user.profilePicture : PF + "avatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={`What's in your mind ${user.userName} ?`}
            className="shareInput"
            ref={sharedesc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <div className="shareBottom">
          <form className="shareOptions" onSubmit={submitHandler}>
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="#cddc39" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LocalOfferIcon htmlColor="#1e88e5" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
              <LocationOnIcon htmlColor="#ab47bc" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="#ffca28" className="shareIcon" />
              <span className="shareOptionText">Feeling</span>
              <button className="shareButton" type="submit">
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Share;
