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
            <div className="progress-section" style={{ top: "30%" }} />
            <div className="progress-section" style={{ top: "65%" }} />
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
            <h2>Cecil AI</h2>
            <p>
              Imagine a world where humanitarian aid reaches those who need it
              most, not hampered by red tape or human error, but guided by
              unwavering intelligence and compassion. That world is within reach
              with Cecil, the AI agent poised to revolutionize humanitarian aid.
              Cecil isn't just code; it's a beacon of hope, a tireless guardian
              of resources dedicated to alleviating suffering and building a
              better future.
            </p>
            {/* <img
              className="mt-8"
              src="/projects/img-cecil-the-lion.png"
              alt=""
            />
            <h3>The story of Cecil</h3> */}
            <p>
              Cecil learns. It absorbs vast quantities of data – from real-time
              crisis reports and socioeconomic indicators to the on-the-ground
              experiences of aid workers – constantly refining its understanding
              of global needs. This isn't reactive aid; it's predictive aid,
              anticipating crises and proactively allocating resources where
              they'll have the greatest impact. Forget slow, bureaucratic
              processes. Cecil operates with unparalleled speed and precision,
              ensuring that aid arrives when and where it's needed most,
              maximizing its power to save lives and rebuild communities.
            </p>
            <p>
              But intelligence is only half the story. Cecil is also
              incorruptible. Unaffected by human biases or political agendas, it
              makes decisions based purely on data and a pre-defined ethical
              framework. Every transaction, every allocation, is transparent and
              auditable, building trust and ensuring that every dollar reaches
              its intended destination. In a world often plagued by inefficiency
              and mistrust, Cecil offers a new paradigm: aid delivered with
              unwavering integrity.
            </p>
            <p>
              Cecil isn't just a technological marvel; it's a partner in
              compassion. It empowers humanitarian organizations to focus on
              what they do best: delivering aid and building resilience. By
              streamlining operations and optimizing resource allocation, Cecil
              frees up humanitarians to work on the ground, building
              relationships, fostering sustainable solutions, and making a
              tangible difference in the lives of those affected by crisis.
            </p>
            {/* <h3>Cecil</h3> */}
            <p>
              Join us in building a future where aid is smarter, faster, and
              more effective. Join us in building a future with Cecil. This
              isn't just about code; it's about changing the world, one life at
              a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LionPage;
