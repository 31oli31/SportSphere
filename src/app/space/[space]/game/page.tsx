'use client';

import React from 'react';
import {DocumentNode, useMutation, useQuery} from '@apollo/client';
import {gql} from '@/graphql/__generated__/gql';
import { useRouter } from 'next/router';
import {ButtonLink} from "@/components/Button";
import {dynamicRoutePage, PAGE_ROUTE} from "@/interface/route";

const GET_GAMES_SPACE_PAGINATED = gql(`query getGamesSpacePaginated($spaceName: String!, $skip: Int!, $take: Int!) {
    getGamesSpacePaginated(spaceName: $spaceName, skip: $skip, take: $take) {
        id
        teamAId
        teamA {
            name
        }
        teamBId
        teamB {
            name
        }
        teamAScore
        teamBScore
        sport {
            name
        }
        gameDate
    }
}`)  ;

const DELETE_GAME_BY_ID = gql(`mutation deleteGameById($id: String!) {
    deleteGameById(id: $id) {
        success
    }
}`);

const SpaceOverviewPage = ({params: {space}}: { params: { space: string } }) => {
    const [skip, setSkip] = React.useState(0);
    const [deleteGameById] = useMutation(DELETE_GAME_BY_ID);
    const {data, loading, refetch} = useQuery(GET_GAMES_SPACE_PAGINATED, {
        variables: {
            spaceName: space,
            skip: skip,
            take: 10,
        },
    });

    const handleDelete = async (id: string) => {
        await deleteGameById({variables: {id: id}});
        await refetch( {spaceName: space, skip: skip, take: 10});
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6">Space Overview</h1>
                <div className={"flex flex-end flex-col w-full"}>
                <ButtonLink link={dynamicRoutePage(PAGE_ROUTE.SPACE_GAMES_CREATE, {space: space})}>
                    Spiel erstellen
                </ButtonLink>
                </div>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Games</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.getGamesSpacePaginated.map((game) => (
                            <div key={game.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-2">
                                    <div>{game.teamA.name} vs. {game.teamB.name}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(game.id)}
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <div>Score: {game.teamAScore} - {game.teamBScore}</div>
                                </div>
                                <div className="text-sm text-gray-400">{new Date(game.gameDate).toLocaleDateString()}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SpaceOverviewPage;
