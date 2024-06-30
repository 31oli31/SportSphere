"use client";

import { ApolloProvider } from "@apollo/client";

import { ReactNode, useState } from "react";
import { SessionProvider, signOut } from "next-auth/react";
import { ButtonLink } from "@/components/Button";
import { PAGE_ROUTE } from "@/interface/route";
import { DataProvider, useData } from "@/services/dataProvider/DataProvider";
import { useClientApollo } from "@/hooks/useClientApollo";
import Link from "next/link";
import Image from "next/image";
import "flowbite";
import BreadcrumbAuto from "./BreadcrumbAuto";
import { usePathname } from "next/navigation";

const ProviderClientLayout = ({ children }: { children: ReactNode }) => {
  const { client, updateHeaders, headers } = useClientApollo();

  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <DataProvider updateHeaders={updateHeaders} headers={headers}>
          <ClientLayout>{children}</ClientLayout>
        </DataProvider>
      </SessionProvider>
    </ApolloProvider>
  );
};

const getInitials = (name: string) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return initials.toUpperCase();
};

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useData();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 text-gray-800 flex flex-col ">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              height={32}
              width={32}
              className={"h-8"}
              src={"logo.svg"}
              alt={"logo"}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Sportsphere
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
              {!user && (
                <>
                  <li>
                    <Link
                      href={PAGE_ROUTE.LOGIN}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={PAGE_ROUTE.REGISTER}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <>
                  <Link
                    href={PAGE_ROUTE.DASHBOARD}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Dashboard
                  </Link>
                  <li className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                        {getInitials(user.username)}
                      </div>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="py-2">
                          <div className="px-4 py-2 text-sm text-gray-700">
                            {user.username}
                          </div>
                          <button
                            onClick={() =>
                              signOut({ callbackUrl: PAGE_ROUTE.HOME })
                            }
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-700"
                          >
                            Logout
                          </button>
                          <button
                            onClick={() =>
                              signOut({ callbackUrl: PAGE_ROUTE.LOGIN })
                            }
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-700"
                          >
                            Switch Account
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="max-w-screen-xl p-4 container mx-auto">
        <BreadcrumbAutoFiltered />
      </div>
      <div className={"flex flex-col flex-grow overflow-auto "}>
        <main className=" max-w-screen-xl px-4 flex-grow flex flex-col container mx-auto">
          {children}
        </main>

        <footer className=" bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 Sportsphere. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link
                href={PAGE_ROUTE.TERMS_OF_SERVICE}
                className="hover:underline me-4 md:me-6"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href={PAGE_ROUTE.PRIVACY}
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

const BreadcrumbAutoFiltered = () => {
  const path = usePathname();
  const PAGES_NO_BREADCRUMB = [
    PAGE_ROUTE.HOME,
    PAGE_ROUTE.LOGIN,
    PAGE_ROUTE.REGISTER,
    PAGE_ROUTE.TERMS_OF_SERVICE,
    PAGE_ROUTE.PRIVACY,
  ];

  if (PAGES_NO_BREADCRUMB.includes(path)) {
    return <></>;
  }

  return <BreadcrumbAuto />;
};

export default ProviderClientLayout;
