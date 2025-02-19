import { useState, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";

import "./index.scss";
import { useEffect } from "react";

const AccordionItem = ({
  header,
  ...rest
}: {
  header: string;
  children: ReactNode;
  initialEntered?: boolean;
}) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <div className="flex justify-center">
        <div className="flex items-center py-2 gap-2 lg:gap-6">
          <div className="menu-item-title">{header}</div>
          <FontAwesomeIcon
            className={`ml-auto h-4 w-4 lg:h-8 lg:w-8 transition-transform duration-200 ease-out ${
              isEnter && "rotate-180"
            }`}
            icon={faChevronDown}
            color="#73B655"
          />
        </div>
      </div>
    )}
    className=""
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-2 lg:p-4 justify-center text-center ${
          isEnter && "hover:"
        }`,
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out",
    }}
    panelProps={{ className: "p-2 lg:p-4" }}
  />
);

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
          <div className="hidden md:block font-bold text-content/60 text-sm tracking-wider ml-[100px]">
            Cecil The Lion DAO
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <a
              href="https://cecil-dao.gitbook.io/"
              target="_blank"
              className="button"
            >
              About Us
            </a>
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
          <div className="lg:max-w-lg mx-auto">
            <Accordion transition transitionTimeout={200}>
              <AccordionItem header="SNS ACTIONS" initialEntered={true}>
                <div className="menu-item">
                  <NavLink to="/cecil-ai">Cecil AI Agent</NavLink>
                  <NavLink to="/akashingas">Akashingas</NavLink>
                </div>
              </AccordionItem>

              <AccordionItem header="PROTECTING OUR ANIMALS">
                <div className="menu-item">
                  <NavLink to="/akashingas">Akashingas</NavLink>
                  <NavLink to="/protecting-african-lions">
                    Protecting African Lions
                  </NavLink>
                </div>
              </AccordionItem>

              <AccordionItem header="PROTECTING OUR CHILDRENS">
                <div className="menu-item">
                  <NavLink to="/justice-pour-l-enfance">
                    Justice pour L'enfance
                  </NavLink>
                  <NavLink to="/malaika">Malaika</NavLink>
                  <NavLink to="/mighty-under-dogs">Mighty Under Dogs</NavLink>
                  <NavLink to="/the-kings-childrens-home">
                    The Kings Childrens Home
                  </NavLink>
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          {/* <div className="menuItems">
            <div className="flex justify-center">
              <div className="bg-[#004F39] px-4 py-1 lg:py-2 rounded-full">
                <div className="text-white text-sm font-semibold">
                  SNS ACTIONS
                </div>
              </div>
            </div>
            <NavLink to="/cecil-ai">Cecil AI Agent</NavLink>
            <NavLink to="/akashingas">Akashingas</NavLink>

            <div className="flex justify-center mt-4 lg:mt-12">
              <div className="bg-[#004F39] px-4 py-1 lg:py-2 rounded-full">
                <div className="text-white text-sm font-semibold">
                  PROTECTING OUR ANIMALS
                </div>
              </div>
            </div>
            <NavLink to="/akashingas">Akashingas</NavLink>
            <NavLink to="/protecting-african-lions">
              Protecting African Lions
            </NavLink>

            <div className="flex justify-center mt-4 lg:mt-12">
              <div className="bg-[#004F39] px-4 py-1 lg:py-2 rounded-full">
                <div className="text-white text-sm font-semibold">
                  PROTECTING OUR CHILDRENS
                </div>
              </div>
            </div>
            <NavLink to="/justice-pour-l-enfance">
              Justice pour L'enfance
            </NavLink>
            <NavLink to="/malaika">Malaika</NavLink>
            <NavLink to="/mighty-under-dogs">Mighty Under Dogs</NavLink>
            <NavLink to="/the-kings-childrens-home">
              The Kings Childrens Home
            </NavLink>
          </div> */}
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
