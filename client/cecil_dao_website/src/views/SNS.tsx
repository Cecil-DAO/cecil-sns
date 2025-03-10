import { Link } from "react-router-dom";
import "../index.scss";
import Menu from "@components/Menu/Menu";
import { useEffect } from "react";

const SNS = () => {
  useEffect(() => {
    window.onscroll = function () {
      myFunction();
    };

    function myFunction() {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById("progressBar");
      if (progressBar) {
        progressBar.style.height = scrolled + "%";
      }
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div style={{ textAlign: "center" }}>
          <img
            src="/projects/logo-cecil-ai.png"
            alt="Logo Cecil DAO"
            className="h-[48px]"
          />
          <Link to="/" className="backButton flex gap-4 mt-4">
            <img
              width={8}
              height={8}
              src="/arrow-left.svg"
              alt=""
              style={{ height: 32 }}
            />{" "}
            back to homepage
          </Link>
          <div className="progress-container">
            <div className="progress-section" />
            <div className="progress-section" style={{ top: "100%" }} />
            <div className="progress-bar" id="progressBar" />
          </div>

          <img
            src="/projects/img-cecil-the-lion-standing.png"
            alt=""
            style={{ margin: "40px auto", maxHeight: "40vh" }}
          />
          <br />
        </div>
        <div className="bg-white rounded-lg my-8 md:my-[-18px] md:rounded-none">
          <div className="flex justify-end p-8">
            <Menu />
          </div>
          <div className="flex flex-col gap-10 items-center article">
            <h2>SNS</h2>
            <p>
              The Service Nervous System (SNS) is a framework on the Internet
              Computer Protocol (ICP) blockchain that streamlines the creation
              and governance of Decentralized Autonomous Organizations (DAOs).
              It enables a smooth transition of control from initial developers
              to a community-driven model, where token holders collectively
              manage the project's future. This is achieved through a structured
              system of proposals and voting, ensuring that decisions are made
              transparently and democratically.
            </p>
            <p>
              This framework is particularly well-suited for running
              humanitarian DAOs. The ability to establish a transparent and
              auditable governance structure is crucial for organizations
              focused on social impact. By leveraging the SNS, humanitarian DAOs
              can ensure that funds and resources are allocated according to the
              community's consensus, minimizing the risk of corruption and
              maximizing accountability. The immutability of the blockchain
              provides a secure and reliable record of all transactions and
              decisions, building trust among donors and beneficiaries.
            </p>
            <p>
              Furthermore, the decentralized nature of the SNS fosters
              resilience and inclusivity, vital for humanitarian efforts. It
              eliminates single points of failure and empowers communities to
              participate in decision-making, ensuring that aid reaches those
              who need it most effectively. The framework's ability to
              facilitate decentralized fundraising and resource distribution
              makes it an ideal tool for organizations seeking to address global
              challenges in a transparent, non-corruptible, and resilient
              manner.
            </p>
            <a
              className="button"
              href="https://nns.ic0.app/project/?project=ju4gz-6iaaa-aaaaq-aaeva-cai"
              target="_blank"
              style={{ width: "100%" }}
            >
              Participate in the SNS sale and join the movement!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SNS;
