import React from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import { useLocation } from "react-router";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Profile = () => {
  const [user, setUser] = useState([]);
  console.log(useLocation());
  const path = useLocation().pathname;
  const userId = path.replace("/profile/", "");
  console.log(userId);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosInstance.get(`/users/${userId}`);

      setUser(response.data);
      console.log(response.data);
    };
    fetchUser();
  }, [userId]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "no-cover.jpg"
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "avatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{user.userName}</h4>
              <span className="profileInfoDescription">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={userId} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
