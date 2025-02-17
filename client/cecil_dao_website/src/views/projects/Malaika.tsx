import { Link } from "react-router-dom";
import "../../index.scss";
import Menu from "@components/Menu/Menu";
import { useEffect } from "react";

// TODO add external links and improve content display

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
            src="/logo-cecil-dao.png"
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
            {/* <div className="progress-section" style={{ top: "30%" }} /> */}
            <div className="progress-section" style={{ top: "100%" }} />
            <div className="progress-bar" id="progressBar" />
          </div>

          {/* <img
            src="/projects/img-cecil-the-lion-vector.png"
            alt=""
            style={{ margin: "40px auto", maxHeight: "60vh" }}
          />
          <br />
          <div className="daoButton">
            <img src="/votingIcon.svg" alt="" />{" "}
            <span>
              <b>DAO Voting</b> – Coming Soon
            </span>
          </div> */}
        </div>
        <div className="bg-white rounded-lg my-8 md:my-[-18px] md:rounded-none">
          <div className="flex justify-end p-8">
            <Menu />
          </div>
          <div className="flex flex-col gap-10 items-center article">
            <h2>Malaika</h2>
            <p>
              In 2007, Noëlla Coursaris founded Malaika, a grassroots nonprofit
              that educates and empowers girls and their communities. The
              foundation operates in Kalebuka, a village 45 minutes away from
              Noëlla's hometown of Lubumbashi in the Democratic Republic of the
              Congo.
            </p>
            <img
              className="mt-8 max-w-md rounded-xl"
              src="/projects/img-malaika.png"
              alt=""
            />
            {/* <h3>The story of Cecil</h3> */}
            <p>
              Malaika has five components: an accredited school; a community
              center; technical programs in collaboration with Caterpillar
              Foundation, training young adults on real equipment as mechanics,
              electricians, carpenters and dwellers; a clean water program with
              the building and refurbishment of 31 wells; and an agriculture
              program. Malaika is an ecosystem and a community-driven model that
              can be duplicated anywhere in the world.
            </p>
            <a
              href="https://malaika.org/"
              target="_blank"
              rel="noreferrer"
              className="button w-full"
            >
              Visit Malaika
            </a>
            <div className="mt-8 container-iframe">
              <iframe
                className="responsive-iframe"
                src="https://www.youtube.com/embed/h_hnv1zpfZc?si=gQBmc7jKrWyKJoLH"
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
