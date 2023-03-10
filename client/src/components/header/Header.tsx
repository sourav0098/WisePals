import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderCSS from "../../assets/Header.module.css";

import SearchBar from "../../features/searchTutors/components/SearchBar";
import logoImage from "../../assets/logo.png";
import statistics from "../../assets/statistics.png";

import { useLocation, RouteComponentProps } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Modal from "../modal/Modal";
import Authentication from "../../pages/Authentication";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ROLES from "../../utils/rolesList";
import { login } from "../../features/authentication/store/authenticationSlice";

interface Props extends RouteComponentProps {}

const Header: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: any) => state.session);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  return (
    <div className={`container ${HeaderCSS.navBar}`}>
      <div className={HeaderCSS.appTitle}>
        <Link to={"/"} className={HeaderCSS.companyName}>
          <img className={HeaderCSS.logo} src={logoImage} alt="logo" />
          <h3 className={HeaderCSS.name}>Wise Pals</h3>
        </Link>
      </div>
      <div className={HeaderCSS.SearchBar}>{path != "/" && <SearchBar />}</div>

      {/* Show join as tutor only when user is not tutor*/}
      {user.id != "" && !user.roles.includes(5777) && (
        <div className={HeaderCSS.links}>
          <Link to={"/addTutor"}>Join Our Tutor Team</Link>
        </div>
      )}
      {/* <div className={HeaderCSS.links}>
        <button
          onClick={() => {
            console.log("test auth");

            // refresh();
            axiosPrivate
              .get(API_ENDPOINTS.TEST_AUTH)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Test Auth
        </button>
      </div> */}
      {user.id === "" ? (
        <div className={HeaderCSS.login} onClick={() => setIsModalOpen(true)}>
          <MdLogin /> <div className={HeaderCSS.loginText}>Login</div>
        </div>
      ) : (
        <>
          <div className={HeaderCSS.links}>
            <Link to={"/userProfile"}>Profile</Link>
          </div>
        </>
      )}
      {user.id !== "" && user?.roles?.includes(ROLES.TUTOR) ? (
        <Link to={"/statistics"} className={HeaderCSS.companyName}>
          <img className={HeaderCSS.logo} src={statistics} alt="logo" />
        </Link>
      ) : (
        <></>
      )}

      {user.id === "" ? (
        <></>
      ) : (
        <>
          <div
            className={HeaderCSS.login}
            onClick={() => {
              console.log("logout");
              // Dispatch login action
              dispatch(
                login({
                  email: "",
                  password: "",
                  accessToken: "",
                  roles: [],
                  id: "",
                  name: "",
                  lastName: "",
                  phone: "",
                })
              );
            }}
          >
            <MdLogout /> <div className={HeaderCSS.loginText}>Logout {` `}</div>
          </div>
        </>
      )}

      <Modal open={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Authentication />
      </Modal>
    </div>
  );
};

export default Header;
