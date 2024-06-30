'use client';
import React from 'react';
import Link from 'next/link';
import { useData } from '@/services/dataProvider/DataProvider';
import { LoadingCircle } from '@/components/LoadingCircle';
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import {Button} from "flowbite-react";

interface PermissionDeniedProps {}

const PermissionDenied: React.FC<PermissionDeniedProps> = () => {
    const router = useRouter();

    const handleSwitchAccount = () => {
        signOut({callbackUrl: '/login',redirect: true})
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 text-gray-800">
            <div className="mx-auto px-4 py-8">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Permission Denied</h1>
                    { (
                        <button
                            onClick={handleSwitchAccount}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
                        >
                            Switch Account
                        </button>
                    )}
                </header>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Access Restricted</h2>
                    <p className="text-gray-600 mb-4">
                        You do not have the necessary permissions to view this space or perform this action.
                        Please switch to an admin account or an account with the required permissions.
                    </p>
                </section>



                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Available Spaces</h2>
                    <p className="text-gray-600 mb-4">
                        Go back to the dashboard to see the spaces available to your account.
                    </p>
                    <Link
                        href="/dashboard"
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
                    >
                        Go to Dashboard
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default PermissionDenied;
