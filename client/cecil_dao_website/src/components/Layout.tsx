import "./index.css";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="px-4 flex flex-col md:flex-row items-center justify-center text-center sticky top-0 py-4 bg-[#004F39] z-50  gap-4 font-semibold">
        <div className="text-white flex flex-col md:flex-row items-center gap-1">
          <div>Every single ICP counts!</div>{" "}
          <div>🦁 Join the cause with us!</div>
        </div>
        <a
          href="https://nns.ic0.app/project/?project=ju4gz-6iaaa-aaaaq-aaeva-cai"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2 bg-white text-[#004F39] rounded-full"
        >
          Contribute now!
        </a>
      </div>
      <div className="layoutWrap min-h-screen flex flex-col">
        <div className="layoutInnerWrap flex-grow">
          <ScrollRestoration />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
