import "./index.css";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Layout = () => {

  return (
    <div className="layoutWrap">
      <div className="layoutInnerWrap">
        <ScrollRestoration />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout;