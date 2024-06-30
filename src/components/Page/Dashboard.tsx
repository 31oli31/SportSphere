'use client';
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { LoadingCircle } from '@/components/LoadingCircle';
import { useData } from '@/services/dataProvider/DataProvider';
import {PAGE_ROUTE} from "@/interface/route";

interface DashboardProps {}
interface SessionUser {
    id: string;
    username: string;
    email: string | null
    spaces?: string [];
    isGuest: boolean;
}

interface Space {
    name: string;
    // Add more properties as needed
}


const Dashboard: React.FC<DashboardProps> = () => {
    const { spaces, user } = useData();


    if(!spaces || !user) return <LoadingCircle />;


    const generateColor = (str: string): string => {
        const hashCode = str.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);

        const hue = hashCode % 360;
        const saturation = 70;
        const lightness = 80;

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const isUserAdmin = user && !user.isGuest;

    return (
        <div className="pt-8 w-full bg-gray-50 text-gray-800">
            <div className="mx-auto px-4 ">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Sportsphere Dashboard</h1>
                    {!isUserAdmin && (
                        <Link
                            href="/api/auth/signin"
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
                        >
                            Log In
                        </Link>
                    )}
                </header>

                {isUserAdmin ? (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{user.username}</h2>
                        <p className="text-gray-600 mb-4">Email: {user.email}</p>
                    </section>
                ) : (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Guest</h2>
                        <p className="text-gray-600 mb-4">
                            You are currently logged in as a guest user. As a guest user you have only access to the spaces, where you have access rights. You can not create new spaces or sports.
                        </p>
                    </section>
                )}

                {isUserAdmin && (
                    <>
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Create New Space</h2>
                            <p className="text-gray-600 mb-4">You can create a new space to manage your activities.</p>
                            <Link
                                href={PAGE_ROUTE.SPACES_CREATE}
                                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
                            >
                                Create Space
                            </Link>
                        </section>


                    </>
                )}

                {spaces.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Your Spaces</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {spaces.map((space, index) => {
                                const spaceColor = generateColor(space.name);
                                return (
                                    <Link
                                        key={index}
                                        href={`/space/${space.name}`}
                                        passHref
                                    >
                                        <div
                                            className={`block shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 bg-white p-4`}
                                            style={{ borderLeft: `6px solid ${spaceColor}` }}
                                        >
                                            <h3 className="text-xl font-semibold">
                                                {space.name}
                                            </h3>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
