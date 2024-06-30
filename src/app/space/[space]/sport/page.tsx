'use client';

import React, { useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import { useData } from '@/services/dataProvider/DataProvider';
import { Spinner, Modal, Alert } from 'flowbite-react';
import { ButtonLink, Button } from '@/components/Button';
import { PAGE_ROUTE } from '@/interface/route';
import { gql } from "@/graphql/__generated__";
import { LoadingCircle } from '@/components/LoadingCircle';
import Link from 'next/link';

const DELETE_SPORT = gql(`
  mutation deleteSport($sportId: String!) {
    deleteSport(sportId: $sportId) {
      success
    }
  }
`);

const SportPage = ({ params: { space } }: { params: { space: string } }) => {
    const { getDetails, user } = useData();
    const [sportsData, setSportsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteSport] = useMutation(DELETE_SPORT);
    const [sportToDelete, setSportToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const spaceDetails = await getDetails(space);
                if (spaceDetails) {
                    setSportsData(spaceDetails.sports);
                }
            } catch (error) {
                setError('Error fetching sports data.');
            } finally {
                setLoading(false);
            }
        };

        fetchSports();
    }, [getDetails, space]);

    const handleDelete = async () => {
        if (sportToDelete) {
            try {
                await deleteSport({ variables: { sportId: sportToDelete } });
                setSportsData((prevSports) => prevSports.filter((sport) => sport.id !== sportToDelete));
                setSportToDelete(null);
            } catch (error) {
                setError('Error deleting sport.');
            }
        }
    };

    const isAdmin = user && !user.isGuest;

    if (loading) return (
        <LoadingCircle/>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <Alert color="failure">
                <span>{error}</span>
            </Alert>
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Sports</h1>
                {isAdmin && (
                    <ButtonLink variant={"outlined"} link={PAGE_ROUTE.SPACE + '/' + space + '/' + PAGE_ROUTE.SPORT_CREATE}>
                        Create Sport
                    </ButtonLink>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sportsData.map((sport) => (
                    <Link  key={sport.id} href={PAGE_ROUTE.SPACE + '/' + space + PAGE_ROUTE.SPORT + '/' + sport.id} >
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">{sport.name}</h2>
                            <p>Games: {sport?.games?.length ?? 0}</p>
                            </div>
                            {isAdmin && (
                                <Button color="red" variant="outlined" onClick={() => setSportToDelete(sport.id)}>
                                    Delete Sport
                                </Button>
                            )}
                        </div>
                    </div>
                    </Link>

                ))}
            </div>

            {sportToDelete && (
                <Modal show={true} onClose={() => setSportToDelete(null)}>
                    <Modal.Header>Confirm Deletion</Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this sport?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={() => setSportToDelete(null)}>
                            Cancel
                        </Button>
                        <Button color="red" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default SportPage;
