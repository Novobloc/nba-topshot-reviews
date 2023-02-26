/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import CustomerRatings from "../components/ViewNft/CustomerRatings";
import ViewNftHistory from "../components/ViewNft/ViewNftHistory";
import { searchMarketPlaceByPlayerId } from "../utils/graphql";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      id: "wireframe",
      name: "Wireframe Kits",
      featured: [
        {
          name: "Scaffold",
          href: "#",
          imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-05-menu-03.jpg",
          imageAlt: "Pricing page screenshot with tiered plan options and comparison table on colorful blue and green background."
        },
        {
          name: "Bones",
          href: "#",
          imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-05-menu-04.jpg",
          imageAlt: "Application screenshot with tiered navigation and account settings form on color red and purple background."
        }
      ],
      sections: [
        {
          id: "application",
          name: "Application UI",
          items: [
            { name: "Home Screens", href: "#" },
            { name: "Detail Screens", href: "#" },
            { name: "Settings Screens", href: "#" }
          ]
        },
        {
          id: "marketing",
          name: "Marketing",
          items: [
            { name: "Landing Pages", href: "#" },
            { name: "Pricing Pages", href: "#" },
            { name: "Contact Pages", href: "#" }
          ]
        },
        {
          id: "ecommerce",
          name: "Ecommerce",
          items: [
            { name: "Storefront Pages", href: "#" },
            { name: "Product Pages", href: "#" },
            { name: "Category Pages", href: "#" },
            { name: "Shopping Cart Pages", href: "#" },
            { name: "Checkout Pages", href: "#" }
          ]
        }
      ]
    },
    {
      id: "icons",
      name: "Icons",
      featured: [
        {
          name: "Application UI Pack",
          href: "#",
          imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-05-menu-01.jpg",
          imageAlt:
            "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background."
        },
        {
          name: "Marketing Icon Pack",
          href: "#",
          imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-05-menu-02.jpg",
          imageAlt: "Calendar user interface screenshot with icon buttons and orange-yellow theme."
        }
      ],
      sections: [
        {
          id: "general",
          name: "General Use",
          items: [
            { name: "Heroicons Solid", href: "#" },
            { name: "Heroicons Outline", href: "#" },
            { name: "Line Illustrations", href: "#" },
            { name: "Hero Illustrations", href: "#" },
            { name: "Branded Illustrations", href: "#" },
            { name: "Skeuomorphic Illustrations", href: "#" },
            { name: "Hand Drawn Illustrations", href: "#" }
          ]
        },
        {
          id: "application",
          name: "Application UI",
          items: [
            { name: "Outlined", href: "#" },
            { name: "Solid", href: "#" },
            { name: "Branded", href: "#" },
            { name: "Small", href: "#" },
            { name: "Illustrations", href: "#" }
          ]
        },
        {
          id: "marketing",
          name: "Marketing",
          items: [
            { name: "Outlined", href: "#" },
            { name: "Solid", href: "#" },
            { name: "Branded", href: "#" },
            { name: "Small", href: "#" },
            { name: "Illustrations", href: "#" }
          ]
        }
      ]
    }
  ],
  pages: [
    { name: "UI Kits", href: "#" },
    { name: "Themes", href: "#" }
  ]
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const details = ["Highlights"];

const imageSuffixes = [
  { id: 3, name: "Hero_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 1, name: "Category_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 2, name: "Game_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 4, name: "ReverseHero_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 5, name: "Logos_2880_2880_Black.jpg?format=webp&quality=80&width=161&cv=1", type: "img" },
  { id: 6, name: "https://storage.googleapis.com/assets-nbatopshot/plays/sexton_c_dunk_clevsac_verdap_mar_27_2021_vertical_9x16.mp4", type: "vid" }
];

export default function Example() {
  const [open, setOpen] = useState(false);
  const [product, setProduct]: any = useState(null);
  const [products, setProducts]: any = useState(null);
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const d: any = useParams();

  useEffect(() => {
    (async () => {
      const [setId, playId]: any = d.id.split("+");
      const data = await searchMarketPlaceByPlayerId(setId, playId, 4);
      console.log(data, "data2");
      if (data && data.length > 0) {
        setProduct(data[0]);
        setProducts(data);
      }
    })();
  }, []);

  const redirectToWebsite = (e: any) => {
    e.preventDefault();
    const baseUrl = "https://nbatopshot.com/listings/p2p/";
    const suffixUrl = d.id;
    return window.open(`${baseUrl}${suffixUrl}`, "_blank", "noreferrer");
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}>
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? "text-indigo-600 border-indigo-600" : "text-gray-900 border-transparent",
                              "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                            )
                          }>
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul role="list" aria-labelledby={`${category.id}-${section.id}-heading-mobile`} className="mt-6 flex flex-col space-y-6">
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" className="block h-auto w-5 flex-shrink-0" />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-32 lg:max-w-7xl lg:px-8">
        {/* Product */}

        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-40">
          {/* Image gallery */}
          {products && products.length > 0 && (
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
          )}
          {/* Product info */}
          {product && (
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.moment.play.headline}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">{Number(product.price).toFixed(0)} $</p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(product.rating > rating ? "text-indigo-500" : "text-gray-300", "h-5 w-5 flex-shrink-0")}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6 text-base text-gray-700" dangerouslySetInnerHTML={{ __html: product.moment.play.description }} />
              </div>

              <form className="mt-6">
                <div className="sm:flex-col1 mt-10 flex">
                  <button
                    // type="submit"
                    onClick={redirectToWebsite}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
                    Buy on Market Place
                  </button>

                  {/* <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                  </button> */}
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>
                <h2 className="text-l font-medium tracking-tight text-gray-900 sm:text-xl">Highlights</h2>

                <div className="divide-y divide-gray-200 border-t pt-5">
                  <ul role="list">
                    {Object.keys(product.moment.play.stats).map((highlight) => (
                      <li key={highlight}>
                        {highlight.toUpperCase()} - {product.moment.play.stats[highlight]}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* <ViewNftHistory /> */}

        <CustomerRatings />
      </main>
    </div>
  );
}
