'use client'
import React, {useState} from 'react';
import {ApolloError, useMutation} from "@apollo/client";
import {gql} from "@/graphql/__generated__";
import BreadcrumbAuto from "@/components/BreadcrumbAuto";
import {useRouter} from "next/navigation";
import { useData } from '@/services/dataProvider/DataProvider';

const CREATE_SPACE = gql(`mutation createSpace($name: String!, $adminId: String!, $privatePassword: String!) {
  createSpace(name: $name, adminId: $adminId, privatePassword: $privatePassword) {
    name
  }
}`);

type GraphQLError = {
    message: string;
    extensions?: {
        originalError?: {
            message: string;
        };
    };
};

const CreateSpacePage: React.FC = () => {
    const router = useRouter();
    const {user}  = useData();
    const [createSpace, { data, loading, error }] = useMutation(CREATE_SPACE);
    const [spaceName, setSpaceName] = useState<string>('');
    const [privatePassword, setPrivatePassword] = useState<string>('');
    const [adminPasswordError, setAdminPasswordError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpaceName(e.target.value);
    };

    const validatePassword = (password: string) => {
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegEx.test(password);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validatePassword(privatePassword)) {
            setAdminPasswordError('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.');
            return;
        }
        if(!user?.id) return;
        try {
            const space =  await createSpace({ variables: { name: spaceName, adminId: user.id,privatePassword: privatePassword } });
            router.push('/dashboard'); // Redirect to the newly created space using the Next.js
        } catch (err) {
            console.error('Error creating space:', err);
        }
    };


    const getErrorMessage = (error: ApolloError): string | null => {
        if (!error) return null;
        const graphQLError = error.graphQLErrors[0] as GraphQLError;
        return graphQLError.extensions?.originalError?.message || graphQLError.message || 'An error occurred';
    };


    return (
        <div className="container mt-4 mx-auto ">
        <div className="mx-6 ">
            <BreadcrumbAuto />
        <div className="mx-auto mt-4 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Space</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="spaceName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Space Name</label>
                    <input
                        type="text"
                        id="spaceName"
                        name="spaceName"
                        value={spaceName}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
           
                <div className="mb-4">
                        <>
                            <label htmlFor="privatePassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">Private Access Password</label>
                            <input
                                type="password"
                                id="privatePassword"
                                name="privatePassword"
                                value={privatePassword}
                                onChange={(e) => setPrivatePassword(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        {loading ? 'Creating...' : 'Create Space'}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">Error creating space: {getErrorMessage(error)}</p>}
                </div>
            </form>
        </div>
        </div>

        </div>
    );
};

export default CreateSpacePage;