import React from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Example(props: any) {
  const { closeModal, submitReview } = props;

  const handleSubmitReview = async () => {
    console.log("Submitting");
    const args = {
      stars: 3,
      comment: "Test",
      date: "Mon Feb 27 2023 00:57:57 GMT+0530 (India Standard Time)",
      uniqueId: "123"
    };

    const d = await submitReview(args);
    console.log(d, "dd");

    closeModal();
  };

  return (
    <>
      <div>
        {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div> */}
        <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={closeModal}>
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            Submit Your Rating
          </Dialog.Title>
          <div className="mt-2">
            <div className="flex min-h-full flex-col justify-center py-2 sm:px-6 lg:px-8">
              <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white shadow sm:rounded-lg ">
                  <form className="space-y-6" action="#" method="POST">
                    <div className="sm:col-span-6">
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
          onClick={handleSubmitReview}>
          Submit
        </button>
      </div>
    </>
  );
}
