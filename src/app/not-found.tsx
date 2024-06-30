'use client';
import React from 'react';
import {ButtonLink} from "@/components/Button";
import {PAGE_ROUTE} from "@/interface/route";

const StartPage = () => {
    return (
        <div>
            <section className="text-center my-8">
                <h2 className="text-4xl font-bold">Welcome to Sportsphere</h2>
                <p className="text-xl mt-4">Track your game results, create spaces, manage teams and more.</p>
                <div className="mt-6 flex justify-center space-x-4">
                    <ButtonLink link={PAGE_ROUTE.LOGIN} className="bg-blue-500 text-white px-4 py-2 rounded">Get
                        Started</ButtonLink>
                    <ButtonLink link="#about" className="bg-gray-300 px-4 py-2 rounded">Learn More</ButtonLink>
                </div>
            </section>

            <section id="about" className="bg-white p-6 rounded-lg shadow-md my-8 max-w-4xl">
                <h3 className="text-3xl font-semibold mb-4">What is Sportsphere?</h3>
                <p className="text-lg mb-6">A website for various sports to track game results. Users can create spaces,
                    each containing multiple sports and teams, and track the results of players and teams within each
                    space.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-100 rounded">
                        <h4 className="text-xl font-semibold mb-2">Create Spaces</h4>
                        <p>Manage your teams and events in dedicated spaces.</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded">
                        <h4 className="text-xl font-semibold mb-2">Track Results</h4>
                        <p>Keep track of players and teams performance.</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded">
                        <h4 className="text-xl font-semibold mb-2">Multiple Sports</h4>
                        <p>Supports a wide range of sports.</p>
                    </div>
                </div>
            </section>

            <section className="text-center my-8 bg-blue-500 text-white p-6 rounded-lg shadow-md max-w-4xl">
                <h3 className="text-3xl font-semibold">Start Your Sports Journey Today!</h3>
                <div className="mt-6 flex justify-center space-x-4">
                    <ButtonLink link={PAGE_ROUTE.LOGIN} className="bg-white text-blue-500 px-4 py-2 rounded">Sign
                        Up</ButtonLink>
                    <ButtonLink link={PAGE_ROUTE.LOGIN} className="bg-gray-100 text-blue-500 px-4 py-2 rounded">Guest
                        Login</ButtonLink>
                </div>
            </section>
        </div>
    );
};

export default StartPage;
