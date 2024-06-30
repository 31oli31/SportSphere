// components/CustomBreadcrumb.js
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import Link from 'next/link';
import {usePathname, useRouter} from "next/navigation";
import classNames from "classnames";
import { Key } from 'react';

const BreadcrumbAuto = () => {
    const pathname = usePathname();
    const router = useRouter();
    const pathSegments = pathname.split('/').filter((segment) => segment);

    const createBreadcrumbLink = (segments: any[], index: number) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        const isActive = index === segments.length - 1;
        return (

                <li key={index}>
                    <div className="flex items-center">
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 9 4-4-4-4"/>
                        </svg>
                        <div onClick={(e) => {
                            e.preventDefault();
                            !isActive && router.push(path);
                        }}
                           className={classNames( !isActive ?"cursor-pointer  ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white": "ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400")}>                {decodeURIComponent(segments[index])}
                        </div>
                    </div>
                </li>

    );
    };

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse cursor-default">
                <li className="inline-flex items-center">
                    <div onClick={() => router.push('/')}
                       className="cursor-pointer inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Home
                    </div>
                </li>
            {pathSegments.map((segment, index) => createBreadcrumbLink(pathSegments, index))}
        </ol>
        </nav>
    );
};

export default BreadcrumbAuto;
