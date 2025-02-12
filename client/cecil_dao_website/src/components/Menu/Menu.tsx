import { useState } from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <nav className="menu">
      <div onClick={() => setIsOpened(!isOpened)}>
        <img
          width={40}
          height={40}
          src="/nav.svg"
          alt=""
          className="cursor-pointer rounded-xl"
        />
      </div>
      <div className={`overlayMenu ${isOpened && "opened"}`}>
        <div className="flex justify-between items-center">
          <img
            src="/logo-cecil-dao.png"
            alt="Logo Cecil DAO"
            className="h-[48px]"
          />
          <div className="hidden md:block font-bold text-content/60 text-sm tracking-wider">
            Cecil The Lion DAO
          </div>
          <img
            width={40}
            height={40}
            onClick={() => setIsOpened(!isOpened)}
            src="/nav.svg"
            alt=""
            className="cursor-pointer rounded-xl"
          />
        </div>
        <div className="menuItems">
          <NavLink to="/protect-african-lions">Protect African Lions</NavLink>
          <NavLink to="/cecil-ai">Cecil AI Agent</NavLink>
          <NavLink to="/justice-pour-l'enfance">Justice pour L'enfance</NavLink>
          <NavLink to="/malaika">Malaika</NavLink>
          <NavLink to="/akashingas">Akashingas</NavLink>
          <NavLink to="/mighty-under-dogs">Mighty Under Dogs</NavLink>
          <NavLink to="/the-kings-childrens-home">
            The Kings Childrens Home
          </NavLink>
        </div>
        <div>
          <div
            className="flex items-center manuFooter"
            style={{ justifyContent: "space-between", padding: "16px 32px" }}
          >
            <div className="flex items-center gap-4">
              <p>Follow us: </p>
              <img src="/xIcon.svg" alt="" />
              <img src="/instIcon.svg" alt="" />
            </div>
            <p className="hidden md:block">@CecilDAO</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
