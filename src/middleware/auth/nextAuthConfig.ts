import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {CREDENTIALS_LOGIN, GUEST_LOGIN} from '@/middleware/auth/constants';
import {gql} from '@/graphql/__generated__/gql';

const LOGIN_QUERY = `mutation userLogin($password: String!, $email: String!) {
  userLogin(password: $password, email: $email) {
      id,
      username,
      token,
      email,
      spaces,
      isGuest,
  }   
}`;

const LOGIN_GUEST_QUERY = `query guestLogin($password: String!, $spaceName: String!) {
  guestLogin(password: $password, spaceName: $spaceName) {
      id,
      username,
      token,
      email,
      spaces,
      isGuest,
  }   
}`;

const GQL_LOGIN_QUERY = gql(LOGIN_QUERY);
const GQL_LOGIN_GUEST_QUERY = gql(LOGIN_GUEST_QUERY);


const loginUser = async ({email, password}: { email: string, password: string }) => {
    try {
        const raw = JSON.stringify({
            query: LOGIN_QUERY,
            variables: {
                email,
                password,
            },
        });
        const response = await fetch(process.env.NEXTAUTH_URL + '/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        });

        if (!response.ok) {
            return null;
        }

        const {data} = await response.json();
        return data?.userLogin;
    } catch (e) {
        console.log(e)
    }
};


const loginGuestUser = async ({password, space}: { password: string, space: string }) => {
    try {
        console.log(password, space, "loginGuestUser")
        const raw = JSON.stringify({
            query: LOGIN_GUEST_QUERY,
            variables: {
                password: password,
                spaceName: space
            },
        });
        const response = await fetch(process.env.NEXTAUTH_URL + '/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        });


        if (!response.ok) {
            return null;
        }

        const {data} = await response.json();
        return data?.guestLogin;
    } catch (e) {
        console.log(e)
    }
};

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            id: CREDENTIALS_LOGIN,
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials, req) {
                if (credentials?.email && credentials?.password) {
                    const result = await loginUser({
                        email: credentials.email,
                        password: credentials.password,
                    });
                    return result;
                }
                return null;
            },
        }),
        CredentialsProvider({
            name: 'Guest Login',
            id: GUEST_LOGIN,
            credentials: {
                space: {label: 'Space', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials, req) {
                if (credentials?.space && credentials?.password) {
                    const result = await loginGuestUser({
                        password: credentials.password,
                        space: credentials.space,
                    });
                    return result;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({session, token, user}) {
            if (token?.user) {
                // @ts-ignore
                session.user = token.user;
            }
            return session;
        },
        async jwt({token, account, user, profile}) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
    useSecureCookies: true
};

