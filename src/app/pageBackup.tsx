'use client';

import React, { useEffect, useState } from 'react';
import {  useQuery } from '@apollo/client';
import { ButtonLink } from "@/components/Button";
import { PAGE_ROUTE } from "@/interface/route";
import { PaginatedTable } from '@/components/PaginatedTable';
import {gql} from "@/graphql/__generated__";
import {useSession} from "next-auth/react";

const GET_SPACES_PAGINATED = gql(`
  query spacesPaginated($take: Int!, $skip: Int!) {
    spacesPaginated(skip: $skip, take: $take) {
      id
      name
    }
  }
`);

const GET_SPACE_COUNT = gql(`
  query spaceCount {
    spaceCount {
      result
    }
  }
`);

const PAGINATION = 1;

const StartPage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_SPACES_PAGINATED, { variables: { take: PAGINATION, skip: 0 } });
  const { data: spaceCountData } = useQuery(GET_SPACE_COUNT);
  const [skip, setSkip] = useState(0);


  const handleLoadMore = async () => {
    const skipEntries = skip + PAGINATION;
    await fetchMore({
      variables: {
        skip: skipEntries,
        take: PAGINATION,
      },
    });
    setSkip(skipEntries);
  };

  const handleLoadMoreTable = async (skipEntries: any, pageSize: any) => {
    await fetchMore({
      variables: {
        skip: skipEntries,
        take: PAGINATION,
      },
    });
  };

  useEffect(() => {
    console.log(data, loading);
    console.log(spaceCountData);
  }, [data, spaceCountData, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col p-6">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Sports Sphere Dashboard</h1>
        <nav className="flex space-x-4">
          <ButtonLink link={PAGE_ROUTE.SPACE} >Space Overview</ButtonLink>
          <ButtonLink link={PAGE_ROUTE.PLAYER} >Player Overview</ButtonLink>
          <ButtonLink link={PAGE_ROUTE.SPORT} >Sport Overview</ButtonLink>
        </nav>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Your Spaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-2">Create a New Space</h3>
            <p>Create and manage new spaces for your teams and events. Each space can host multiple teams, players, and games.</p>
            <div className="flex items-center mt-4">
              <input type="text" className="bg-gray-50 p-2 rounded-lg mr-2 w-full" placeholder="Space Name" />
              <button className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg transition duration-300">Create</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg  border border-gray-100">
            <h3 className="text-xl font-semibold mb-2">Your Spaces</h3>
            <p>View and manage all your existing spaces. Keep track of teams, players, and games within each space.</p>
            <button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg mt-4 transition duration-300">Manage Spaces</button>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Governance Overview</h2>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">Recent Proposals</h3>
          <button onClick={handleLoadMore} className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300">Load More</button>
        </div>
        <PaginatedTable 
          data={data?.spacesPaginated.map(space => [space.name]) ?? []}
          pageSize={PAGINATION}
          columns={["Name"]}
          callBack={handleLoadMoreTable}
          total={spaceCountData?.spaceCount.result ?? 0}
        />
      </section>
    </div>
  );
};

export default StartPage;
