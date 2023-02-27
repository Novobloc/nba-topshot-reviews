import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { searchEditions } from "../../utils/graphql";
import { useWeb3Context } from "../../context/Onflow";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { formatReviews } from "../../utils/functions";
import _ from "lodash";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { executeScript } = useWeb3Context();
  const { setAppLoading } = useGlobalContext();
  const [market, setMarket]: any = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (market) return;
        else {
          const data = await fetchMarketData();
          if (data) {
            setMarket(data);
          }
        }
      } catch (error) {
        console.log(error, "error");
      }
    })();
  }, []);

  const fetchMarketData = async () => {
    const data = await searchEditions();
    const reviewsData = await getReviews();
    data.forEach(async (item: { id: any }, i: any) => {
      const reviews = reviewsData.filter((revItem: { id: any }) => {
        return item.id === revItem.id;
      });

      data[i].reviews = await formatReviews(reviews);
    });
    console.log(data, "data11");
    return data;
  };

  const getReviews = async () => {
    const cadence = `
    import ReviewContract from 0xb880e7b2e2c0a70b

    pub fun main(): [ReviewContract.review] {
      return ReviewContract.getReviews()
    }
`;
    const resp = await executeScript(cadence, (arg: any, t: any) => []);
    return resp;
  };

  return (
    <div className="bg-white">
      <main className="pb-24">
        {/* Product grid */}
        <section aria-labelledby="products-heading" className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {market &&
              market.map((product: any) => (
                <div key={product.id} className="group relative border-r border-b border-gray-200 p-4 sm:p-6">
                  <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                    <img
                      src={product.assetPathPrefix + "Hero_2880_2880_Black.jpg?format=webp&quality=80&width=583&cv=1"}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="pt-10 pb-4 text-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      <Link to={`/market-place/view/${product.set.id}+${product.play.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.play.headline}
                        <br />({product.play.stats.teamAtMoment})
                      </Link>
                    </h3>
                    <div className="mt-3 flex flex-col items-center">
                      <p className="sr-only">{product.reviews.average} out of 5 stars</p>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(product.reviews.average > rating ? "text-yellow-400" : "text-gray-200", "flex-shrink-0 h-5 w-5")}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.reviews.totalCount} reviews</p>
                    </div>
                    <p className="mt-2 text-base font-medium text-gray-900">{product.setPlay.circulations.burned} Moments burned</p>
                    <p className="mt-2 text-base font-medium text-gray-900">
                      {product.tier.replace("MOMENT_TIER_", "")} / {product.setPlay.circulations.circulationCount} CC
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Pagination */}
        {/* <nav aria-label="Pagination" className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600">
              Previous
            </a>
          </div>
          <div className="hidden space-x-2 sm:flex">
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600">
              1
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600">
              2
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-indigo-600 bg-white px-4 ring-1 ring-indigo-600 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600">
              3
            </a>
            <span className="inline-flex h-10 items-center px-1.5 text-gray-500">...</span>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600">
              8
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600">
              9
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600">
              10
            </a>
          </div>
          <div className="flex min-w-0 flex-1 justify-end">
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600">
              Next
            </a>
          </div>
        </nav> */}
      </main>
    </div>
  );
}
