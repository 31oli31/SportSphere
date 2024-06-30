'use client';

import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {gql} from "@/graphql/__generated__";
import BreadcrumbAuto from "@/components/BreadcrumbAuto";

const CREATE_PLAYER = gql(`mutation createPlayer($name: String!) {
    createPlayer(name: $name) {
        name
    }
    }`);




const CreateTeamPage = ({params: {space}}: { params: { space: string } }) => {
    const [createPlayer, {data, loading, error}] = useMutation(CREATE_PLAYER);
    const [playerName, setPlayerName] = useState<string |null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPlayerName(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!playerName) return console.error('Player data not available');

        try {
            const response = await createPlayer({
                variables: {
                    name: playerName,
                }
            });
        } catch (error) {
            console.error('Error creating team:', error);
        }
    }
    return (
        <div>
        <BreadcrumbAuto/>

        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Create Team</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="team_name" className="block mb-2 font-semibold">Team Name</label>
                    <input
                        type="text"
                        id="team_name"
                        value={playerName || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <button type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Create
                </button>
            </form>
        </div>
        </div>
    );
};

export default CreateTeamPage;
