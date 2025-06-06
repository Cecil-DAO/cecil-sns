import { Link } from "react-router-dom";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";

import "../index.scss";

import PlanetModel from "@components/3dModels/PlanetModel";
import Card from "@components/Card/Card";
import Menu from "@components/Menu/Menu";
import { useEffect } from "react";

export const LandingPage = () => {
  useEffect(() => {
    const copy = document.querySelector(".caroussel-slide")?.cloneNode(true);
    if (copy) {
      document.querySelector(".caroussel")?.appendChild(copy);
      document.querySelector(".caroussel")?.appendChild(copy);
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col min-h-screen">
        <header className="flex justify-between items-center p-4">
          <img
            src="/projects/logo-cecil-ai.png"
            alt="Logo Cecil DAO"
            className="h-[48px]"
          />
          <div className="hidden md:block font-bold text-content/60 text-sm tracking-wider ml-[120px]">
            Cecil The Lion DAO
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <a
                href="https://cecil-dao.gitbook.io/"
                target="_blank"
                className="button"
              >
                About Us
              </a>
            </div>
            <Menu />
          </div>
        </header>
        <section className="relative flex-grow">
          <div
            className={clsx(
              "hero-text w-full lg:mt-16",
              "absolute left-1/2 transform -translate-x-1/2"
            )}
          >
            Cecil the
            <br />
            Lion DAO
          </div>
          <PlanetModel />
        </section>
      </div>
      <section className="itemsSection Section">
        <div className="smallContainer Section1-line">
          <h2 className="mt-4 lg:mt-8">Cecil the lion DAO</h2>
          <p className="mt-6 lg:mt-10 mb-8">
            Cecil the Lion DAO is a decentralized autonomous organization (DAO)
            dedicated to support various humanitarian projects. Inspired by the
            tragic story of Cecil the lion, a beloved and well-known lion who
            was killed in Africa, this DAO aims to honor his memory by making a
            positive impact on the world.
          </p>
          <Link to="/cecil-the-lion" className="button">
            Learn more
          </Link>
        </div>

        <div className="flex justify-center mb-16 lg:mb-24 mt-16 lg:mt-24">
          <div className="bg-[#004F39] px-6 py-2 lg:py-4 rounded-xl">
            <div className="text-white text-xl lg:text-4xl font-semibold">
              THE DAO VISION
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Card
            className="max-w-md"
            classNameImg="object-none"
            img="/projects/logo-cecil-ai-lg.png"
            title="Cecil AI Agent"
            description="Imagine a world where humanitarian aid reaches those who need it most, not hampered by red tape or human error, but guided by unwavering intelligence and compassion. That world is within reach with Cecil, the AI agent poised to revolutionize humanitarian aid. "
            link="/cecil-ai"
          />
        </div>

        <div className="flex justify-center my-16 lg:my-24">
          <div className="bg-[#004F39] px-6 py-2 lg:py-4 rounded-xl">
            <div className="text-white text-xl lg:text-4xl font-semibold">
              PROTECTING OUR ANIMALS
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className="self-start"
            img="/projects/img-akashingas.png"
            title="Akashingas"
            description='This project aims to support the Akashingas ("the brave") women rangers in Zimbabwe, who dedicate their lives to defending nature reserves against poaching activities. These women, who often come from difficult backgrounds, have become an example for local communities.'
            link="/akashingas"
          />
          <Card
            className="mt-8 md:mt-80"
            img="/projects/img-cecil-the-lion.png"
            title="Protecting African Lions"
            description="P.A.L is a non- profit organization whose mission is to ultimately get protection status for the African Lion. We raise awareness through developing working relationships of mutual support with other organizations who share our goals."
            link="/protecting-african-lions"
          />
        </div>

        <div className="flex justify-center my-16 lg:my-24">
          <div className="bg-[#004F39] px-6 py-2 lg:py-4 rounded-xl">
            <div className="text-white text-xl lg:text-4xl font-semibold">
              PROTECTING OUR CHILDREN
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24 lg:mb-32">
          <Card
            className="self-start"
            img="/projects/logo-justice-pour-enfance.svg"
            title="Justice pour l'enfance"
            description="Under the leadership of activist journalist Karl Zero and a board of 40 lawyers, Justice for Children was born. This non-profit association brings together a collective of lawyers specializing in the defense of children, present throughout France."
            link="/justice-pour-l-enfance"
          />
          <Card
            className="mt-8 md:mt-80"
            img="/projects/img-malaika.png"
            title="Malaika"
            description="In 2007, Noëlla Coursaris founded Malaika, a grassroots nonprofit that educates and empowers girls and their communities. The foundation operates in Kalebuka, a village 45 minutes away from Noëlla's hometown of Lubumbashi in the Democratic Republic of the Congo."
            link="/malaika"
          />
          <Card
            className="self-start mt-8 md:-mt-48"
            img="/projects/img-kings-childrens-home.avif"
            title="The Kings Children's Home"
            description="The Kings Children's Home is a safe house for babies and young children that have been abandoned or abused. It is a non-profit organization based in the Eastern Cape, South Africa."
            link="/the-kings-childrens-home"
          />
          <Card
            className="mt-8 md:mt-40"
            img="/projects/img-mighty-under-dogs.jpg"
            title="Mighty Under Dog"
            description="Lead by Timmy Hazelip and dedicated team of surfers who understand and share the healing powers of ocean therapy. Breeding confidence, one wave at a time."
            link="/mighty-under-dogs"
          />
        </div>
      </section>

      <section className="itemsSection Section">
        <div className="smallContainer flex flex-col items-center gap-10 Section2-line">
          <h2 className="text-center">Why a DAO?</h2>
          <p>
            Cecil the Lion DAO is completely decentralised autonomous
            organisation. It's the first of its kind where any decisions about
            supported projects and related actions are governed by all of its
            members in a decentralised manner.
          </p>
          <Link to="/why-dao" className="button mb-20">
            Read More
          </Link>
        </div>
      </section>

      <div className="caroussel mb-20">
        <div className="caroussel-slide">
          <div>RESILIENCE</div>
          <div>
            <img
              src="/leaf-right.svg"
              className="hidden md:block h-[40px]"
              alt="Leaf"
            />
          </div>
          <div>NON-CORRUPTIBLE</div>
          <div>
            <img
              src="/leaf-right.svg"
              className="hidden md:block h-[40px]"
              alt="Leaf"
            />
          </div>
          <div>TRANSPARENCY</div>
          <div>
            <img
              src="/leaf-right.svg"
              className="hidden md:block h-[40px]"
              alt="Leaf"
            />
          </div>
        </div>
      </div>

      <section className="discoverSection grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div
          className="bg-white rounded-lg h-full flex flex-col gap-8 items-center Section"
          style={{ padding: "75px 40px" }}
        >
          <img src="/ic.svg" alt="" />
          <h4>SNS</h4>
          <p>
            Any actions of the DAO are running through a Service Nervous System
            (SNS) on the Internet Computer Protocol (ICP) blockchain.
          </p>
          <div className="flex-grow flex flex-col justify-end">
            <Link className="flex gap-4" to="/sns">
              DISCOVER MORE <img src="/linkArrow.svg" alt="" />
            </Link>
          </div>
        </div>

        <div
          className="bg-white rounded-lg h-full flex flex-col gap-8 items-center Section"
          style={{ padding: "75px 40px" }}
        >
          <img src="/ic.svg" alt="" />
          <h4>ICP Nodes</h4>
          <p>
            Rewards from running ICP blockchain nodes, run by the Decentralised
            Entities Foundation, are going directly to the funding of the DAO's
            platform and AI agent development.
          </p>
          <div className="flex-grow flex flex-col justify-end">
            <Link className="flex gap-4" to="/icp-neurons">
              DISCOVER MORE <img src="/linkArrow.svg" alt="" />
            </Link>
          </div>
        </div>

        <div
          className="bg-white rounded-lg h-full flex flex-col gap-8 items-center Section"
          style={{ padding: "75px 40px" }}
        >
          <img src="/ic.svg" alt="" />
          <h4>ORIGYN neuron</h4>
          <p>
            The DAO has received a generous donation of 300 million OGY from the
            ORIGYN Foundation whose rewards are going 100% to the projects
            within the DAO.
          </p>
          <div className="flex-grow flex flex-col justify-end">
            <Link className="flex gap-4" to="/neuron">
              DISCOVER MORE <img src="/linkArrow.svg" alt="" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="partners"
        className={clsx(
          "flex flex-col xl:flex-row justify-around items-center max-w-7xl mx-auto",
          "gap-12 xl:gap-0",
          "my-16 xl:my-36",
          "z-10"
        )}
      >
        <div className="bg-[#004F39] px-6 py-3 rounded-xl">
          <div className="text-white text-2xl font-semibold">PARTNERS</div>
        </div>
        <a
          href="https://www.bity.com/"
          target="_blank"
          className="h-[48px] flex items-center"
        >
          <img src="/logo-bity.svg" alt="Logo BITY" className="" />
        </a>
        {/* <a
          href="https://yuku.app/"
          target="_blank"
          className="h-[48px] flex items-center"
        >
          <img src="/logo-yuku.svg" alt="Logo YUKU" className="" />
        </a> */}
        <a href="https://www.origyn.com/" target="_blank" className="">
          <img
            src="/brand-origyn.png"
            alt="Logo ORIGYN"
            className="h-[48px] flex items-center"
          />
        </a>
      </section>

      <footer className="flex justify-between items-center bg-white rounded-lg mt-20 px-8 py-4 z-10">
        <div className="text-lg">@dao_cecil</div>
        <div className="flex items-center gap-6">
          <a
            href="https://x.com/dao_cecil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FontAwesomeIcon icon={faXTwitter} color="#004F39" size="3x" />
          </a>
          <a
            href="https://t.me/cecildao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FontAwesomeIcon icon={faTelegram} color="#004F39" size="3x" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
