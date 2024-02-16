import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
// import { PathName } from "routers/types";


export default function DropdownTravelers() {
  const hasToken = !!localStorage.getItem("token");
const { pathname } = useLocation();

  return (
    <div>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <div className="space-x-4">
              <Popover.Button
                className={`${open ? "" : "text-opacity-90"}
                group py-2 rounded-md text-sm sm:text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                  pathname === "/property" ? "text-black" : "text-gray-500"
                }`}
              >
                <Link to={"/property"}>
                  {hasToken ? (
                    <div className={` inline-flex items-center `} role="button">
                      <span>Properties</span>
                    </div>
                  ) : undefined}
                </Link>
              </Popover.Button>
              <Popover.Button
                className={`${open ? "" : "text-opacity-90"}
                group py-2 rounded-md text-sm sm:text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                  pathname === "/owner_bookings"
                    ? "text-black"
                    : "text-gray-500"
                }`}
              >
                <Link to={"/owner_bookings"}>
                  {hasToken ? (
                    <div className={` inline-flex items-center `} role="button">
                      <span>Bookings</span>
                    </div>
                  ) : undefined}
                </Link>
              </Popover.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-xs px-4 mt-4 transform -translate-x-1/2 left-1/2 sm:px-0"></Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}


