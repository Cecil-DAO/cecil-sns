import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

import "./index.scss";
import { useEffect } from "react";

const Menu = () => {
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  return (
    <nav className="menu">
      <div onClick={() => setIsOpened(!isOpened)}>
        <div className="flex items-center gap-6">
          <img
            width={48}
            height={48}
            onClick={() => setIsOpened(!isOpened)}
            src="/nav.svg"
            alt=""
            className="cursor-pointer rounded-lg"
          />
        </div>
      </div>
      <div className={`overlayMenu w-full ${isOpened && "opened"}`}>
        <div className="flex justify-between items-center">
          <img
            src="/projects/logo-cecil-ai.png"
            alt="Logo Cecil AI"
            className="h-[48px]"
          />
          <div className="hidden md:block font-bold text-content/60 text-sm tracking-wider">
            Cecil The Lion DAO
          </div>
          <div className="flex items-center gap-6">
            <img
              width={48}
              height={48}
              onClick={() => setIsOpened(!isOpened)}
              src="/nav.svg"
              alt=""
              className="cursor-pointer rounded-lg"
            />
          </div>
        </div>
        <div>
          <div className="menuItems">
            <NavLink to="/protecting-african-lions">
              Protecting African Lions
            </NavLink>
            <NavLink to="/cecil-ai">Cecil AI Agent</NavLink>
            <NavLink to="/justice-pour-l-enfance">
              Justice pour L'enfance
            </NavLink>
            <NavLink to="/malaika">Malaika</NavLink>
            <NavLink to="/akashingas">Akashingas</NavLink>
            <NavLink to="/mighty-under-dogs">Mighty Under Dogs</NavLink>
            <NavLink to="/the-kings-childrens-home">
              The Kings Childrens Home
            </NavLink>
          </div>
          <div className="flex justify-center">
            <a
              href="https://cecil-dao.gitbook.io/"
              target="_blank"
              className="button mt-8 lg:mt-16"
            >
              Read history and whitepaper
            </a>
          </div>
        </div>

        <div>
          <div className="menuFooter flex justify-center xl:justify-between items-center px-6 py-4">
            <p className="hidden md:block text-lg">@dao_cecil</p>
            <div className="flex items-center gap-6">
              <a
                href="https://x.com/dao_cecil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FontAwesomeIcon icon={faXTwitter} color="#656565" size="3x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
