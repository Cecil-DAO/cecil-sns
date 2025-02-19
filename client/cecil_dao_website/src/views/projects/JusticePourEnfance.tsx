import { Link } from "react-router-dom";
import "../../index.scss";
import Menu from "@components/Menu/Menu";
import { useEffect } from "react";

// TODO add external links, add video yt and improve content display

export const LionPage = () => {
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
            className="rounded-xl"
            src="/projects/logo-justice-pour-enfance.svg"
            alt="Logo Justice pour l'enfance"
            style={{ margin: "40px auto", maxHeight: "10vh" }}
          />
        </div>
        <div className="bg-white rounded-lg my-8 md:my-[-18px] md:rounded-none">
          <div className="flex justify-end p-8">
            <Menu />
          </div>
          <div className="flex flex-col gap-10 items-center article">
            <h2>Justice pour L'enfance</h2>
            <p>
              Under the leadership of activist journalist Karl Zero and a board
              of 40 lawyers, Justice for Children was born. This non-profit
              association brings together a collective of lawyers specializing
              in the defense of children, present throughout France.
            </p>
            {/* <img
              className="mt-4 max-w-xs rounded-xl"
              src="/projects/logo-justice-pour-enfance.svg"
              alt=""
            /> */}
            {/* <h3>The story of Cecil</h3> */}
            <p>
              We have set ourselves the mission of providing legal assistance to
              all children. Because it's time for the shame to change sides.
            </p>
            <a
              href="https://www.justicepourlenfance.org/"
              target="_blank"
              rel="noreferrer"
              className="button w-full"
            >
              Visit Justice pour l'enfance
            </a>
            <div className="mt-8 container-iframe">
              <iframe
                className="responsive-iframe"
                src="https://www.youtube.com/embed/eHCZZvq4i1M?si=UdUW5OHtG1QS2MmB"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LionPage;
