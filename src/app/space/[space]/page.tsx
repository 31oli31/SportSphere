'use client';
import React from 'react';
import { useData } from '@/services/dataProvider/DataProvider';
import { ButtonLink } from '@/components/Button';
import { dynamicRoutePage, PAGE_ROUTE } from '@/interface/route';
import { Card, ListGroup } from 'flowbite-react';
import Link from 'next/link';
import { Space } from '@/graphql/__generated__/graphql';
import { LoadingCircle } from '@/components/LoadingCircle';
import styles from "./space.module.scss";
import classNames from 'classnames';

const SpaceOverviewPage = ({ params: { space } }: { params: { space: string } }) => {
    const { getDetails } = useData();
    const [currentSpace, setSpaceData] = React.useState<Space|null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);



    React.useEffect(() => {
        const fetchSpaceOverview = async () => {
            try {
                const spaceData = await getDetails(space);
                if(!spaceData) throw new Error('Space not found.');
                setSpaceData(spaceData);
            } catch (err) {
                setError('Error loading data.');
            } finally {
                setLoading(false);
            }
        };

        fetchSpaceOverview();
    }, [getDetails, space]);

    if (loading) return (
        <LoadingCircle />
    );
    


    return (
        <>
            {currentSpace && (
                <div className="">
                    <h1 className="text-3xl font-bold mb-6">Space Overview</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className={`${styles.cardBackground} ${styles.cardTeams} mb-8`}>
                            <div className={classNames(styles.cardContent, "flex gap-4 flex-col h-full")}>
                                <h2 className="text-2xl font-semibold mb-4">Teams</h2>
                                <div className="flex-grow">
                                <ListGroup className='max-h-50 overflow-auto'>
                                    {currentSpace.teams.map((team) => (
                                        <Link key={team.id} href={`/space/${space}/team/${team.id}`} passHref>
                                            <ListGroup.Item  className="cursor-pointer">
                                                {team.name}
                                            </ListGroup.Item>
                                        </Link>
                                    ))}
                                </ListGroup>
                                </div>
                                <div className="flex justify-between">
                                    <ButtonLink variant={"outlined"} 
                                        link={dynamicRoutePage(PAGE_ROUTE.SPACE_TEAM_CREATE, { space: currentSpace.name })}
                                    >
                                        Create Team
                                    </ButtonLink>
                                    <ButtonLink
                                        link={dynamicRoutePage(PAGE_ROUTE.SPACE_TEAM, { space: currentSpace.name })}
                                    >
                                        View Teams
                                    </ButtonLink>
                                </div>
                            </div>
                        </Card>

                        <Card className={`${styles.cardBackground} ${styles.cardPlayers} mb-8`}>
                        <div className={classNames(styles.cardContent, "flex gap-4 flex-col h-full")}>
                        <h2 className="text-2xl font-semibold mb-4">Players</h2>
                                <div className="flex-grow">

                                <ListGroup className='max-h-50 overflow-auto'>
                                    {currentSpace.players.map((player) => (
                                        <Link key={player.id} href={`/space/${space}/player/${player.id}`} passHref>
                                            <ListGroup.Item  className="cursor-pointer">
                                                {player.name}
                                            </ListGroup.Item>
                                        </Link>
                                    ))}
                                </ListGroup>
                                </div>
                                <div className="flex justify-between">
                                    <ButtonLink variant={"outlined"}  link={PAGE_ROUTE.PLAYER_CREATE}>Create Player</ButtonLink>
                                    <ButtonLink link={PAGE_ROUTE.PLAYER}>View Players</ButtonLink>
                                </div>
                            </div>
                        </Card>

                        <Card className={`${styles.cardBackground} ${styles.cardGames} mb-8`}>
                        <div className={classNames(styles.cardContent, "flex gap-4 flex-col h-full")}>
                        <h2 className="text-2xl font-semibold mb-4">Games</h2>
                                <div className="flex-grow">

                                <ListGroup className='max-h-50 overflow-auto'>
                                    {currentSpace.games.map((game) => (
                                        <Link key={game.id} href={`/space/${space}/game/${game.id}`} passHref>
                                            <ListGroup.Item  className="cursor-pointer">
                                                {game.teamA.name} vs. {game.teamB.name}: {game.teamAScore} - {game.teamBScore}
                                            </ListGroup.Item>
                                        </Link>
                                    ))}
                                </ListGroup>
                                </div>
                                <div className="flex justify-between">
                                    <ButtonLink
                                    variant={"outlined"} 
                                        link={dynamicRoutePage(PAGE_ROUTE.SPACE_GAMES_CREATE, { space: currentSpace.name })}
                                    >
                                        Create Game
                                    </ButtonLink>
                                    <ButtonLink
                                        link={dynamicRoutePage(PAGE_ROUTE.SPACE_GAMES, { space: currentSpace.name })}
                                    >
                                        View Games
                                    </ButtonLink>
                                </div>
                            </div>
                        </Card>

                        <Card className={`${styles.cardBackground} ${styles.cardSports} mb-8`}>
                        <div className={classNames(styles.cardContent, "flex gap-4 flex-col h-full")}>
                        <h2 className="text-2xl font-semibold mb-4">Sports</h2>
                                <div className="flex-grow">

                                <ListGroup className='max-h-50 overflow-auto'>
                                    {currentSpace.sports.map((sport) => (
                                        <Link key={sport.id} href={`/space/${space}/sport/${sport.id}`} passHref>
                                            <ListGroup.Item  className="cursor-pointer">
                                                {sport.name}
                                            </ListGroup.Item>
                                        </Link>
                                    ))}
                                </ListGroup>
                                </div>
                                <div className="flex justify-between">
                                    <ButtonLink variant={"outlined"} link={dynamicRoutePage(PAGE_ROUTE.SPACE_SPORT_CREATE, { space: currentSpace.name })}>Create Sport</ButtonLink>
                                    <ButtonLink link={dynamicRoutePage(PAGE_ROUTE.SPACE_SPORT, { space: currentSpace.name })}>View Sports</ButtonLink>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};



export default SpaceOverviewPage;
