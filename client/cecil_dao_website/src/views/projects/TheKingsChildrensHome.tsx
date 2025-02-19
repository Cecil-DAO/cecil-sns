import { Link } from "react-router-dom";
import "../../index.scss";
import Menu from "@components/Menu/Menu";
import { useEffect } from "react";

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

          {/* <img
            src="/projects/img-cecil-the-lion-vector.png"
            alt=""
            style={{ margin: "40px auto", maxHeight: "60vh" }}
          /> */}
        </div>
        <div className="bg-white rounded-lg my-8 md:my-[-18px] md:rounded-none">
          <div className="flex justify-end p-8">
            <Menu />
          </div>
          <div className="flex flex-col gap-10 items-center article">
            <h2>The Kings Childrens Home</h2>
            <p>
              The King Childrens Home is a safe house for babies and young
              children that have been abandoned or abused. It is a non-profit
              organization based in the Eastern Cape, South Africa. In October
              of 2008, a baby was abandoned in the bushes near the home of Tracy
              and Jonathan King just outside East London. Police asked if the
              Kings could take the baby in for a few days while the case was
              investigated. The Kings run a local church in the area and their
              home is known as a safe house in the community. Their lives were
              so positively impacted through taking in this baby that they
              started researching and found out that there are many more
              children in the same situation. Out of their own home, they
              started the King’s Children’s Home to provide other options for
              mothers who cannot care for their children.
            </p>
            <img
              className="mt-8 max-w-md rounded-xl"
              src="/projects/img-kings-childrens-home.avif"
              alt=""
            />
            <div className="mt-8 container-iframe">
              <iframe
                className="responsive-iframe"
                src="https://www.youtube.com/embed/iUEHsJYQ1Nc?si=9uWi0i1oq2iYJ8Mu"
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
