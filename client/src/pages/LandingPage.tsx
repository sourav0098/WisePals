import React, { useEffect, useState } from "react";
import LandingPageCSS from "../assets/LandingPage.module.css";
import landingPicture from "../assets/landingPicture.png";
import SearchBar from "../features/searchTutors/components/SearchBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const LandingPage: React.FC = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CONTENTS}/63e7a5d14236e852403de3c6`
      )
      .then((response) => {
        setContent(response.data.data.description);
      });
  }, []);
  return (
    <div className={LandingPageCSS.showcaseArea}>
      <div className={`container ${LandingPageCSS.container}`}>
        <div className={LandingPageCSS.left}>
          <div className={LandingPageCSS.title}>
            <h1>Find a tutor,</h1>
            <h1>In any topic that you want.</h1>
            <p className={LandingPageCSS.text}>{content}</p>
            <SearchBar />
          </div>
        </div>
        <div className={LandingPageCSS.right}>
          <img
            className={LandingPageCSS.landingPicture}
            src={landingPicture}
            alt="landingPicture"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
