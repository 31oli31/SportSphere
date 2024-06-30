'use client';
import React, { useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import { gql } from "@/graphql/__generated__";
import { useData } from '@/services/dataProvider/DataProvider';
import { Spinner, Modal } from 'flowbite-react';
import MultiSelect from '@/components/MultiSelect';
import { useImmer } from 'use-immer';
import {ButtonLink, Button } from '@/components/Button';
import { FaTrashCan } from "react-icons/fa6";
import { PAGE_ROUTE } from '@/interface/route';

const ADD_MULTIPLE_PLAYERS_TO_TEAM = gql(`
  mutation addMultiplePlayersToTeam($teamId: String!, $playerIds: [String!]!) {
    addMultiplePlayersToTeam(teamId: $teamId, playerIds: $playerIds) {
      success
    }
  }
`);

const REMOVE_PLAYER_FROM_TEAM = gql(`
  mutation removePlayerFromTeam($teamId: String!, $playerId: String!) {
    removePlayerFromTeam(teamId: $teamId, playerId: $playerId) {
      success
    }
  }
`);

const DELETE_TEAM = gql(`
  mutation deleteTeam($teamId: String!) {
    deleteTeam(teamId: $teamId) {
      success
    }
  }
`);

const TeamsPage = ({ params: { space } }: { params: { space: string } }) => {
    const { getDetails, user, } = useData();
    const [teamsData, setTeamsData] = useImmer<any>({});
    const [playerData, setPlayersData] = useState<any>(null);
    const [teamPlayer, setTeamPlayer] = useImmer<Record<string, string[]>>({});
    const [playerToRemove, setPlayerToRemove] = useState<{ teamId: string, playerId: string } | null>(null);

    const [addMultiplePlayersToTeam] = useMutation(ADD_MULTIPLE_PLAYERS_TO_TEAM);
    const [removePlayerFromTeam] = useMutation(REMOVE_PLAYER_FROM_TEAM);
    const [deleteTeam] = useMutation(DELETE_TEAM);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const spaceDetails = await getDetails(space);
                if (spaceDetails) {
                    const obj = spaceDetails.teams.reduce((acc: any, team: any) => {
                        acc[team.id] = team;
                        return acc;
                },{});
                    setTeamsData(obj);
                    setPlayersData(spaceDetails.players);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    const handleAddPlayers = async (teamId: string) => {
        if (!teamPlayer[teamId]) return;

        try {
            await addMultiplePlayersToTeam({ variables: { teamId: teamId, playerIds: teamPlayer[teamId] } });
            setTeamPlayer((draft) => {
                draft[teamId] = [];
            });
            const spacedata = await getDetails(space, true);
            spacedata && setTeamsData((draft: any)=> {draft[teamId] = spacedata.teams.find((team: any) => team.id === teamId)});
        } catch (error) {
            console.error('Error adding players to team:', error);
        }
    };

    const handleRemovePlayer = async () => {
        if (playerToRemove) {
            try {
                await removePlayerFromTeam({ variables: { teamId: playerToRemove.teamId, playerId: playerToRemove.playerId } });
                setPlayerToRemove(null);

                const spacedata = await getDetails(space, true);
                spacedata && setTeamsData((draft: any)=> {draft[playerToRemove.teamId] = spacedata.teams.find((team: any) => team.id === playerToRemove.teamId)});

                } catch (error) {
                console.error('Error removing player from team:', error);
            }
        }
    };

    const isAdmin = user && !user.isGuest;
    if (!(Object.entries(teamsData).length > 0)) return <Spinner />;
    return (
        <div className="">
            <div className='flex justify-between items-center'>
            <h1 className="text-3xl font-bold mb-6">Teams</h1>
            <div>
<ButtonLink variant={"outlined"} link={PAGE_ROUTE.SPACE + '/' + space + '/' + PAGE_ROUTE.SPACE_TEAM_CREATE }>Create Team</ButtonLink>

            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Object.values(teamsData)?.map((team: any) => (
                    <div key={team.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-xl font-semibold">Team: {team.name}</h2>

                            {isAdmin && (
                                <Button
                                    color='red'
                                    variant='outlined'
                                    onClick={() => deleteTeam({ variables: { teamId: team.id } })}
                                >
                                    Delete Team
                                </Button>
                            )}
                        </div>

                        <div className="">
                            <h3 className="text-lg font-semibold mb-2   ">Members:</h3>
                            <ul className="list-disc pl-4 space-y-1 overflow-y-auto max-h-40 min-h-40">
                                {team.playerTeams?.map((playerTeam: any) => (
                                    <li key={playerTeam.id} className="flex justify-between items-center">
                                        <span>{playerTeam.player.name}</span>

                                        {isAdmin && (
                                            <Button
                                                color="red"
                                                onClick={() => setPlayerToRemove({ teamId: team.id, playerId: playerTeam.player.id })}
                                            >
<FaTrashCan />                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-grow">
                            <MultiSelect
                                options={playerData?.filter((player: any) => !team.playerTeams.some((pt: any) => pt.player.id === player.id)).map((player: any) => ({ id: player.id, name: player.name })) || []}
                                selectedOptions={teamPlayer[team.id] || []}
                                onSelectionChange={(selected) => setTeamPlayer((draft) => { draft[team.id] = selected; })}
                            />
                        </div>
                        <Button
                                onClick={() => handleAddPlayers(team.id)}
                                className="mt-4"
                                variant="filled"
                                color="black"
                            >
                                Add Selected Players
                            </Button>
                    </div>
                ))}
            </div>

            {playerToRemove && (
                <Modal show={true} onClose={() => setPlayerToRemove(null)}>
                    <Modal.Header>Confirm Removal</Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to remove this player from the team?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={() => setPlayerToRemove(null)}>
                            Cancel
                        </Button>
                        <Button color="red" onClick={handleRemovePlayer}>
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
export default TeamsPage;