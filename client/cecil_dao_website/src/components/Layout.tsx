import "./index.css";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layoutWrap min-h-screen flex flex-col">
      <div className="layoutInnerWrap flex-grow">
        <ScrollRestoration />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
