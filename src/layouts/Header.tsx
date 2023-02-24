import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <section className="w-full px-8 text-gray-700 bg-white">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
          <Link to="/" className="flex items-center font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            <span className="mx-auto ml-0 text-xl tracking-widest uppercase  leading-none  font-thin  text-slate-900 select-none">NBA Chronos</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
