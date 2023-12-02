/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { DrawerLayout } from "../Footer/DrawerLayout";
import LogoutIcon from "@mui/icons-material/Logout";
import "./MobileHeader.scss";
import { useConfig } from "../../../config/config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const MobileHeader = () => {
  const config: any = useConfig();
  // const {tenant} = useParams()
  const navigate = useNavigate();
  const url = config ? config?.data[0]?.url : "https://i.imgur.com/QQ8FTjR.png";
  const tenant = config?.data[0].name;
  const currentRoute = window.location.hash.split('/')?.[2];
 
  console.log("config from header", config?.data[0].url);
  const logout = () => {
    alert("Are you sure you want to log out?");
    setIsLogin(false)
    sessionStorage.clear();
    navigate(`../${tenant}/tenantlogin`, { replace: true });
  };
  const [isLogin, setIsLogin] = useState(
    sessionStorage.isLogin ? sessionStorage.isLogin : false
  );
  // console.log("ee", setIsLogin(true))
  return (
    <header>
      <div className="headerWrapper">
        <Link to="#">
          <div className="logoWrapper">
            <img className="headerLogo" src={url} alt="" />
          </div>{" "}
        </Link>
        <div className="drawerWrapper">
          {/* <DrawerLayout/> */}
          {/* <i className="fa fa-right-from-bracke"></i> */}
          {isLogin ? (
            <button type="button" onClick={logout}>
              <LogoutIcon />
            </button>
          ) : (
            currentRoute == "latest" ?(
              <span>
              <Link to={`/${tenant}/home`}>
                <div className="backArrow">
                  <ArrowBackIcon />
                </div>
              </Link>
            </span>
            ):<span></span>
            
          )}
        </div>
      </div>
    </header>
  );
};
