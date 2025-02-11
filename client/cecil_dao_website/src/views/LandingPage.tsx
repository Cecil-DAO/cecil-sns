import PlanetModel from "@components/3dModels/PlanetModel";
import Card from "@components/Card/Card";
import "../index.scss";
import Menu from "@components/Menu/Menu";
import clsx from "clsx";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col min-h-screen">
        <header className="flex justify-between p-4">
          <img
            src="/logo-cecil-dao.png"
            alt="Logo Cecil DAO"
            className="h-[48px]"
          />
          <img
            className="hidden md:block"
            src="/TheGoodDAO.svg"
            alt=""
            style={{
              height: 32,
              width: 147,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
          <Menu />
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
          <div>
            <PlanetModel />
          </div>
        </section>
      </div>
      <section className="itemsSection Section">
        <div className="smallContainer Section1-line">
          <h2 className="mt-4 lg:mt-8">Cecil the lion DAO</h2>
          <p className="mt-6 lg:mt-10 mb-8">
            The Cecil the Lion DAO is a decentralized autonomous organization
            (DAO) dedicated to supporting various humanitarian projects.
            Inspired by the tragic story of Cecil the lion, a beloved and
            well-known lion who was killed in Africa, this DAO aims to honor his
            memory by making a positive impact on the world.
          </p>
          <Link to="/cecil-the-lion" className="button mb-20">
            Learn more
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-20 md:gap-80">
            <Card
              className=""
              img="/projects/img-cecil-the-lion.png"
              title="Protect African Lions"
              description="P.A.L is a non- profit organization whose mission is to ultimately get protection status for the African Lion. We raise awareness through developing working relationships of mutual support with other organizations who share our goals."
              link="/project-african-lions"
            />
            <Card
              className=""
              img="/projects/logo-justice-pour-enfance.svg"
              title="Justice pour l'enfance"
              description="Under the leadership of lawyer Geneviève Sroussi and activist journalist Karl0, Justice for Children was born. This non-profit association brings together a collective of lawyers specializing in the defense of children, present throughout France."
              link="/justice-pour-l-enfance"
            />
            <Card
              className=""
              img="/projects/img-akashingas.png"
              title="Akashingas"
              description='This project aims to support the Akashingas ("the brave") women rangers in Zimbabwe, who dedicate their lives to defending nature reserves against poaching activities. These women, who often come from difficult backgrounds, have become an example for local communities.'
              link="/akashingas"
            />
            <Card
              className=""
              img="/projects/img-kings-childrens-home.avif"
              title="The Kings Childrens Home"
              description="The Kings Childrens Home is a safe house for babies and young children that have been abandoned or abused. It is a non-profit organization based in the Eastern Cape, South Africa."
              link="/the-kings-childrens-home"
            />
          </div>

          <div className="flex flex-col gap-20 md:gap-80 mt-16 md:mt-80">
            <Card
              className=""
              img="/projects/img-cecil-the-lion.png"
              title="Cecil AI"
              description="Imagine a world where humanitarian aid reaches those who need it most, not hampered by red tape or human error, but guided by unwavering intelligence and compassion. That world is within reach with Cecil, the AI agent poised to revolutionize humanitarian aid. "
              link="/cecil-ai"
            />
            <Card
              className=""
              img="/projects/img-malaika.png"
              title="Malaika"
              description="In 2007, Noëlla Coursaris founded Malaika, a grassroots nonprofit that educates and empowers girls and their communities. The foundation operates in Kalebuka, a village 45 minutes away from Noëlla's hometown of Lubumbashi in the Democratic Republic of the Congo."
              link="/malaika"
            />
            <Card
              className=""
              img="/projects/img-mighty-under-dogs.jpg"
              title="Mighty Under Dog"
              description="Lead by Timmy Hazelip and dedicated team of surfers who understand and share the healing powers of ocean therapy. Breeding confidence, one wave at a time."
              link="/mighty-under-dogs"
            />
          </div>
        </div>
      </section>
      <section className="itemsSection Section">
        <div className="smallContainer flex flex-col items-center gap-10 Section2-line">
          <h2 className="mt-20 md:mt-80">What is a DAO?</h2>
          <p>
            Cecil the Lion DAO is completely decentralised autonomous
            organisation. It's the first of its kind where any decisions about
            supported projects and related actions are governed by all of its
            members in a decentralised manner.
          </p>
          <a
            href="https://cecil-dao.gitbook.io/"
            target="_blank"
            className="button mb-20"
          >
            Read whitepaper
          </a>
        </div>
      </section>
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
          <Link className="flex gap-4" to="/sns">
            DISCOVER MORE <img src="/linkArrow.svg" alt="" />
          </Link>
        </div>
        <div
          className="bg-white rounded-lg h-full flex flex-col gap-8 items-center Section"
          style={{ padding: "75px 40px" }}
        >
          <img src="/ic.svg" alt="" />
          <h4>ICP Nodes</h4>
          <p>
            The DAO receives funding from actively running ICP blockchain nodes
            whose earnings are going 100% to the projects within the DAO.
          </p>
          <Link className="flex gap-4" to="/icp-neurons">
            DISCOVER MORE <img src="/linkArrow.svg" alt="" />
          </Link>
        </div>
        <div
          className="bg-white rounded-lg h-full flex flex-col gap-8 items-center Section"
          style={{ padding: "75px 40px" }}
        >
          <img src="/ic.svg" alt="" />
          <h4>ORIGYN neuron</h4>
          <p>
            The DAO has received a generous donation of 300 million OGY from the
            ORIGYN Foundation whose rewards are going 100% to fund projects
            within the DAO.
          </p>
          <Link className="flex gap-4" to="/neuron">
            DISCOVER MORE <img src="/linkArrow.svg" alt="" />
          </Link>
        </div>
      </section>

      <footer
        className="bg-white rounded-lg flex items-center mt-20"
        style={{ justifyContent: "space-between", padding: "16px 32px" }}
      >
        <p>©2025 CecilDAO</p>
        <div className="flex gap-4">
          <img src="/xIcon.svg" alt="" />
          <img src="/instIcon.svg" alt="" />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
