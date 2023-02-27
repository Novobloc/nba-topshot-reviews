import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import { Link, useNavigate } from "react-router-dom";
import { StarIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

function SphereComp() {
  // const texture = useTexture('/terrazo.png')
  return (
    <Sphere args={[1, 100, 200]} scale={4}>
      <MeshDistortMaterial color={"#3b82f6"} attach={"material"} wireframe={true} distort={0.5} speed={1.5} roughness={1} />
      {/* <meshNormalMaterial wireframe={true} /> */}
    </Sphere>
  );
}

export default function Example() {
  const navigate = useNavigate();

  const redirectToMarketPlace = async () => {
    return navigate("/market-place");
  };

  return (
    <div className="">
      <section className="h-auto  tails-selected-element  z-50">
        <div className="px-10 py-14 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:text-center">
            <h1
              style={{ wordSpacing: "2rem" }}
              className="mb-6 text-9xl font-sans font-bold leading-snug max-w-8xl mx-auto tracking-tight  text-black    ">
              {" "}
              What&apos;s your favorite
              <img className="flex items-center justify-center  mr-1" src="https://developers.nbatopshot.com/img/light.svg" alt="" />
              Moment?{" "}
            </h1>
            <div className="flex flex-col items-center">
              <button
                onClick={redirectToMarketPlace}
                className="flex  max-w-xs font-extralight py-4 px-2 justify-center bg-gradient-to-r rounded-md border border-transparent bg-gray-900 text-base text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-slate-500 sm:w-full">
                Explore Moments
                {/* <img className="ml-2" width={100} height={100} src="https://nbatopshot.com/static/img/top-shot-logo-horizontal-white.svg" /> */}
                <ArrowRightIcon className="ml-2" width={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Canvas style={{ height: "100vh", position: "fixed", top: 0, left: 0, zIndex: -50 }}>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[-2, 5, 2]} />

        <Suspense fallback={null}>
          <SphereComp />
        </Suspense>
      </Canvas>
    </div>
  );
}
