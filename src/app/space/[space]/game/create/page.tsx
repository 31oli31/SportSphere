'use client';
// CreateGamePage.tsx

import React from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {useImmer} from "use-immer";
import {useData} from "@/services/dataProvider/DataProvider";
import {gql} from "@/graphql/__generated__"; // Make sure to install axios using npm or yarn


const CREATE_GAME = gql(`mutation createGame($teamAId: String!, $teamBId: String!, $teamAScore: Int!, $teamBScore: Int!, $spaceName: String!, $sportId: String!, $gameDate: String!) {
    createGame(teamAId: $teamAId, teamBId: $teamBId, teamAScore: $teamAScore, teamBScore: $teamBScore, spaceName: $spaceName, sportId: $sportId, gameDate: $gameDate) {
        success
    }
}`);


const GET_SPORTS = gql(`query sports {
    sports {
        id
        name
    }
    }`);

const GET_SPORT_TEAMS = gql(`query teamsBySpaceName($spaceName: String!) {
    teamsBySpaceName(spaceName: $spaceName) {
        id
        name
        sportId
    }
    }`);

interface GameForm {
    sportId?: string;
    teamAId?: string;
    teamBId?: string;
    gameDate?: string;
    scoreAId?: number;
    scoreBId?: number;
}

const CreateGamePage = ({params: {space}}: { params: { space: string } }) => {
    const {data: teamsData} = useQuery(GET_SPORT_TEAMS, {variables: {spaceName: space}});
    const [createGameHistory, {data, loading, error}] = useMutation(CREATE_GAME);
    const {data: sports, loading: loadingSports, error: errorSports} = useQuery(GET_SPORTS);
    const [gameForm, updateGameForm] = useImmer<GameForm>({});
    const handleSportId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        updateGameForm(draft => {
            draft.sportId = value
        });
    }

    const handleTeamAId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        updateGameForm(draft => {
            draft.teamAId = value
        });
    }

    const handleTeamBId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        updateGameForm(draft => {
            draft.teamBId = value
        });
    }



    const handleGameDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        updateGameForm(draft => {
            draft.gameDate = value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(space, gameForm);
        if(!gameForm.sportId || !gameForm.teamAId || !gameForm.teamBId || !gameForm.gameDate ) return console.error('Game data not available');

        try {
            const response = await createGameHistory({
                variables: {
                    teamAId: gameForm.teamAId,
                    teamBId: gameForm.teamBId,
                    teamAScore: gameForm.scoreAId ?? 0,
                    teamBScore: gameForm.scoreBId ?? 0,
                    spaceName: space,
                    sportId: gameForm.sportId,
                    gameDate: gameForm.gameDate
                }
            });
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Create New Game</h1>
            <form onSubmit={handleSubmit}>

                {sports?.sports && <div className="mb-4">
                    <label htmlFor="sportId" className="block mb-2 font-semibold">Sport</label>
                    <select
                        id="sportId"
                        value={gameForm.sportId || ''}
                        onChange={handleSportId}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="">Select Sport</option>
                        {sports.sports.map((sport: any) => (
                            <option key={sport.id} value={sport.id}>{sport.name}</option>
                        ))}
                    </select>
                </div>
                }
                {gameForm.sportId && teamsData?.teamsBySpaceName &&

                    <>
                        <div className="mb-4">
                            <label htmlFor="teamA" className="block mb-2 font-semibold">Team A</label>
                            <select
                                id="teamA"
                                value={gameForm.teamAId || ''}
                                onChange={handleTeamAId}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select Team</option>
                                {teamsData?.teamsBySpaceName.filter(team => team.sportId === gameForm.sportId).filter(team => team.id !== gameForm.teamBId).map((team: any) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="teamB" className="block mb-2 font-semibold">Team B</label>
                            <select
                                id="teamB"
                                value={gameForm.teamBId || ''}
                                onChange={handleTeamBId}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select Team</option>
                                {teamsData?.teamsBySpaceName.filter(team => team.sportId === gameForm.sportId).filter(team => team.id !== gameForm.teamAId).map((team: any) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>
                    </>
                }
                <div className="mb-4">
                    <label htmlFor="scoreA" className="block mb-2 font-semibold">Team A Score</label>
                    <input
                        type="number"
                        id="scoreA"
                        value={gameForm.scoreAId || 0}
                        onChange={(e) => updateGameForm(draft => {
                            draft.scoreAId = parseInt(e.target.value)
                        })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />

                </div>
                <div className="mb-4">
                    <label htmlFor="scoreB" className="block mb-2 font-semibold">Team B Score</label>
                    <input
                        type="number"
                        id="scoreB"
                        value={gameForm.scoreBId || 0}
                        onChange={(e) => updateGameForm(draft => {
                            draft.scoreBId = parseInt(e.target.value)
                        })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="gameDate" className="block text-sm font-medium text-gray-700">Game Date</label>
                    <input
                        type="date"
                        id="gameDate"
                        name="gameDate"
                        value={gameForm.gameDate}
                        onChange={handleGameDateChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                    >
                        Create Game
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGamePage;
