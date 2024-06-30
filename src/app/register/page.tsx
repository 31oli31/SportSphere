'use client';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import BreadcrumbAuto from '@/components/BreadcrumbAuto';
import { useRouter } from 'next/navigation';

const REGISTER_USER = gql(`
    mutation createUser(
        $username: String!,
        $email: String,
        $password: String) {
        createUser(
            username: $username,
            email: $email,
            password: $password
        ){
            username
            email
        }
    }
`);

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const validatePassword = (password: string) => {
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegEx.test(password);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setPasswordError(
                'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.'
            );
            return;
        }
        try {
            await registerUser({ variables: { username, email, password } });
            router.push('/login'); // Redirect to login page after successful registration
        } catch (err) {
            console.error('Error registering user:', err);
        }
    };

    return (
        <div className="container mt-4 mx-auto">
            <div className="mx-6">
                <BreadcrumbAuto />
                <div className="mx-auto mt-4 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(null);
                                }}
                                className={`mt-1 p-2 block w-full border ${
                                    passwordError ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                required
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                            )}
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">
                                    Error registering user: {error.message}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
