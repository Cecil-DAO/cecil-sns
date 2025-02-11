import { useEffect, useRef, useState } from "react";
import {
  Color4,
  DirectionalLight,
  HDRCubeTexture,
  SceneLoader,
  Vector3,
  Scene,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import SceneComponent from "babylonjs-hook";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const PlanetModel = () => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [, setProgress] = useState(0);

  const loader = useRef(null);
  const lionBtn = useRef(null);

  const timeout = useRef(null);
  const defaultConfig = {
    alpha: Math.PI / 2,
    beta: Math.PI / 2,
    radius: 70,
    target: new Vector3(0.065, 0.047, 0.035),
  };
  const lionConfig = {
    alpha: Math.PI / 2,
    beta: Math.PI / 3,
    radius: 25,
    target: new Vector3(0.515, 10.346, 0.486),
  };

  useEffect(() => {
    const matchCatch = () => {
      caches.open("my-cache").then((cache) => {
        const request = new Request("Animals_d.glb", { method: "GET" });
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
    const url = "Animals_d.glb";

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

        console.log("blob", arrayBuffer, blob);
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
    scene.createDefaultCamera();
    scene.clearColor = new Color4(0, 0, 0, 0);
    SceneLoader.ShowLoadingScreen = false;

    // const modelRes = nowModal.current as ArrayBufferView;
    const modelRes = url;
    // const modelRes = 'Animals_d.glb';
    // const fileSize = await getFileSize();

    const env = new HDRCubeTexture("env.hdr", scene, 128);

    const engine = scene.getEngine();
    const canvas = document.getElementById("globe-canvas") as HTMLElement;

    SceneLoader.Append(
      "",
      modelRes,
      scene,
      (meshes) => {
        scene.createDefaultCamera(true, true, true);
        const camera = scene.cameras[0];
        camera.fov = 0.8;
        lionBtn.current.style.visibility = "visible";
        loader.current.style.visibility = "hidden";
        camera.inputs.removeByType("ArcRotateCameraMouseWheelInput");
        camera.inputs.removeByType(camera.inputs.attached.mousewheel);
        scene.environmentTexture = env;
        const light = new DirectionalLight(
          "DirectionalLight",
          new Vector3(3, -1, -2),
          scene
        );
        light.intensity = 10;
        // scene.onPointerObservable.add((pointerInfo) => {
        //   if (
        //     [
        //       PointerEventTypes.POINTERUP,
        //       PointerEventTypes.POINTERWHEEL,
        //     ].includes(pointerInfo.type)
        //   ) {
        //     if (timeout !== null) {
        //       clearTimeout(timeout.current);
        //     }
        //     timeout.current = setTimeout(() => {
        //       camera.spinTo("alpha", defaultConfig.alpha, 120);
        //       camera.spinTo("beta", defaultConfig.beta, 120);
        //       camera.spinTo("radius", defaultConfig.radius, 120);
        //       camera.spinTo("target", defaultConfig.target, 120);
        //     }, 2000);
        //   }
        //   if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
        //     if (timeout !== null) {
        //       clearTimeout(timeout.current);
        //     }
        //   }
        // });
        let lion = {};
        meshes.meshes.forEach((item) => {
          if (item.name === "Object_7") {
            const centerWorld = item.getBoundingInfo().boundingBox.centerWorld;
            camera.target = centerWorld;
            camera.radius = defaultConfig.radius;
          }
          if (item.name === "Box001_primitive0") lion = item;
        });
        camera.lowerRadiusLimit = 50;
        camera.upperRadiusLimit = 120;
        camera.alpha = defaultConfig.alpha;
        setInterval(() => {
          scene.animationGroups[0]?.stop();
          scene.animationGroups[0]?.play();
        }, 11500);

        lionBtn.current.onclick = () => {
          navigate("/cecil-the-lion");
          clearTimeout(timeout.current);
          camera.spinTo("alpha", lionConfig.alpha, 120);
          camera.spinTo("beta", lionConfig.beta, 120);
          camera.spinTo("radius", lionConfig.radius, 120);
          camera.spinTo("target", lionConfig.target, 120);
          // lionBtn.current.style.visibility = 'hidden';
          camera.detachControl();
          canvas.onclick = () => {
            camera.spinTo("alpha", defaultConfig.alpha, 120);
            camera.spinTo("beta", defaultConfig.beta, 120);
            camera.spinTo("radius", defaultConfig.radius, 120);
            camera.spinTo("target", defaultConfig.target, 120);
            camera.attachControl();
            canvas.onclick = null;
          };

          setTimeout(() => {
            camera.spinTo("alpha", defaultConfig.alpha, 120);
            camera.spinTo("beta", defaultConfig.beta, 120);
            camera.spinTo("radius", defaultConfig.radius, 120);
            camera.spinTo("target", defaultConfig.target, 120);
          }, 2000);
        };
        scene.registerBeforeRender(() => {
          const pos = Vector3.Project(
            new Vector3(-2, 9, 8),
            lion.getWorldMatrix(),
            scene.getTransformMatrix(),
            camera.viewport.toGlobal(
              engine.getRenderWidth(true),
              engine.getRenderHeight(true)
            )
          );
          const scale = window.devicePixelRatio;
          const initscale =
            scale === 1 ? 2 : scale === 2 ? 1 : scale === 3 ? 2 / 3 : 1;

          lionBtn.current.style.transform =
            "translate3d(" +
            ((canvas.offsetLeft + pos.x) / 2) * initscale +
            "px, " +
            ((canvas.offsetTop + pos.y) / 2) * initscale +
            "px, 0px)";
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
              className="canvas lg:max-h-[1000px]"
            />
            <div className="btn" ref={lionBtn}>
              <div className="btnDot">
                <div className="spot" />
              </div>
              <div className="btnText">
                <div className="text">Cecil The Lion Project</div>
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
