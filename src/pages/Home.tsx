import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { ThreeDBackground } from "../components/Home/ThreeDBackground";

export default function Home() {
  const navigate = useNavigate();

  const redirectToMarketPlace = async () => {
    return navigate("/discover");
  };

  return (
    <div className="">
      <section className="h-auto  tails-selected-element  z-50">
        <div className="px-10 py-14 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:text-center">
            <h1
              style={{ wordSpacing: "2rem" }}
              className="mb-6 text-8xl font-sans font-bold leading-snug max-w-8xl mx-auto tracking-tight  text-black    ">
              {" "}
              What&apos;s your favorite
              <img className="flex items-center justify-center  mr-1" src="https://developers.nbatopshot.com/img/light.svg" alt="" />
              <span className="text-9xl"> Moment? </span>
            </h1>
            <div className="flex flex-col items-center">
              <button
                onClick={redirectToMarketPlace}
                className="flex  max-w-xs font-extralight py-4 px-2 justify-center bg-gradient-to-r rounded-md border border-transparent bg-gray-900 text-base text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-slate-500 sm:w-full">
                Explore Moments
                <ArrowRightIcon className="ml-2" width={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <ThreeDBackground />
    </div>
  );
}
