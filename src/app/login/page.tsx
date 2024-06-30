'use client';
import {Suspense, useEffect, useState} from "react";
import {gql} from "@/graphql/__generated__";
import {useQuery} from "@apollo/client";
import {signIn} from "next-auth/react";
import {CREDENTIALS_LOGIN, GUEST_LOGIN} from "@/middleware/auth/constants";
import {PAGE_ROUTE} from "@/interface/route";
import {useSearchParams} from "next/navigation";
import {LoadingCircle} from "@/components/LoadingCircle";

const GET_SPACES = gql(`
  query spaces {
    spaces {
      id
      name
    }
  }
`);


const LoginComponent = () => {
    const [guestLogin, setGuestLogin] = useState(false);
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get('callbackUrl') ?? "/dashboard";


    return (
        <div className={"px-4 w-full"}>
            <div className="max-w-md w-full mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 mx-auto min-mx-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login</h1>
                <div className={"my-4"}>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={guestLogin} onChange={() => setGuestLogin(!guestLogin)}
                               className="sr-only peer"/>
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Gast Login</span>
                    </label>
                </div>
                {guestLogin ? <LoginGuest url={callbackUrl}/> : <LoginUser url={callbackUrl}/>}
            </div>
        </div>
    );
};


const LoginGuest = ({url}: { url: string }) => {
    const [password, setPassword] = useState("");
    const {data} = useQuery(GET_SPACES);
    const [space, setSpace] = useState<string>("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (url && !space) {
            const initSpace = url.split('/');
            const spaceIndex = initSpace.findIndex((element) => element === 'space');
            if (spaceIndex !== -1 && initSpace[spaceIndex + 1]) {
                setSpace(initSpace[spaceIndex + 1]);
            }
        }
    }, [space, url]);

    const handleLogin = async () => {
        setLoading(true);
        signIn(GUEST_LOGIN, {
            redirect: true,
            password,
            space,
            callbackUrl: PAGE_ROUTE.SPACE + '/' + space,
        });
        setLoading(false);
    };


    return (
        <div>
                <>
                    <label htmlFor="space" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Space
                    </label>
                    <input
                        type="text"
                        id="space"
                        value={space}
                        onChange={(e) => setSpace(e.target.value)}
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
            </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
                Login
            </button>
        </div>
    );
}

const LoginUser = ({url}: { url: string }) => {
    const [password, setPassword] = useState("");
    const {data} = useQuery(GET_SPACES);
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async () => {
        setLoading(true);
        signIn(CREDENTIALS_LOGIN, {
            redirect: true,
            email,
            password,
            callbackUrl: url,
        });
        setLoading(false);
    };

    return <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
        </label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
        </label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
            Login
        </button>
    </div>
}

const Login = () => {
    return (
        <Suspense fallback={
            <LoadingCircle/>
        }>
            <LoginComponent/>
        </Suspense>
    );
};

export default Login;
