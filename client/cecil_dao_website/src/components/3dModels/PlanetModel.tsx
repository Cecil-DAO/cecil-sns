import { useEffect, useRef, useState } from "react";
import {
  Color4,
  DirectionalLight,
  HDRCubeTexture,
  SceneLoader,
  Vector3,
  Scene,
  ArcRotateCamera,
  Animation,
  CubicEase,
  EasingFunction,
  AbstractMesh,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import SceneComponent from "babylonjs-hook";
import { Link } from "react-router-dom";

import "./index.scss";

ArcRotateCamera.prototype.spinTo = function (
  targetProperty: string,
  to: number
) {
  const ease = new CubicEase();
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  Animation.CreateAndStartAnimation(
    "anim",
    this,
    targetProperty,
    120,
    120,
    this[targetProperty],
    to,
    0,
    ease
  );
};

interface Position {
  alpha: number;
  beta: number;
}

const handleOnClickBtnSpot = (camera: ArcRotateCamera, pos: Position) => {
  camera.spinTo("alpha", pos.alpha);
  camera.spinTo("beta", pos.beta);
};

const PlanetModel = () => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [, setProgress] = useState(0);

  const loader = useRef<HTMLDivElement>(null);
  const btnCecilTheLion = useRef<HTMLDivElement>(null);
  const btnJusticeEnfance = useRef<HTMLDivElement>(null);
  const btnMightyUnderDogs = useRef<HTMLDivElement>(null);
  const btnAkashingas = useRef<HTMLDivElement>(null);
  const btnPAL = useRef<HTMLDivElement>(null);
  const btnMalaika = useRef<HTMLDivElement>(null);
  const btnKingsChildrensHome = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const matchCatch = () => {
      caches.open("my-cache").then((cache) => {
        const request = new Request("globe.glb", { method: "GET" });
        cache.match(request).then((response) => {
          if (response) {
            response.blob().then((data) => {
              const newUrl = URL.createObjectURL(data);
              setUrl(newUrl);
              setLoading(false);
            });
          } else {
            init();
          }
        });
      });
    };
    matchCatch();
  }, []);

  const init = () => {
    const url = "globe.glb";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const arrayBuffer = xhr.response;
        const blob = new Blob([arrayBuffer], {
          type: "application/octet-stream",
        });

        // console.log("blob", arrayBuffer, blob);
        caches.open("my-cache").then((cache) => {
          cache.put(url, new Response(blob));
        });

        const newUrl = URL.createObjectURL(blob);
        setUrl(newUrl);
        setLoading(false);
      } else {
        console.error("Failed to load glb file:", xhr.status);
      }
    });

    xhr.send();
  };

  const onSceneReady = async (scene: Scene) => {
    scene.createDefaultCamera(true, true, true);
    scene.clearColor = new Color4(0, 0, 0, 0);
    SceneLoader.ShowLoadingScreen = false;

    const modelRes = url;
    const env = new HDRCubeTexture("globe-env.hdr", scene, 128);
    const engine = scene.getEngine();
    const canvas = document.getElementById("globe-canvas") as HTMLElement;
    if (loader.current === null) return null;
    loader.current.style.visibility = "visible";

    SceneLoader.Append(
      "",
      modelRes,
      scene,
      (meshes) => {
        if (!scene.activeCamera) return null;
        if (btnCecilTheLion.current === null) return null;
        if (btnJusticeEnfance.current === null) return null;
        if (btnMightyUnderDogs.current === null) return null;
        if (btnAkashingas.current === null) return null;
        if (btnKingsChildrensHome.current === null) return null;
        if (btnPAL.current === null) return null;
        if (btnMalaika.current === null) return null;
        if (loader.current === null) return null;

        const camera = scene.activeCamera;
        (camera as ArcRotateCamera).noRotationConstraint = true;
        (camera as ArcRotateCamera).upperBetaLimit = 360;
        (camera as ArcRotateCamera).lowerBetaLimit = -360;

        camera.inputs.removeByType("ArcRotateCameraMouseWheelInput");

        btnCecilTheLion.current.style.visibility = "visible";
        btnJusticeEnfance.current.style.visibility = "visible";
        btnMightyUnderDogs.current.style.visibility = "visible";
        btnAkashingas.current.style.visibility = "visible";
        btnKingsChildrensHome.current.style.visibility = "visible";
        btnPAL.current.style.visibility = "visible";
        btnMalaika.current.style.visibility = "visible";
        loader.current.style.visibility = "hidden";

        scene.environmentTexture = env;
        const light = new DirectionalLight(
          "DirectionalLight",
          new Vector3(3, -1, -2),
          scene
        );
        light.intensity = 10;

        let lion: AbstractMesh | null = null;
        let horse: AbstractMesh | null = null;
        let akashingas: AbstractMesh | null = null;
        let southAfrica: AbstractMesh | null = null;
        let newyork: AbstractMesh | null = null;

        meshes.meshes.forEach((item) => {
          // console.log(item.name);
          if (item.name === "Object_7") {
            (camera as ArcRotateCamera).radius = 60;
            (camera as ArcRotateCamera).alpha = Math.PI / 2;
            // (camera as ArcRotateCamera).target =
            //   root.getBoundingInfo().boundingBox.centerWorld;
          }
          if (item.name === "Box001_primitive0") lion = item as AbstractMesh;
          if (item.name === "actor:Horse") horse = item as AbstractMesh;
          if (item.name === "Object007.005_primitive0")
            akashingas = item as AbstractMesh;
          if (item.name === "Object010.003_primitive0")
            southAfrica = item as AbstractMesh;
          if (item.name === "tree-baobab_orange.003_primitive0") {
            newyork = item as AbstractMesh;
          }
        });

        setInterval(() => {
          scene.animationGroups[0]?.stop();
          scene.animationGroups[0]?.play();
        }, 11500);

        btnCecilTheLion.current.onclick = () =>
          handleOnClickBtnSpot(camera as ArcRotateCamera, {
            alpha: Math.PI / 2,
            beta: Math.PI / 2,
          });

        btnJusticeEnfance.current.onclick = () =>
          handleOnClickBtnSpot(camera as ArcRotateCamera, {
            alpha: -0.015413157082574928,
            beta: -0.25743827419491183,
          });

        btnMightyUnderDogs.current.onclick = () =>
          handleOnClickBtnSpot(camera as ArcRotateCamera, {
            alpha: 0.99,
            beta: -1.81,
          });

        btnAkashingas.current.onclick = () =>
          handleOnClickBtnSpot(camera as ArcRotateCamera, {
            alpha: 0.29,
            beta: 0.34,
          });

        btnPAL.current.onclick = () =>
          handleOnClickBtnSpot(camera as ArcRotateCamera, {
            alpha: 0.29,
            beta: 0.34,
          });

        btnMalaika.current.onclick = () =>
          handleOnClickBtnSpot(camera as ArcRotateCamera, {
            alpha: 0.78,
            beta: -1.11,
          });

        btnKingsChildrensHome.current.onclick = () =>
          handleOnClickBtnSpot(camera as ArcRotateCamera, {
            alpha: 0.39,
            beta: 1.19,
          });

        scene.registerBeforeRender(() => {
          // console.log((camera as ArcRotateCamera).position);
          // console.log(camera.alpha, camera.beta);

          if (lion === null) return null;
          if (horse === null) return null;
          if (akashingas === null) return null;
          if (southAfrica === null) return null;
          if (newyork === null) return null;

          const scale = window.devicePixelRatio;
          const initscale =
            scale === 1 ? 2 : scale === 2 ? 1 : scale === 3 ? 2 / 3 : 1;

          [
            [
              btnCecilTheLion,
              Vector3.Project(
                new Vector3(-1, 5, 8),
                lion.getWorldMatrix(),
                scene.getTransformMatrix(),
                camera.viewport.toGlobal(
                  engine.getRenderWidth(true),
                  engine.getRenderHeight(true)
                )
              ),
            ],
            [
              btnJusticeEnfance,
              Vector3.Project(
                new Vector3(10, 0, 0),
                lion.getWorldMatrix(),
                scene.getTransformMatrix(),
                camera.viewport.toGlobal(
                  engine.getRenderWidth(true),
                  engine.getRenderHeight(true)
                )
              ),
            ],
            [
              btnMightyUnderDogs,
              Vector3.Project(
                new Vector3(-150, 0, -120),
                horse.getWorldMatrix(),
                scene.getTransformMatrix(),
                camera.viewport.toGlobal(
                  engine.getRenderWidth(true),
                  engine.getRenderHeight(true)
                )
              ),
            ],
            [
              btnAkashingas,
              Vector3.Project(
                new Vector3(0, 0, 0),
                akashingas.getWorldMatrix(),
                scene.getTransformMatrix(),
                camera.viewport.toGlobal(
                  engine.getRenderWidth(true),
                  engine.getRenderHeight(true)
                )
              ),
            ],
            [
              btnPAL,
              Vector3.Project(
                new Vector3(0, -6, 3),
                akashingas.getWorldMatrix(),
                scene.getTransformMatrix(),
                camera.viewport.toGlobal(
                  engine.getRenderWidth(true),
                  engine.getRenderHeight(true)
                )
              ),
            ],
            [
              btnMalaika,
              Vector3.Project(
                new Vector3(1, -2, 0),
                newyork.getWorldMatrix(),
                scene.getTransformMatrix(),
                camera.viewport.toGlobal(
                  engine.getRenderWidth(true),
                  engine.getRenderHeight(true)
                )
              ),
            ],
            [
              btnKingsChildrensHome,
              Vector3.Project(
                new Vector3(0, 0, 0),
                southAfrica.getWorldMatrix(),
                scene.getTransformMatrix(),
                camera.viewport.toGlobal(
                  engine.getRenderWidth(true),
                  engine.getRenderHeight(true)
                )
              ),
            ],
          ].forEach(([btn, pos]) => {
            (btn as React.RefObject<HTMLDivElement>).current!.style.transform =
              "translate3d(" +
              ((canvas.offsetLeft + (pos as Vector3).x) / 2) * initscale +
              "px, " +
              ((canvas.offsetTop + (pos as Vector3).y) / 2) * initscale +
              "px, 0px)";
          });
        });
      },
      undefined,
      undefined,
      ".glb"
    );
  };

  return (
    <section className="threeDContent relative h-full text-[#000]">
      <div className="threeDPage">
        {!loading && (
          <div className="page">
            <div className="loader" ref={loader} />
            <SceneComponent
              id="globe-canvas"
              adaptToDeviceRatio={true}
              antialias
              onSceneReady={onSceneReady}
              className="canvas max-h-[500px] sm:max-h-[1000px]"
            />
            <div className="btn" ref={btnCecilTheLion}>
              <div className="btnDot">
                <div className="spot" />
              </div>
              <div className="btnText">
                <Link to="/cecil-ai" className="text">
                  Cecil AI Agent
                </Link>
              </div>
            </div>
            <div className="btn" ref={btnJusticeEnfance}>
              <div className="btnDot">
                <div className="spot" />
              </div>
              <div className="btnText">
                <Link to="/justice-pour-l-enfance" className="text">
                  Justice Pour L'Enfance
                </Link>
              </div>
            </div>
            <div className="btn" ref={btnMightyUnderDogs}>
              <div className="btnDot">
                <div className="spot" />
              </div>
              <div className="btnText">
                <Link to="/mighty-under-dogs" className="text">
                  MightyUnderDogs
                </Link>
              </div>
            </div>
            <div className="btn" ref={btnAkashingas}>
              <div className="btnDot">
                <div className="spot" />
              </div>
              <div className="btnText">
                <Link to="/akashingas" className="text">
                  Akashingas
                </Link>
              </div>
            </div>
            <div className="btn" ref={btnPAL}>
              <div className="btnDot">
                <div className="spot" />
              </div>
              <div className="btnText">
                <Link to="/protecting-african-lions" className="text">
                  P.A.L
                </Link>
              </div>
            </div>
            <div className="btn" ref={btnMalaika}>
              <div className="btnDot">
                <div className="spot" />
              </div>
              <div className="btnText">
                <Link to="/malaika" className="text">
                  Malaika
                </Link>
              </div>
            </div>
            <div className="btn" ref={btnKingsChildrensHome}>
              <div className="btnDot">
                <div className="spot" />
              </div>
              <div className="btnText">
                <Link to="/the-kings-childrens-home" className="text">
                  King's Childrens Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lightButton absolute right-4">
        <img src="/dragIcon.svg" alt="" /> <span>Move around to explore</span>
      </div>
    </section>
  );
};

export default PlanetModel;
