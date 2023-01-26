import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const SharedLayout = (props) => {
  return (
    <>
      <Navbar user={props.user} logout={props.logout}/>
      <Outlet />
    </>
  );
};

export default SharedLayout;
