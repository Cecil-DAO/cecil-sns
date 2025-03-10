import "./index.css";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex items-center justify-center sticky top-0 py-4 bg-slate-900 z-50 text-white gap-4 font-semibold">
        <div>Every single ICP counts! Join the cause with us!</div>
        <a
          href="https://nns.ic0.app/project/?project=ju4gz-6iaaa-aaaaq-aaeva-cai"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2 bg-white text-black rounded-full"
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
