import React from "react";
import { useEffect, useState } from "react";
import { MdOutlineHistory } from "react-icons/md";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";
import { useProfilePicMutation } from "../../services/services";
import pointer from "../../assets/polygon.png";
import Profile from "../Profile";

function CustomDropdown({handelLogout}) {
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPro, setShowProfile] = useState(false);
  const [profile, setProfile] = useState('');
  
  const navigate = useNavigate();

  useEffect(()=>{
    const token=localStorage.getItem("token")
    if (token!=undefined&&token) {
      (async()=>{
       const res = await profilePic({email: jwtDecode(token).sub});
       let img = res.data.url;
       setProfile(img)
      })() 
    }else{
      toast.error("please login first")
    }
  },[])
  
  const [profilePic] = useProfilePicMutation();

  const handleProfileHover = (hoverState) => {
    setShowDropdown(hoverState); // Show/hide dropdown on hover
  };
  

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       const userEmail = decodedToken.sub;
  //       setEmail(userEmail);
  //     } catch (error) {
  //       console.error('Failed to decode token:', error);
  //     }
  //   } else {
  //    toast.error("please login first");
  //   }
  // }, []);


  const handelProfile = () => {
    setShowProfile(true);
  }

  const handleHistory = () => {
    navigate("/history");
  }

  return (
    <div
      className="position-relative mx-2"
      onMouseEnter={() => handleProfileHover(true)}
      onMouseLeave={() => handleProfileHover(false)}
    >
      {/* Profile Picture */}
      <div className="profile border overflow-hidden">
        <img
          className="h-100 w-100 object-fit-cover rounded-circle"
          src={profile}
          alt="Profile"
        />
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <ul
          className="list-unstyled bg-white rounded shadow position-absolute end-0 pt-2 mt-3"
        >
          <div className="position-absolute" style={{right: "15px", top: "-18px"}}><img src={pointer} alt="..." style={{height: "20px"}} /></div>
          <li className="px-4 py-2 hover-bg d-flex align-items-center" onClick={handelProfile}>
            <div className="pb-1 me-2">
              <CgProfile />
            </div>
            Profile
          </li>
          <li className="px-4 py-2 hover-bg d-flex align-items-center"
            onClick={handleHistory}
          >
            <div className="pb-1 me-2">
              <MdOutlineHistory size={18} />
            </div>
            History
          </li>
          <li
            className="px-4 py-2 text-danger hover-bg d-flex align-items-center"
            onClick={handelLogout}
          >
            <div className="pb-1 me-2">
              <CiLogin size={18} />
            </div>
            Logout
          </li>
        </ul>
      )}
      <Profile show={showPro} setShow={setShowProfile} />
    </div>
  );
}

export default CustomDropdown;
