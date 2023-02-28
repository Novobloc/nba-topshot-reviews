import React, { Fragment, useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Transition, Dialog } from "@headlessui/react";
import SubmitReviewModal from "./SubmitReviewModal";
import { formatReviews } from "../../utils/functions";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
function CustomerRatings(props: any) {
  const { submitReview, getReviewsById, product, user } = props;
  const [open, setOpen] = useState(false);
  const [reviews, setReviews]: any = useState();

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const getReviewsList = async () => {
    const editionId = product && product.moment.setPlay.ID;
    const resp = await getReviewsById(editionId);
    if (resp && resp.length > 0) {
      const format = await formatReviews(resp);
      console.log(format, "format");
      setReviews(format);
    }
  };

  useEffect(() => {
    (async () => {
      await getReviewsList();
    })();
  }, [product]);

  return (
    <div>
      <section aria-labelledby="reviews-heading" className="bg-white font-mono">
        <div className="mx-auto max-w-2xl py-24 px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-32 lg:px-8">
          <div className="lg:col-span-4">
            <h2 id="reviews-heading" className="text-2xl font-bold tracking-tight text-gray-900">
              Customer Reviews
            </h2>

            {reviews && (
              <div className="mt-3 flex items-center">
                <div>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(reviews.average > rating ? "text-yellow-400" : "text-gray-300", "flex-shrink-0 h-5 w-5")}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                </div>
                <p className="ml-2 text-sm text-gray-900">Based on {reviews.totalCount} reviews</p>
              </div>
            )}

            <div className="mt-6">
              <h3 className="sr-only">Review data</h3>

              <dl className="space-y-3">
                {reviews &&
                  reviews.counts.map((count: any) => (
                    <div key={count.rating} className="flex items-center text-sm">
                      <dt className="flex flex-1 items-center">
                        <p className="w-3 font-medium text-gray-900">
                          {count.rating}
                          <span className="sr-only"> star reviews</span>
                        </p>
                        <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                          <StarIcon
                            className={classNames(count.count > 0 ? "text-yellow-400" : "text-gray-300", "flex-shrink-0 h-5 w-5")}
                            aria-hidden="true"
                          />

                          <div className="relative ml-3 flex-1">
                            <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                            {count.count > 0 ? (
                              <div
                                className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </dt>
                      <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                        {Math.round((count.count / reviews.totalCount) * 100)}%
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-900">Share your thoughts</h3>
              <p className="mt-1 text-sm text-gray-600">If you’ve used this moment, please share your thoughts with other customers</p>

              <button
                onClick={openModal}
                disabled={user && user.loggedIn ? false : true}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full">
                {user && user.loggedIn ? "Write a review" : "Login to write a review"}
              </button>
            </div>

            <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto ">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <SubmitReviewModal closeModal={closeModal} submitReview={submitReview} getReviewsList={getReviewsList} product={product} />
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>

          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h3 className="sr-only">Recent reviews</h3>

            <div className="flow-root">
              <div className="-my-12 divide-y divide-gray-200">
                {reviews &&
                  reviews.featured.map((review: any) => (
                    <div key={review.id} className="py-12">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <h4 className="text-sm font-bold text-gray-900">{review.by}</h4>
                          <div className="mt-1 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(Number(review.stars) > rating ? "text-yellow-400" : "text-gray-300", "h-5 w-5 flex-shrink-0")}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">{review.rating} out of 5 stars</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-6 text-base italic text-gray-600" dangerouslySetInnerHTML={{ __html: review.comment }} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomerRatings;
