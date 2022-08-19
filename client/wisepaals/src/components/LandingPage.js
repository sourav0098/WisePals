import React from "react";
import LandingPageCSS from "./LandingPage.module.css";
import landingPicture from "./landingPicture.png";
import SearchBar from "./SearchBar";

const LandingPage = () => {
  return (
    <div className={LandingPageCSS.showcaseArea}>
      <div className={`container ${LandingPageCSS.container}`}>
        <div className={LandingPageCSS.left}>
          <div className={LandingPageCSS.title}>
            <h1>Find a tutor,</h1>
            <h1>In any topic that you want.</h1>
            <p className={LandingPageCSS.text}>
              Welcome to the community of more than 100 thousand students using
              wisely their time booking real-time personalized classes with the
              best tutors around the world. Find classes on any topic for all
              levels, from kids to seniors.
            </p>
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
