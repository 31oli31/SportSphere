'use client';
import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@/graphql/__generated__";
import ButtonLink, { Button } from '@/components/Button';
import { LoadingCircle } from "@/components/LoadingCircle";
import { PAGE_ROUTE } from "@/interface/route";

const GET_TEAM_DETAILS = gql(`
  query getTeamDetails($id: String!) {
    team(id: $id) {
      id
      spaceId
      sportId
      name
      createdAt
      updatedAt
      gamesAsA {
        id
        createdAt
        teamAId
        teamBId
      }
      gamesAsB {
        id
        createdAt
        teamAId
        teamBId
      }
      playerTeams {
        player {
          id
          name
        }
      }
      space {
        id
        name
      }
    }
  }
`);

const TeamDetails = ({ params: { team, space } }: { params: { team: string, space: string } }) => {
  const { loading, error, data } = useQuery(GET_TEAM_DETAILS, {
    variables: { id: team },
    fetchPolicy: 'no-cache'
  });

  if (loading || !data?.team) return <LoadingCircle />;

  const teamData = data.team;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{teamData.name}</h1>
        <ButtonLink variant="outlined" link={PAGE_ROUTE.DASHBOARD}>Back to Dashboard</ButtonLink>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
          <p className="font-semibold">Space: <span className="font-normal">{teamData.space.name}</span></p>
          <p className="font-semibold">Sport ID: <span className="font-normal">{teamData.sportId || "N/A"}</span></p>
          <p className="font-semibold">Created At: <span className="font-normal">{new Date(teamData.createdAt).toLocaleString()}</span></p>
          <p className="font-semibold">Updated At: <span className="font-normal">{new Date(teamData.updatedAt).toLocaleString()}</span></p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Members</h2>
          <ul className="list-disc pl-5 space-y-1">
            {teamData.playerTeams.map((playerTeam) => (
              <li key={playerTeam.player.id}>{playerTeam.player.name}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Games</h2>
          <div>
            <h3 className="text-lg font-medium mt-2">As Team A</h3>
            <ul className="list-disc pl-5 space-y-1">
              {teamData.gamesAsA.map((game) => (
                <li key={game.id}>
                  Game on {new Date(game.createdAt).toLocaleString()} against Team ID: {game.teamBId}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mt-2">As Team B</h3>
            <ul className="list-disc pl-5 space-y-1">
              {teamData.gamesAsB.map((game) => (
                <li key={game.id}>
                  Game on {new Date(game.createdAt).toLocaleString()} against Team ID: {game.teamAId}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
