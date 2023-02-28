import React, { useEffect, useState } from "react";
import { StarIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { searchMarketPlaceByPlayerId } from "../../utils/graphql";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const momentTier: any = {
  MOMENT_TIER_NIL: "bg-slate-100",
  MOMENT_TIER_COMMON: "bg-slate-100",
  MOMENT_TIER_RARE: "bg-yellow-400",
  MOMENT_TIER_LEGENDARY: "bg-emerald-600",
  MOMENT_TIER_ULTIMATE: "bg-purple-500",
  MOMENT_TIER_FANDOM: "bg-blue-500",
  MOMENT_TIER_ANTHOLOGY: "bg-red-500"
};

export default function Card({ product, exchangeRates }: any) {
  const [price, setPrice]: any = useState(null);

  const redirectToWebsite = () => {
    const baseUrl = "https://nbatopshot.com/listings/p2p/";
    const suffixUrl = `${product.set.id}+${product.play.id}`;
    return window.open(`${baseUrl}${suffixUrl}`, "_blank", "noreferrer");
  };

  useEffect(() => {
    (async () => {
      const byEditions = [{ setID: product.set.id, playID: product.play.id }];
      const data = await searchMarketPlaceByPlayerId({ byEditions });
      if (data && data.length > 0) {
        setPrice(data[0].price);
      }
    })();
  }, [product]);

  return (
    <div key={product.id} className="group relative border border-gray-200 p-4 sm:p-6">
      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        <img
          src={product.assetPathPrefix + "Hero_2880_2880_Black.jpg?format=webp&quality=80&width=583&cv=1"}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="pt-10 pb-4 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/discover/view/${product.set.id}+${product.play.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            <h2 className="text-lg font-mono font-bold"> {product.play.headline}</h2>
            <p className="font-medium italic text-blue-800">{product.play.stats.teamAtMoment}</p>
          </Link>
        </h3>
        <div className="mt-3 flex flex-col items-center">
          <div className="-ml-4 mt-6 flex flex-row">
            <span className="flex m-2">
              <img className="mx-2 " width={20} height={20} src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" />{" "}
              <span className="font-bold">{Number(price).toFixed(2)}</span>
            </span>
            <span className="flex m-2">
              <img className="mx-2 " width={20} height={20} src="https://cryptologos.cc/logos/ethereum-eth-logo.png" />{" "}
              <span className="font-bold">{(Number(price) * exchangeRates.usdToEth).toFixed(2)}</span>
            </span>
            <span className="flex m-2">
              <img className="mx-2 " width={20} height={20} src="https://cryptologos.cc/logos/flow-flow-logo.png" />{" "}
              <span className="font-bold">{(Number(price) * exchangeRates.usdToFlow).toFixed(2)}</span>
            </span>
          </div>

          <p className="sr-only">{product.reviews.average} out of 5 stars</p>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(product.reviews.average > rating ? "text-yellow-400" : "text-gray-200", "flex-shrink-0 h-5 w-5")}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.reviews.totalCount} reviews</p>
        </div>

        <span className={classNames(momentTier[product.tier], "px-2 py-1 m-1 text-slate-800 text-xs font-medium rounded")}>
          {product.tier.replace("MOMENT_TIER_", "")}
        </span>
        <p className="mt-2 text-base font-medium text-gray-900">{product.setPlay.circulations.circulationCount} CC</p>
        <div className="sm:flex-col1 mt-10 flex">
          <button
            onClick={redirectToWebsite}
            className="absolute flex py-3 px-8 max-w-xs justify-center font-extralight bg-gradient-to-r rounded-md  border border-transparent bg-gray-900 text-base text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-slate-500 sm:w-full">
            Buy on <img className="ml-2" width={100} height={100} src="https://nbatopshot.com/static/img/top-shot-logo-horizontal-white.svg" />
            <ArrowTopRightOnSquareIcon className="ml-2" width={25} />
          </button>
        </div>
        <p className="mt-2 text-sm italic font-thin  text-gray-900">{product.setPlay.circulations.burned} Moments burned</p>
      </div>
    </div>
  );
}
