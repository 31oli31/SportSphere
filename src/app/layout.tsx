import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import ProviderClientLayout from "@/components/ClientLayout";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Sportsphere",
    description: "Sportsphere - Your sports community",
};

export default function RootLayout({
       children,
   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de">
        <head>
            <title>Sportsphere</title>
            <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"/>
        </head>
        <body className="h-screen w-screen max-w-screen max-h-screen flex flex-col  bg-gray-100">
        <ProviderClientLayout>
            {children}
        </ProviderClientLayout>
        </body>
        </html>
    );
}
