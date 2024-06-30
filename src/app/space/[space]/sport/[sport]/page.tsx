'use client';
import React from 'react';
import { Card, Spinner, Alert } from 'flowbite-react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { Player, Team, Game } from '@/graphql/__generated__/graphql'; // Adjust based on your schema
import BreadcrumbAuto from '@/components/BreadcrumbAuto';
import { LoadingCircle } from '@/components/LoadingCircle';

const GET_SPORT_DETAILS = gql`
  query GetSportDetails($sport: String!) {
    sport(id: $sport) {
      id
      name
      createdAt
      updatedAt
      games {
        id
        teamAScore
        teamBScore
        teamA {
          id
          name
          playerTeams {
            player {
              id
              name
            }
          }
        }
        teamB {
          id
          name
          playerTeams {
            player {
              id
              name
            }
          }
        }
      }
    }
  }
`;

interface SportDetailPageProps {
  params: {
    sport: string;
  };
}

const SportDetailPage: React.FC<SportDetailPageProps> = ({ params: { sport } }) => {
  const { loading, error, data } = useQuery(GET_SPORT_DETAILS, {
    variables: { sport },
  });

  if (loading) return <LoadingCircle />;

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <Alert color="failure">
        <span>Error loading data.</span>
      </Alert>
    </div>
  );

  const sportDetails = data?.sport;

  console.log(sportDetails)

  // Extracting players from teams
  const players: Player[] = [];


  // Mapping games to include team names and player names
  const games: Game[] = sportDetails.games.map((game: Game) => ({
    ...game,
    teamA: {
      id: game.teamA.id,
      name: game.teamA.name,
      players: game.teamA.playerTeams.map((pt) => pt.player.name).join(', ')
    },
    teamB: {
      id: game.teamB.id,
      name: game.teamB.name,
      players: game.teamB.playerTeams.map((pt) => pt.player.name).join(', ')
    }
  }));

  return (
    <div className="">

      <h1 className="text-3xl font-bold mt-4 mb-6">Sport Overview: {sportDetails.name}</h1>

      {/* Players Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Players</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.map((player: Player) => (
            <Card key={player.id} className="p-4">
              <h3 className="text-xl font-semibold">{player.name}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* Teams Section
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Teams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sportDetails.teams.map((team: Team) => (
            <Card key={team.id} className="p-4">
              <h3 className="text-xl font-semibold">{team.name}</h3>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Games Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game: Game) => (
            <Card key={game.id} className="p-4">
              <h3 className="text-xl font-semibold">Game: {game.id}</h3>
              <p><strong>Team A:</strong> {game.teamA.name}</p>
{/*              <p><strong>Players:</strong> {game.teamA.playerTeams.map((player, index) => <p key={index}>player.name</p>)}</p>*/}
              <p><strong>Team B:</strong> {game.teamB.name}</p>
            {/*      <p><strong>Players:</strong> {game.teamB.playerTeams.map((player, index) => <p key={index}>player.name</p>)}</p>*/}
              <p><strong>Score:</strong> {game.teamBScore}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SportDetailPage;
