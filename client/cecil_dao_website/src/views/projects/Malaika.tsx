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
            {/* <p>
              Cecil was beloved by the 50,000 tourists who visit Hwange each
              year. This 13-year-old male lion was the father of a dozen cubs,
              all born in the park, the largest wildlife reserve in the country.
            </p>
            <p>
              He was the most confident lion you could find; he knew he was the
              biggest, explained one of his advocates to the British newspaper
              Telegraph.
            </p>
            <h3>Cecil</h3>
            <p>
              Cecil, the icon of Hwange National Park in Zimbabwe, was
              ruthlessly killed in 2015 for the simple act of hunting. In
              Zimbabwe, most lions, including one of Cecil's offspring, have
              been hunted for their trophies, a fact confirmed by a study from a
              researcher at the University of Oxford published in the Journal of
              Applied Ecology： 88% of male lions and 67% of females found dead
              between 1999 and 2012 in Hwange National Park (western Zimbabwe)
              fell victim to human activities.
            </p>
            <p>
              The death of the famous lion Cecil, killed by an American dentist
              outside Hwange National Park, sparked a global controversy,
              leading Zimbabwe to tighten restrictions on big-game hunting.
              However, even though this death raised awareness, it had a far too
              limited impact on the new hunting regulations.
            </p>
            <p>
              Listing lions as endangered species and implementing restrictions
              in some states are steps forward, but trophy hunting remains legal
              in many countries, requiring constant efforts to protect wildlife
              more than ever.
            </p>
            <p>
              <b>Efforts that we support through the P.A.L. association.</b>
            </p>
            <div className="button" style={{ width: "100%" }}>
              Learn more about the P.A.L. association
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LionPage;
