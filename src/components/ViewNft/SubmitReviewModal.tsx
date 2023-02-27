import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { RadioGroup } from "@headlessui/react";

const colors: any = [
  { name: "1", bgColor: "bg-pink-500", selectedColor: "ring-pink-500", value: 1 },
  { name: "2", bgColor: "bg-purple-500", selectedColor: "ring-purple-500", value: 2 },
  { name: "3", bgColor: "bg-blue-500", selectedColor: "ring-blue-500", value: 3 },
  { name: "4", bgColor: "bg-green-500", selectedColor: "ring-green-500", value: 4 },
  { name: "5", bgColor: "bg-yellow-500", selectedColor: "ring-yellow-500", value: 5 }
];

export default function Example(props: any) {
  const { closeModal, submitReview, getReviewsList, product } = props;
  const [selectedColor, setSelectedColor] = useState(colors[4]);
  const [comment, setComment] = useState("I loved it");

  const handleSubmitReview = async (e: any) => {
    e.preventDefault();
    const editionId = product && product.moment.setPlay.ID;
    console.log("Submitting");
    const args = {
      stars: selectedColor.value,
      comment,
      date: new Date().toString(),
      uniqueId: editionId
    };
    console.log(args, "e");
    await submitReview(args);
    setTimeout(async () => {
      await getReviewsList();
      closeModal();
    }, 5000);
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div>
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
                <div className="shadow sm:rounded-lg ">
                  <form>
                    <div className="mx-auto max-w-4xl px-4 lg:max-w-none lg:px-0">
                      <div>
                        <div className="mt-2">
                          <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                            <RadioGroup.Label className="block text-sm font-medium text-gray-700">Choose a rating</RadioGroup.Label>
                            <div className="mt-4 flex items-center space-x-3 ml-5">
                              {colors.map((color: any) => (
                                <RadioGroup.Option
                                  key={color.name}
                                  value={color}
                                  className={({ active, checked }) =>
                                    classNames(
                                      color.selectedColor ? "cursor-pointer focus:outline-none" : "opacity-25 cursor-not-allowed",
                                      active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                                      checked
                                        ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                      "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                                    )
                                  }
                                  disabled={!color.selectedColor}>
                                  <RadioGroup.Label as="span">{color.name}</RadioGroup.Label>
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <div className="mt-10">
                        <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4">
                          <div className="col-span-3 sm:col-span-4">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                              Comment
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="about"
                                name="about"
                                rows={4}
                                onChange={(e) => setComment(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="you@example.com"
                                defaultValue={comment}
                              />
                            </div>
                          </div>
                        </div>
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
