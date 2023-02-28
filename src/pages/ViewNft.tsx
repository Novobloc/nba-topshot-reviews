import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { StarIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import CustomerRatings from "../components/ViewNft/CustomerRatings";
import { searchMarketPlaceByPlayerId, getExchangeRates } from "../utils/graphql";
import moment from "moment";
import { useWeb3Context } from "../context/Onflow";
import { formatReviews } from "../utils/functions";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const imageSuffixes = [
  { id: 3, name: "Hero_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 1, name: "Category_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 2, name: "Game_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 4, name: "ReverseHero_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 5, name: "Logos_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 6, name: "https://storage.googleapis.com/assets-nbatopshot/plays/sexton_c_dunk_clevsac_verdap_mar_27_2021_vertical_9x16.mp4", type: "vid" }
];

export default function ViewNft() {
  const { executeScript, executeTransaction, user, getAccountBalance } = useWeb3Context();
  const [product, setProduct]: any = useState(null);
  const [reviews, setReviews]: any = useState(null);
  const [exchangeRates, setExchangeRates]: any = useState(null);
  const [balance, setBalance]: any = useState(null);
  const d: any = useParams();

  useEffect(() => {
    (async () => {
      const [setId, playId]: any = d.id.split("+");
      const byEditions = [{ setID: setId, playID: playId }];
      const data = await searchMarketPlaceByPlayerId({ byEditions });
      if (data && data.length > 0) {
        setProduct(data[0]);
      }
      const editionId = data[0] && data[0].moment.setPlay.ID;
      const rev = await getReviewsById(editionId);
      if (rev && rev.length > 0) {
        const format = await formatReviews(rev);
        setReviews(format);
      }
      const exchangeData = await getExchangeRates();
      if (exchangeData) {
        setExchangeRates(exchangeData);
      }
      const account: any = await getAccountBalance();
      if (account) {
        setBalance(account.balance);
      }
    })();
  }, []);

  const redirectToWebsite = (e: any) => {
    e.preventDefault();
    const baseUrl = "https://nbatopshot.com/listings/p2p/";
    const suffixUrl = d.id;
    return window.open(`${baseUrl}${suffixUrl}`, "_blank", "noreferrer");
  };

  const getReviewsById = async (id: string) => {
    const cadence = `
    import ReviewContract from 0xb880e7b2e2c0a70b

    pub fun main(id:String): [ReviewContract.review] {
      return ReviewContract.getReviewsByid(id:id)
    }    
`;
    const resp = await executeScript(cadence, (arg: any, t: any) => [
      arg(id, t.String) // addr: Address
    ]);
    return resp;
  };

  const submitReview = async (argsItem: any) => {
    console.log(argsItem, "argsItem");
    const { stars, comment, date, uniqueId } = argsItem;

    const cadence = `
           import ReviewContract from 0xb880e7b2e2c0a70b
           
           transaction(stars: UInt64, comment: String, date: String, id: String){
           var signerAddress: Address;
           prepare(signer: AuthAccount){
              self.signerAddress = signer.address
                  log(signer.address)
              }
            execute {
             ReviewContract.createReview(by:self.signerAddress,stars:stars,comment:comment,date:date,id:id)
            }
     }
    `;
    const c = await executeTransaction(cadence, (arg: any, t: any) => [
      arg(stars, t.UInt64), // addr: Address
      arg(comment, t.String), // addr: Address
      arg(date, t.String), // addr: Address
      arg(uniqueId, t.String) // addr: Address
    ]);
    console.log("c", c);
  };

  return (
    <div className="bg-white">
      <main className="mx-auto px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-32 lg:max-w-7xl lg:px-8">
        {/* Product */}
        {product && exchangeRates && (
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-20">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}

              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {imageSuffixes &&
                    imageSuffixes.length > 0 &&
                    imageSuffixes.map((eachProduct: any) => (
                      <Tab
                        key={eachProduct.id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                        {({ selected }) => (
                          <>
                            <span className="sr-only"> {eachProduct.id} </span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              {eachProduct.type !== "img" ? (
                                <video className="h-full w-full object-cover object-center sm:rounded-lg" controls autoPlay={true}>
                                  <source src={product.moment.play.assets.videos[0].url} type="video/mp4" />
                                </video>
                              ) : (
                                <img
                                  src={product.moment.assetPathPrefix + eachProduct.name}
                                  alt={eachProduct.id}
                                  className="h-full w-full object-cover object-center sm:rounded-lg"
                                />
                              )}
                            </span>
                            <span
                              className={classNames(
                                selected ? "ring-indigo-500" : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                {imageSuffixes &&
                  imageSuffixes.length > 0 &&
                  imageSuffixes.map((eachProduct: any) => (
                    <Tab.Panel key={eachProduct.id}>
                      {eachProduct.type !== "img" ? (
                        <video className="h-full w-full object-cover object-center sm:rounded-lg" controls autoPlay={true}>
                          <source
                            src={product.moment.play.assets.videos[0].url}
                            // src="https://storage.googleapis.com/assets-nbatopshot/plays/sexton_c_dunk_clevsac_verdap_mar_27_2021_vertical_9x16.mp4"
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        <img
                          src={product.moment.assetPathPrefix + eachProduct.name}
                          alt={eachProduct.id}
                          className="h-full w-full object-cover object-center sm:rounded-lg"
                        />
                      )}
                    </Tab.Panel>
                  ))}
              </Tab.Panels>
            </Tab.Group>
            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-mono font-bold tracking-tight text-gray-900">{product.moment.play.headline}</h1>
              <h4 className="text-xl font-mono font-medium tracking-tight text-gray-900">
                {product.moment.play.stats.playCategory} | {moment(product.moment.play.stats.dateOfMoment).format("YYYY MMM DD")}
              </h4>
              <h4 className="text-l font-semi-bold tracking-tight text-gray-900">
                {product.moment.tier.replace("MOMENT_TIER_", "")} / {product.moment.setPlay.circulations.circulationCount} CC
              </h4>
              <h4 className="text-l font-normal italic tracking-tight text-gray-900">{product.moment.setPlay.circulations.burned} Moments burned</h4>

              {/* Reviews */}
              {reviews && (
                <div className="mt-3">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(Number(reviews.average) > rating ? "text-yellow-400" : "text-gray-300", "h-5 w-5 flex-shrink-0")}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="ml-5">
                        {/* {Number(reviews.average)} */}
                        Based on {Number(reviews.totalCount)} Reviews
                      </span>
                    </div>
                    <p className="sr-only">{Number(reviews.average)} out of 5 stars</p>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div
                  className="space-y-6 text-base text-gray-700 font-thin font-sans"
                  dangerouslySetInnerHTML={{ __html: product.moment.play.description }}
                />
              </div>

              <div className="-ml-4 mt-6 flex flex-row">
                <span className="flex m-2">
                  <img className="mx-2 " width={20} height={20} src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" />{" "}
                  <span className="font-bold">{Number(product.price).toFixed(2)}</span>
                </span>
                <span className="flex m-2">
                  <img className="mx-2 " width={20} height={20} src="https://cryptologos.cc/logos/ethereum-eth-logo.png" />{" "}
                  <span className="font-bold">{(Number(product.price) * exchangeRates.usdToEth).toFixed(2)}</span>
                </span>
                <span className="flex m-2">
                  <img className="mx-2 " width={20} height={20} src="https://cryptologos.cc/logos/flow-flow-logo.png" />{" "}
                  <span className="font-bold">
                    {(Number(product.price) * exchangeRates.usdToFlow).toFixed(2)} (Bal: {balance ? (balance / Math.pow(10, 8)).toFixed(2) : ""} )
                  </span>
                </span>
              </div>

              <form className="mt-4">
                <div className="sm:flex-col1 mt-4 flex">
                  <button
                    // type="submit"
                    onClick={redirectToWebsite}
                    className="flex py-3 px-8 max-w-xs justify-center font-extralight bg-gradient-to-r rounded-md  border border-transparent bg-gray-900 text-base text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-slate-500 sm:w-full"
                    // className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-semi-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Buy on{" "}
                    <img className="ml-2" width={100} height={100} src="https://nbatopshot.com/static/img/top-shot-logo-horizontal-white.svg" />
                    <ArrowTopRightOnSquareIcon className="ml-2" width={25} />
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>
                <h2 className="text-l font-mono font-medium tracking-tight text-gray-900 sm:text-xl">Highlights</h2>

                <div className="divide-y divide-gray-200 border-t pt-5">
                  <table className="">
                    <tbody>
                      {Object.keys(product.moment.play.stats).map((highlight: string) => {
                        return (
                          highlight !== "__typename" && (
                            <tr>
                              <td className="font-bold font-sans">
                                {highlight.replace(/([A-Z])/g, " $1").replace(/^./, function (str: string) {
                                  return str.toUpperCase();
                                })}
                              </td>

                              <td className="text-right font-mono font-extralight italic text-slate-400">{product.moment.play.stats[highlight]}</td>
                            </tr>
                          )
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        )}

        <CustomerRatings submitReview={submitReview} getReviewsById={getReviewsById} product={product} user={user} />
      </main>
    </div>
  );
}
