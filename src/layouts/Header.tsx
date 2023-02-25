import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ellipseAddress, classNames } from "../utils/functions";
import { ArrowTopRightOnSquareIcon, ArrowLeftOnRectangleIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { useWeb3Context } from "../context/Onflow";
import { Menu, Transition } from "@headlessui/react";

export default function Header() {
  const navigate = useNavigate();
  const { logout, connect, user } = useWeb3Context();

  const disconnectWallet = async () => {
    await logout();
    return navigate("/");
  };

  const connectWallet = async () => {
    await connect();
  };

  return (
    <section className="w-full px-8 text-gray-700 bg-white">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
          <Link to="/" className="flex items-center font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            <span className="mx-auto ml-0 text-xl tracking-widest uppercase  leading-none  font-thin  text-slate-900 select-none">NBA Chronos</span>
          </Link>
        </div>
        <div className="inline-flex items-center ml-1 space-x-5 lg:justify-end">
          {!user.loggedIn && (
            <button
              onClick={connectWallet}
              disabled={false}
              className="flex w-44 justify-center font-extralight bg-gradient-to-r rounded-md  border border-transparent bg-gray-900 py-1 px-0 text-base text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-slate-500">
              Connect Wallet
            </button>
          )}

          {user && user.addr && (
            <div className="flex-none justify-end mr-0">
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                    <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                      <span className="sr-only">Open user menu for </span>
                      {ellipseAddress(user.addr, 8)}
                    </span>
                    <ChevronDownIcon className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigator.clipboard.writeText(user.addr)}
                          className={classNames(active ? "bg-gray-100" : "", "px-4 py-2 text-sm text-gray-700 flex w-full")}>
                          <Square2StackIcon height={18} className="mt-1" />
                          <span className="ml-3 mt-1">Copy Address</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`https://testnet.flowscan.org/account/${user.addr}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(active ? "bg-gray-100" : "", "px-4 py-2 text-sm text-gray-700 flex")}>
                          <ArrowTopRightOnSquareIcon height={18} className="mt-1" />
                          <span className="ml-3 mt-1">View on Explorer</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={disconnectWallet}
                          className={classNames(active ? "bg-gray-100" : "", "px-4 py-2 text-sm text-gray-700 flex w-full")}>
                          <ArrowLeftOnRectangleIcon height={18} className="mt-1" />
                          <span className="ml-3 mt-1">Disconnect</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
