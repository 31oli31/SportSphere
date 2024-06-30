import {createContext, ReactNode, useContext, useEffect} from 'react';
import {useImmer} from 'use-immer';
import {gql} from '@/graphql/__generated__';
import {Space, User} from "@/graphql/__generated__/graphql";
import {useApolloClient} from "@apollo/client";
import {useSession} from "next-auth/react";

interface SpaceShort {
    id: string;
    name: string;
}

interface UserSession {
    id: string;
    username: string;
    email?: string | null
    createdAt: string;
    updatedAt: string;
    isGuest: boolean;
    adminSpaces: SpaceShort[];
    userSpaces: SpaceShort[];
}


export interface DataContextProps {
    spaces: SpaceShort[];
    user: UserSession | null;
    spaceDetails: Record<string, Space>;
    getDetails: (space: string, refetch?: boolean) => Promise<Space> | undefined;
    getSpaceShort: (spaceName: string) => SpaceShort | undefined;
    refreshSpace: (refresh: string) => void;
}

const REFRESH_SPACE = gql(`query space($name: String!) {
    space(name: $name) {
      id
      name
      createdAt
      updatedAt
      games {
        id
        teamAScore
        teamBScore
        teamA {
          name
        }
        teamB {
          name
        }
      }
      players {
          id
          name
      }
      teams {
        id
        name
        playerTeams {
          id
          player {
            id
            name
          }
        }
      }
      admin {
        id
        username
      }
      sports {
        id
        name
      }
    }
  }`
);

const REFRESH_USER = gql(`query user($id: String!) {
    user(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
      isGuest
      adminSpaces {
        id
        name
      }
      userSpaces {
        id
        name
      }
    }
  }`
);

const SPACE_LIST = gql(`query GetSpaces {
    spaces {
        id
        name
    }
}`);

const DataContext = createContext<DataContextProps>({
    spaces: [],
    user: null,
    spaceDetails: {},
    getDetails: () => undefined,
    getSpaceShort: () => undefined,
    refreshSpace: () => {
    },
});

export function useData(): DataContextProps {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}

interface SpaceDataProviderProps {
    updateHeaders: (headers: Record<string, string>) => void;
    headers: Record<string, string>;
    children: ReactNode;
}

export function DataProvider({children, headers, updateHeaders}: SpaceDataProviderProps) {
    const nextauth = useSession();
    const apolloClient = useApolloClient();
    const [spaces, updateSpaces] = useImmer<SpaceShort[]>([]);
    const [user, updateUser] = useImmer<UserSession|null>(null)
    const [spaceDetails, updateSpaceDetails] = useImmer<Record<string, Space>>({});

    const getSpaceShort = (spaceName: string) => {
        return spaces.find(space => space.name === spaceName);
    }

    const getDetails = async (space: string, refetch: boolean = false): Promise<Space> => {

        if (spaceDetails[space] && !refetch) {
            return spaceDetails[space];
        }
        const spaceData = await apolloClient.query({
            query: REFRESH_SPACE,
            variables: {name: space},
            fetchPolicy: "no-cache"
        });

        updateSpaceDetails((draft: any) => {
                draft[space] = spaceData.data.space;
            });

        return  spaceData.data.space as Space;
    }

    const refreshSpace = async (space: string) => {
        const newSpace = await apolloClient.query({
            query: REFRESH_SPACE,
            variables: {name: space}
        })

        if (newSpace.data.space) {
            updateSpaceDetails((draft: any) => {
                draft[space] = newSpace.data.space;
            });
        }
    }


    const refreshUser = async (id: string) => {

        const newUser = await apolloClient.query({
            query: REFRESH_USER,
            variables: {id: id}
        })
        console.log(newUser)

        if (newUser.data.user) {
            updateUser({
                id: newUser.data.user.id,
                username: newUser.data.user.username,
                email: newUser.data.user.email,
                createdAt: newUser.data.user.createdAt,
                updatedAt: newUser.data.user.updatedAt,
                isGuest: newUser.data.user.isGuest,
                adminSpaces: newUser.data.user.adminSpaces,
                userSpaces: newUser.data.user.userSpaces,
            });
        }
    }

    useEffect(() => {
        (async () => {
            if (spaces.length === 0 && headers.authorization) {
                const space = await apolloClient.query({
                    query: SPACE_LIST
                });
                if (space.data.spaces) {
                    updateSpaces(space.data.spaces);
                }
            }
        })();
    }, [spaces.length, updateSpaces, headers, apolloClient]);

    useEffect(() => {
        updateSpaceDetails({});
        updateSpaces([]);
        updateUser(null);
        if(nextauth.data?.user.token && updateHeaders){
            refreshUser(nextauth.data?.user.id);
            updateHeaders({"authorization": nextauth.data?.user.token ?? ""});
        }
    }, [nextauth.data?.user.token]);

    return (
        <DataContext.Provider
            value={{
                spaces,
                user,
                spaceDetails,
                refreshSpace,
                getSpaceShort,
                getDetails,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
