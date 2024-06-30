'use client'
import { useQuery} from "@apollo/client";
import { gql } from '@/graphql/__generated__/gql';
import {Breadcrumb, Button} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import BreadcrumbAuto from "@/components/BreadcrumbAuto";
import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

const GET_SPACES = gql(`query spaces {
    spaces {
        id
        name
    }
}`);

const SpacesPage = () => {
    const { loading, error, data } = useQuery(GET_SPACES);
const router = useRouter();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

  return (
    <div>
        <BreadcrumbAuto/>
        {loading && <p>Loading...</p>}
        {error && <p>Error :(</p>}
        {data &&
            <ul>
                <button type="button"
                        onClick={() => router.push('/spaces/create')}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
Create Space
                </button>
                {data?.spaces.map((space) => (
                    <li key={space.id}>
                        <a>{space.name}</a>
                    </li>
                ))}
            </ul>}
    </div>
  );
};

export default SpacesPage;
