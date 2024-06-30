'use client';
import React from 'react';

const TermsOfService = () => {
    return (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="mb-4">Last updated: [Date]</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p>Welcome to Sportsphere! These terms and conditions outline the rules and regulations for the use of our website.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">2. User Accounts</h2>
                <p>To access certain features, you may be required to create an account. You must provide accurate and complete information and keep your account information updated. You are responsible for maintaining the confidentiality of your account and password.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">3. Acceptable Use</h2>
                <p>You agree not to use the website in any way that is unlawful or harms Sportsphere, its service providers, suppliers, or any other user. Prohibited activities include but are not limited to:</p>
                <ul className="list-disc list-inside">
                    <li>Violating any applicable laws or regulations.</li>
                    <li>Engaging in fraudulent or deceptive practices.</li>
                    <li>Transmitting any harmful or malicious software.</li>
                    <li>Infringing on the intellectual property rights of others.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">4. Termination</h2>
                <p>We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
                <p>In no event shall Sportsphere, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                <ul className="list-disc list-inside">
                    <li>Your access to or use of or inability to access or use the service.</li>
                    <li>Any conduct or content of any third party on the service.</li>
                    <li>Any content obtained from the service.</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at [contact information].</p>
            </section>
        </div>
    );
};

export default TermsOfService;
