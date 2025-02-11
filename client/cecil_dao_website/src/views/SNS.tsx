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
      document.getElementById("progressBar").style.height = scrolled + "%";
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div style={{ textAlign: "center" }}>
          <img src="/brand-origyn.png" alt="" style={{ height: 32 }} />
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
            <div className="progress-section" style={{ top: "10%" }} />
            <div className="progress-section" style={{ top: "70%" }} />
            <div className="progress-bar" id="progressBar" />
          </div>

          <img
            src="/secondLion.png"
            alt=""
            style={{ margin: "40px auto", maxHeight: "60vh" }}
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
              This decentralized autonomous organization (DAO) is dedicated to
              using blockchain technology to drive positive change. Our
              platform, built on the Internet Computer Protocol (ICP) and
              governed by the decentralized governance of a Service Nervous
              System (SNS), empowers a global community to collaborate, donate,
              and track the impact of humanitarian aid efforts. Together, we can
              build a more compassionate and equitable world.
            </p>
            <a
              className="button"
              href="https://nns.ic0.app/launchpad/"
              target="_blank"
              style={{ width: "100%" }}
            >
              Participate in the SNS sale and join the movement!
            </a>
            <h2>Why a DAO?</h2>
            <h3>No boss, no central authority.</h3>
            <p>
              To understand how a DAO works, it's important to understand the
              philosophy of a decentralized organization. You'll see why we've
              chosen to support humanitarian projects through the creation of
              DAOs.
            </p>
            <p>D.A.O. = Decentralized Autonomous Organization</p>
            <h4>Decentralization</h4>
            <p>
              Decentralized in a DAO, there is no central point of control (no
              higher banking authority, no government) powers are distributed
              among all members (voters) and decisions are made on the basis of
              a consensus approach.
            </p>
            <h4>Autonomous</h4>
            <p>
              DAO governance is encoded in a computer program that automatically
              performs coordination and governance functions.
            </p>
            <h4>Organization</h4>
            <p>
              DAOs are a new way of coordinating people. They represent an
              alternative to traditional forms of organization such as
              companies, foundations or associations governed by management.
              With a DAO, every investor has the power to vote, and thus the
              power of shared governance.
            </p>
            <h3>How does it work?</h3>
            <p>
              The main aim of a DAO is to create a transparent, secure and open
              system that enables participants to collectively manage and govern
              organizations without depending on a central authority or
              intermediaries. DAOs aim to eliminate the need for traditional
              hierarchical structures and distribute power and decision-making
              among participants. Through the Cecil The Lion DAO, we invite you
              to make a donation to support the P.A.L. association, which is
              working on the ground to save South Africa's lions, and then to
              invite the whole community to vote for the animal and
              environmental protection projects that matter most to YOU.
            </p>
            <p>The more of us there are, the greater our power to save!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SNS;
