import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Hero from "../assets/nba-widget.svg";
import { Link } from "react-router-dom";

export default function Example() {
  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">A better way to ship your projects</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Esse id magna consectetur fugiat non dolor in ad laboris magna laborum ea consequat. Nisi irure aliquip nisi adipisicing veniam voluptate
            id. In veniam incididunt ex veniam adipisicing sit.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              to="/market-place"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              View Market Place
            </Link>
          </div>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <img src={Hero} alt="" />
        </div>
      </div>
    </div>
  );
}
