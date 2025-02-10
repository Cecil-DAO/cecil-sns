import PlanetModel from "@components/3dModels/PlanetModel";
import Card from "@components/Card/Card";
import gsap from "gsap";
import "../index.scss";
import Menu from "@components/Menu/Menu";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

export const LandingPage = () => {
  const secondSection = () => {
    gsap.fromTo(
      ".Section",
      {
        autoAlpha: 0,
        scale: 0.75,
        ease: "none",
        duration: 0.6,
        scrollTrigger: {
          trigger: ".Section",
          start: "top top",
          end: "+=100",
          scrub: 0.5,
        },
      },
      {
        autoAlpha: 1,
        scale: 1,
        ease: "none",
        duration: 0.6,
        scrollTrigger: {
          trigger: ".Section",
          start: "top top",
          end: "+=100",
          scrub: 0.5,
        },
      }
    );
  };

  useEffect(() => {
    if (!isMobile) {
      secondSection();
    }
  }, []);

  return (
    <>
      <header
        className="flex"
        style={{ justifyContent: "space-between", padding: "16px" }}
      >
        <img src="/logo2.png" alt="" style={{ height: 32 }} />
        <img
          className="hidden md:block"
          src="/TheGoodDAO.svg"
          alt=""
          style={{
            height: 32,
            width: 147,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Menu />
      </header>
      <section className="planetSection">
        <div className="backgroundText">
          Cecil the
          <br />
          Lion DAO
        </div>
        <PlanetModel />
      </section>
      <section className="itemsSection Section">
        <div className="smallContainer Section1-line">
          <h2 className="mt-40">Cecil the lion DAO</h2>
          <p className="mt-10 mb-20">
            There is a world in which the material and the virtual blend. In
            Hybrid Galaxies, perceptions and experiences are transformed.
            Creativity becomes limitless and dreams may come true.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-20 md:gap-80">
            <Card
              className="Section1-card1"
              img="/lionPhoto.png"
              title="Cecil the lion DAO"
              description="There is a world in which the material and the virtual blend. In Hybrid Galaxies, perceptions and experiences are transformed. Creativity becomes limitless and dreams may come true."
              link="/lion"
            />
            <Card
              className="Section1-card3"
              img="/lionPhoto.png"
              title="Cecil the lion DAO"
              description="There is a world in which the material and the virtual blend. In Hybrid Galaxies, perceptions and experiences are transformed. Creativity becomes limitless and dreams may come true."
              link="/lion"
            />
          </div>
          <div className="flex flex-col gap-20 md:gap-80 mt-16 md:mt-80">
            <Card
              className="Section1-card2"
              img="/lionPhoto.png"
              title="Cecil the lion DAO"
              description="There is a world in which the material and the virtual blend. In Hybrid Galaxies, perceptions and experiences are transformed. Creativity becomes limitless and dreams may come true."
              link="/lion"
            />
            <Card
              className="Section1-card4"
              img="/lionPhoto.png"
              title="Cecil the lion DAO"
              description="There is a world in which the material and the virtual blend. In Hybrid Galaxies, perceptions and experiences are transformed. Creativity becomes limitless and dreams may come true."
              link="/lion"
            />
          </div>
        </div>
      </section>
      <section className="itemsSection Section">
        <div className="smallContainer flex flex-col items-center gap-10 Section2-line">
          <h2 className="mt-20 md:mt-80">What is a DAO?</h2>
          <p>
            There is a world in which the material and the virtual blend. In
            Hybrid Galaxies, perceptions and experiences are transformed.
            Creativity becomes limitless and dreams may come true.
          </p>
          <a href="#" className="button mb-20">
            Read whitepaper
          </a>
        </div>
      </section>
      <section className="discoverSection grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div
          className="bg-white rounded-lg flex flex-col gap-8 items-center Section"
          style={{ padding: "75px 40px" }}
        >
          <img src="/ic.svg" alt="" />
          <h4>SNS</h4>
          <p>
            There is a world in which the material and the virtual blend. In
            Hybrid Galaxies.
          </p>
          <a className="flex gap-4" href="#">
            DISCOVER MORE <img src="/linkArrow.svg" alt="" />
          </a>
        </div>
        <div
          className="bg-white rounded-lg flex flex-col gap-8 items-center Section"
          style={{ padding: "75px 40px" }}
        >
          <img src="/ic.svg" alt="" />
          <h4>DFINITY Nods</h4>
          <p>
            There is a world in which the material and the virtual blend. In
            Hybrid Galaxies.
          </p>
          <a className="flex gap-4" href="#">
            DISCOVER MORE <img src="/linkArrow.svg" alt="" />
          </a>
        </div>
        <div
          className="bg-white rounded-lg flex flex-col gap-8 items-center Section"
          style={{ padding: "75px 40px" }}
        >
          <img src="/ic.svg" alt="" />
          <h4>ORIGYN neuron</h4>
          <p>
            There is a world in which the material and the virtual blend. In
            Hybrid Galaxies.
          </p>
          <a className="flex gap-4" href="#">
            DISCOVER MORE <img src="/linkArrow.svg" alt="" />
          </a>
        </div>
      </section>
      <footer
        className="bg-white rounded-lg flex items-center mt-20"
        style={{ justifyContent: "space-between", padding: "16px 32px" }}
      >
        <p>©2024 Cecil the lion dao</p>
        <div className="flex gap-4">
          <img src="/xIcon.svg" alt="" />
          <img src="/instIcon.svg" alt="" />
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
