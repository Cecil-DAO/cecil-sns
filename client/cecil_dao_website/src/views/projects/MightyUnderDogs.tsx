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

          {/* <div className="progress-container">
            <div className="progress-section" />
            <div className="progress-section" style={{ top: "30%" }} />
            <div className="progress-section" style={{ top: "65%" }} />
            <div className="progress-bar" id="progressBar" />
          </div> */}

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
            <h2>Mighty Under Dogs</h2>
            <p>
              Lead by <b>Timmy Hazelip</b> and dedicated team of surfers who
              understand and share the healing powers of ocean therapy. Breeding
              confidence, one wave at a time.
            </p>
            <img
              className="mt-8 max-w-[200px]"
              src="/projects/logo-mighty-under-dogs.png"
              alt=""
            />
            {/* <h3>The story of Cecil</h3> */}
            <p>
              His father was a huge influence on his life, directing Timmy to
              always look out for the underdog, which has bled into his
              foundation The Malibu Underdogs. This organization is a group of
              Malibu legends, including big names like Allen Sarlo, that donate
              their time to teach children with special needs to surf. These
              respectable locals take pride in their home break and bring their
              soul and style to this unique charity, focusing on creating
              memories and instilling happiness through surfing, things that
              money can’t buy.
            </p>
            <a
              href="https://www.malibu.org/list/member/mighty-under-dogs-3088"
              target="_blank"
              rel="noreferrer"
              className="button w-full"
            >
              Visit Mighty Under Dogs
            </a>
            <div className="mt-8 container-iframe">
              <iframe
                className="responsive-iframe"
                src="https://www.youtube.com/embed/7HrSC0KXOkw?si=H-j0HDsXS-QYxfP6"
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
