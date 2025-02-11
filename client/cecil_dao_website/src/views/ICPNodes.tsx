import { Link } from "react-router-dom";
import "../index.scss";
import Menu from "@components/Menu/Menu";
import { useEffect } from "react";

export const ICPNodesPage = () => {
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
            <div className="progress-section" style={{ top: "20%" }} />
            <div className="progress-section" style={{ top: "40%" }} />
            <div className="progress-section" style={{ top: "70%" }} />
            <div className="progress-bar" id="progressBar" />
          </div>

          <img
            src="/icp_logo_image.png"
            alt=""
            style={{ margin: "15vh auto", maxHeight: "60vh" }}
          />
          <br />
        </div>
        <div className="bg-white rounded-lg my-8 md:my-[-18px] md:rounded-none">
          <div className="flex justify-end p-8">
            <Menu />
          </div>
          <div className="flex flex-col gap-10 items-center article">
            <h2>ICP nodes</h2>
            <p>
              Cecil the Lion DAO is utilising the Internet Computer Protocol
              (ICP) blockchain. This blockchain is powered by a network of
              independent node providers. The Cecil the Lion DAO is operating
              nodes for the ICP blockchain via the{" "}
              <a
                href="https://defoundation.ch"
                target="_blank"
                rel="noreferrer"
                className="text-[#555cf8] hover:underline"
              >
                <b>Decentralised Entities Foundation</b>
              </a>
            </p>
            <img className="mt-8" src="/NodesMap.png" alt="" />
            <h3>Why ICP and Why Nodes?</h3>
            <p>
              The Internet Computer is a revolutionary blockchain platform that
              enables developers to build and deploy truly decentralized
              applications. By running ICP nodes, we're helping to secure the
              network, process transactions, and ensure the smooth operation of
              dApps.
            </p>
            <h3>How Does This Benefit Our Cause?</h3>
            <p>
              <b>Sustainable Funding:</b> As a node provider, we earn rewards in
              ICP tokens. The earnings of these rewards is directly allocated to
              our charitable initiatives, providing a sustainable source of
              funding.
            </p>
            <p>
              <b>Technological Innovation:</b> By being involved in cutting-edge
              blockchain technology, we gain valuable insights and expertise
              that can be applied to our charitable projects.
            </p>
            <p>
              <b>Community Impact:</b> We're part of a global community of
              developers and enthusiasts working towards a decentralized future.
              This network allows us to collaborate, share knowledge, and
              amplify our impact.
            </p>
            <h3>Join Us in Building a Better Future</h3>
            <p>
              Whether you're a tech-savvy individual, a philanthropist, or
              simply someone who cares about the future of the internet, you can
              contribute to our mission. By supporting our DAO, you're not just
              making a donation; you're becoming an active participant in
              shaping a more decentralized, equitable, and sustainable digital
              world.
            </p>
            <a
              href="https://nns.ic0.app/launchpad/"
              target="_blank"
              className="button"
              style={{ width: "100%" }}
            >
              Join the Cecil the Lion DAO by becoming a neuron owner!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICPNodesPage;
