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
import { Link } from "react-router-dom";
import CustomerRatings from "../components/ViewNft/CustomerRatings";
import ViewNftHistory from "../components/ViewNft/ViewNftHistory";
import { searchMarketPlaceByPlayerId } from "../utils/graphql";

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

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 }
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
    }
    // More reviews...
  ]
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [open, setOpen] = useState(false);
  const [product, setProduct]: any = useState(null);

  useEffect(() => {
    (async () => {
      const data = await searchMarketPlaceByPlayerId("cc8ee16f-f66b-41bb-a0db-ca9f80b7395c", "bb519451-4ff8-437b-a8aa-022eb883187a", 5);
      console.log(data, "data2");
      setProduct(data[0]);
    })();
  }, []);
  // searchMarketPlaceByPlayerId
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
      {product && (
        <main className="mx-auto px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-32 lg:max-w-7xl lg:px-8">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            {/* Product image */}
            <div className="lg:col-span-4 lg:row-end-1">
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.moment.assetPathPrefix + "Hero_2880_2880_Black.jpg?format=webp&quality=80&width=583&cv=1"}
                  alt={product.imageAlt}
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Product details */}
            <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.moment.play.headline}</h1>

                  <h2 id="information-heading" className="sr-only">
                    Product information
                  </h2>
                  {/* <p className="mt-2 text-sm text-gray-500">
                  Version {product.version.name} (Updated <time dateTime={product.version.datetime}>{product.version.date}</time>)
                </p> */}
                </div>

                <div>
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(reviews.average > rating ? "text-yellow-400" : "text-gray-300", "h-5 w-5 flex-shrink-0")}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                </div>
              </div>

              <p className="mt-6 text-gray-500">{product.moment.play.description}</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  Buy Moment @ {Number(product.price).toFixed(0)} $
                </button>
                {/* <Link
                to={`/market-place/view/${product.id}/history`}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 py-3 px-8 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                View Past Owners
              </Link> */}
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    {Object.keys(product.moment.play.stats).map((highlight) => (
                      <li key={highlight}>{product.moment.play.stats[highlight]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ViewNftHistory />

          <CustomerRatings />
        </main>
      )}
    </div>
  );
}
