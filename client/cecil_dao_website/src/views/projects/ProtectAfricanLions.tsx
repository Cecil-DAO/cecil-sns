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
          /> */}
        </div>
        <div className="bg-white rounded-lg my-8 md:my-[-18px] md:rounded-none">
          <div className="flex justify-end p-8">
            <Menu />
          </div>
          <div className="flex flex-col gap-10 items-center article">
            <h2>Protecting African Lions</h2>
            <p>
              P.A.L is a non- profit organization whose mission is to ultimately
              get protection status for the African Lion. We raise awareness
              through developing working relationships of mutual support with
              other organizations who share our goals. By contributing to the
              protection of the world’s most majestic animal, you are connected
              to the imperial symbol of courage, spirit and the awesome power of
              Mother Nature. This is an expression of your purity of spirit and
              togetherness with all living things.
            </p>
            <img
              className="mt-8 max-w-xs"
              src="/projects/logo-pal.png"
              alt=""
            />
            {/* <h3>The story of Cecil</h3> */}
            <p>
              The Cecil DAO supports the{" "}
              <a
                href="https://protectingafricanlions.org/mission"
                target="_blank"
                rel="noreferrer"
                className="text-[#73B655] hover:underline font-bold"
              >
                P.A.L. Foundation
              </a>{" "}
              and shares the values and urgency of helping the "royal" species
              of the jungle. The P.A.L. Foundation is fighting to save the lions
              of South Africa.
            </p>
            <p>
              This project is in line with the mission set out by the famous
              painter{" "}
              <a
                href="https://conormccreedy.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[#73B655] hover:underline font-bold"
              >
                Conor Mccreedy
              </a>{" "}
              for the preservation and enhancement of the animal kingdom.
            </p>
            <p>
              For DAO Cecil, it's important to work with and support
              associations we know and trust 100%. We know that the members of
              the P.A.L. association are present in the field, we know their
              work, their involvement and their needs, enabling us to continue
              to work as they do. It's a difficult job, sometimes fraught with
              pitfalls and long, but nature in all its grandeur deserves that,
              in one way or another, we show solidarity in order to preserve it.
              When our hearts vibrate for a cause, it becomes essential to share
              that vibration with as many people as possible.
            </p>

            <p>
              Join the organization and help preserve the African lion
              Preserving the African lion is vital to our planet's wild heritage
              and ecosystem balance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LionPage;
