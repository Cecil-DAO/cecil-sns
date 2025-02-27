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
          />
          <br /> */}
          {/* <div className="daoButton">
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
            <h2>Akashingas</h2>
            <p>
              A lion will fight for life and the pack he belongs to and will go
              to death in a loyal combat, but Cecil did not have that chance,
              today his spirit can be find among the Akashingas ("the brave")
              women rangers in Zimbabwe, who dedicate their lives to defending
              nature reserves against poaching activities.
            </p>
            <a
              href="https://www.akashinga.org/"
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              Visit akashinga.org
            </a>
            <p>
              These women, who often come from difficult backgrounds, have
              become an example for local communities. Their determination and
              many successes have made them local heroes. Cecil DAO will use 50%
              of the SNS donation to this organization, the 50% remaining will
              go as an endowment to CECIL AI, with 10% of the annual profits
              going to the Akashinga.org, the anti-poaching association, to
              enable them to continue their actions in defense of Zimbabwe's
              wildlife reserves.
            </p>
            <img className="mt-8" src="/projects/img-akashingas.png" alt="" />
            <p>
              The remaining amount will be distributed to other causes CECIL DAO
              wants to support.{" "}
            </p>
            {/* <h3>The story of Cecil</h3>
            <p>
              He was one of the most magnificent creatures in the world:
              majestic, superb, and moved with the grace of a master. Evoking
              the iconic Abyssinian lion of Ethiopia, it was, among other
              things, the splendid black mane of Cecil, the number one
              attraction in the vast Hwange National Park, that made his fame.
            </p>
            <p>
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
