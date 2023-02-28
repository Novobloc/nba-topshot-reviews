import React from "react";

export const Heading = () => (
  <section className="h-auto bg-white tails-selected-element">
    <div className="px-10 py-24 mx-auto max-w-7xl">
      <div className="w-full mx-auto text-left md:text-center">
        <h1 className="mb-6 text-5xl font-extrabold leading-none max-w-5xl mx-auto tracking-normal text-gray-900 sm:text-6xl md:text-6xl lg:text-7xl md:tracking-tight">
          {" "}
          Live the&nbsp;
          <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-[#1C428A] via-blue-500 to-[#C7102E] lg:inline">moment</span> for
          <br className="lg:block hidden"></br> for the&nbsp;
          <span className="w-full text-transparent bg-clip-text bg-gradient-to-r  from-green-400 via-blue-500 to-purple-500 lg:inline">
            moment
          </span>{" "}
        </h1>
        <p className="px-0 mb-6 text-lg text-gray-600 md:text-xl lg:px-24"> Discover what the community has to say about the Moments here! </p>
      </div>
    </div>
  </section>
);
