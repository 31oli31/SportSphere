/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation createSpace($name: String!, $adminId: String!, $privatePassword: String!) {\n  createSpace(name: $name, adminId: $adminId, privatePassword: $privatePassword) {\n    name\n  }\n}": types.CreateSpaceDocument,
    "query spaces {\n  spaces {\n    id\n    name\n  }\n}": types.SpacesDocument,
    "\n  query spaces {\n    spaces {\n      id\n      name\n    }\n  }\n": types.SpacesDocument,
    "\n  query spacesPaginated($take: Int!, $skip: Int!) {\n    spacesPaginated(skip: $skip, take: $take) {\n      id\n      name\n    }\n  }\n": types.SpacesPaginatedDocument,
    "\n  query spaceCount {\n    spaceCount {\n      result\n    }\n  }\n": types.SpaceCountDocument,
    "\n    mutation createUser(\n        $username: String!,\n        $email: String,\n        $password: String) {\n        createUser(\n            username: $username,\n            email: $email,\n            password: $password\n        ){\n            username\n            email\n        }\n    }\n": types.CreateUserDocument,
    "mutation createGame($teamAId: String!, $teamBId: String!, $teamAScore: Int!, $teamBScore: Int!, $spaceName: String!, $sportId: String!, $gameDate: String!) {\n    createGame(teamAId: $teamAId, teamBId: $teamBId, teamAScore: $teamAScore, teamBScore: $teamBScore, spaceName: $spaceName, sportId: $sportId, gameDate: $gameDate) {\n        success\n    }\n}": types.CreateGameDocument,
    "query sports {\n    sports {\n        id\n        name\n    }\n    }": types.SportsDocument,
    "query teamsBySpaceName($spaceName: String!) {\n    teamsBySpaceName(spaceName: $spaceName) {\n        id\n        name\n        sportId\n    }\n    }": types.TeamsBySpaceNameDocument,
    "query getGamesSpacePaginated($spaceName: String!, $skip: Int!, $take: Int!) {\n    getGamesSpacePaginated(spaceName: $spaceName, skip: $skip, take: $take) {\n        id\n        teamAId\n        teamA {\n            name\n        }\n        teamBId\n        teamB {\n            name\n        }\n        teamAScore\n        teamBScore\n        sport {\n            name\n        }\n        gameDate\n    }\n}": types.GetGamesSpacePaginatedDocument,
    "mutation deleteGameById($id: String!) {\n    deleteGameById(id: $id) {\n        success\n    }\n}": types.DeleteGameByIdDocument,
    "mutation createPlayer($name: String!) {\n    createPlayer(name: $name) {\n        name\n    }\n    }": types.CreatePlayerDocument,
    "query players {\n    players {\n        id\n        name\n    }\n}": types.PlayersDocument,
    "\n  query GetSportDetails($sport: String!) {\n    sport(id: $sport) {\n      id\n      name\n      createdAt\n      updatedAt\n      games {\n        id\n        teamAScore\n        teamBScore\n        teamA {\n          id\n          name\n          playerTeams {\n            player {\n              id\n              name\n            }\n          }\n        }\n        teamB {\n          id\n          name\n          playerTeams {\n            player {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetSportDetailsDocument,
    "mutation createSport($name: String!) {\n    createSport(name: $name) {\n        name\n    }\n    }": types.CreateSportDocument,
    "\n  mutation deleteSport($sportId: String!) {\n    deleteSport(sportId: $sportId) {\n      success\n    }\n  }\n": types.DeleteSportDocument,
    "\n  query getTeamDetails($id: String!) {\n    team(id: $id) {\n      id\n      spaceId\n      sportId\n      name\n      createdAt\n      updatedAt\n      gamesAsA {\n        id\n        createdAt\n        teamAId\n        teamBId\n      }\n      gamesAsB {\n        id\n        createdAt\n        teamAId\n        teamBId\n      }\n      playerTeams {\n        player {\n          id\n          name\n        }\n      }\n      space {\n        id\n        name\n      }\n    }\n  }\n": types.GetTeamDetailsDocument,
    "mutation createTeam($name: String!, $spaceId: String!, $sportId: String!, $playerIds: [String!]!) {\n    createTeam(name: $name, spaceId: $spaceId, sportId: $sportId, playerIds: $playerIds) {\n        name\n        spaceId\n        sportId\n    }\n}": types.CreateTeamDocument,
    "\n  mutation addMultiplePlayersToTeam($teamId: String!, $playerIds: [String!]!) {\n    addMultiplePlayersToTeam(teamId: $teamId, playerIds: $playerIds) {\n      success\n    }\n  }\n": types.AddMultiplePlayersToTeamDocument,
    "\n  mutation removePlayerFromTeam($teamId: String!, $playerId: String!) {\n    removePlayerFromTeam(teamId: $teamId, playerId: $playerId) {\n      success\n    }\n  }\n": types.RemovePlayerFromTeamDocument,
    "\n  mutation deleteTeam($teamId: String!) {\n    deleteTeam(teamId: $teamId) {\n      success\n    }\n  }\n": types.DeleteTeamDocument,
    "query spaces {\n    spaces {\n        id\n        name\n    }\n}": types.SpacesDocument,
    "query space($name: String!) {\n    space(name: $name) {\n      id\n      name\n      createdAt\n      updatedAt\n      games {\n        id\n        teamAScore\n        teamBScore\n        teamA {\n          name\n        }\n        teamB {\n          name\n        }\n      }\n      players {\n          id\n          name\n      }\n      teams {\n        id\n        name\n        playerTeams {\n          id\n          player {\n            id\n            name\n          }\n        }\n      }\n      admin {\n        id\n        username\n      }\n      sports {\n        id\n        name\n      }\n    }\n  }": types.SpaceDocument,
    "query user($id: String!) {\n    user(id: $id) {\n      id\n      username\n      email\n      createdAt\n      updatedAt\n      isGuest\n      adminSpaces {\n        id\n        name\n      }\n      userSpaces {\n        id\n        name\n      }\n    }\n  }": types.UserDocument,
    "query GetSpaces {\n    spaces {\n        id\n        name\n    }\n}": types.GetSpacesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createSpace($name: String!, $adminId: String!, $privatePassword: String!) {\n  createSpace(name: $name, adminId: $adminId, privatePassword: $privatePassword) {\n    name\n  }\n}"): (typeof documents)["mutation createSpace($name: String!, $adminId: String!, $privatePassword: String!) {\n  createSpace(name: $name, adminId: $adminId, privatePassword: $privatePassword) {\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query spaces {\n  spaces {\n    id\n    name\n  }\n}"): (typeof documents)["query spaces {\n  spaces {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query spaces {\n    spaces {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query spaces {\n    spaces {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query spacesPaginated($take: Int!, $skip: Int!) {\n    spacesPaginated(skip: $skip, take: $take) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query spacesPaginated($take: Int!, $skip: Int!) {\n    spacesPaginated(skip: $skip, take: $take) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query spaceCount {\n    spaceCount {\n      result\n    }\n  }\n"): (typeof documents)["\n  query spaceCount {\n    spaceCount {\n      result\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation createUser(\n        $username: String!,\n        $email: String,\n        $password: String) {\n        createUser(\n            username: $username,\n            email: $email,\n            password: $password\n        ){\n            username\n            email\n        }\n    }\n"): (typeof documents)["\n    mutation createUser(\n        $username: String!,\n        $email: String,\n        $password: String) {\n        createUser(\n            username: $username,\n            email: $email,\n            password: $password\n        ){\n            username\n            email\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createGame($teamAId: String!, $teamBId: String!, $teamAScore: Int!, $teamBScore: Int!, $spaceName: String!, $sportId: String!, $gameDate: String!) {\n    createGame(teamAId: $teamAId, teamBId: $teamBId, teamAScore: $teamAScore, teamBScore: $teamBScore, spaceName: $spaceName, sportId: $sportId, gameDate: $gameDate) {\n        success\n    }\n}"): (typeof documents)["mutation createGame($teamAId: String!, $teamBId: String!, $teamAScore: Int!, $teamBScore: Int!, $spaceName: String!, $sportId: String!, $gameDate: String!) {\n    createGame(teamAId: $teamAId, teamBId: $teamBId, teamAScore: $teamAScore, teamBScore: $teamBScore, spaceName: $spaceName, sportId: $sportId, gameDate: $gameDate) {\n        success\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query sports {\n    sports {\n        id\n        name\n    }\n    }"): (typeof documents)["query sports {\n    sports {\n        id\n        name\n    }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query teamsBySpaceName($spaceName: String!) {\n    teamsBySpaceName(spaceName: $spaceName) {\n        id\n        name\n        sportId\n    }\n    }"): (typeof documents)["query teamsBySpaceName($spaceName: String!) {\n    teamsBySpaceName(spaceName: $spaceName) {\n        id\n        name\n        sportId\n    }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getGamesSpacePaginated($spaceName: String!, $skip: Int!, $take: Int!) {\n    getGamesSpacePaginated(spaceName: $spaceName, skip: $skip, take: $take) {\n        id\n        teamAId\n        teamA {\n            name\n        }\n        teamBId\n        teamB {\n            name\n        }\n        teamAScore\n        teamBScore\n        sport {\n            name\n        }\n        gameDate\n    }\n}"): (typeof documents)["query getGamesSpacePaginated($spaceName: String!, $skip: Int!, $take: Int!) {\n    getGamesSpacePaginated(spaceName: $spaceName, skip: $skip, take: $take) {\n        id\n        teamAId\n        teamA {\n            name\n        }\n        teamBId\n        teamB {\n            name\n        }\n        teamAScore\n        teamBScore\n        sport {\n            name\n        }\n        gameDate\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation deleteGameById($id: String!) {\n    deleteGameById(id: $id) {\n        success\n    }\n}"): (typeof documents)["mutation deleteGameById($id: String!) {\n    deleteGameById(id: $id) {\n        success\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createPlayer($name: String!) {\n    createPlayer(name: $name) {\n        name\n    }\n    }"): (typeof documents)["mutation createPlayer($name: String!) {\n    createPlayer(name: $name) {\n        name\n    }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query players {\n    players {\n        id\n        name\n    }\n}"): (typeof documents)["query players {\n    players {\n        id\n        name\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSportDetails($sport: String!) {\n    sport(id: $sport) {\n      id\n      name\n      createdAt\n      updatedAt\n      games {\n        id\n        teamAScore\n        teamBScore\n        teamA {\n          id\n          name\n          playerTeams {\n            player {\n              id\n              name\n            }\n          }\n        }\n        teamB {\n          id\n          name\n          playerTeams {\n            player {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSportDetails($sport: String!) {\n    sport(id: $sport) {\n      id\n      name\n      createdAt\n      updatedAt\n      games {\n        id\n        teamAScore\n        teamBScore\n        teamA {\n          id\n          name\n          playerTeams {\n            player {\n              id\n              name\n            }\n          }\n        }\n        teamB {\n          id\n          name\n          playerTeams {\n            player {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createSport($name: String!) {\n    createSport(name: $name) {\n        name\n    }\n    }"): (typeof documents)["mutation createSport($name: String!) {\n    createSport(name: $name) {\n        name\n    }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteSport($sportId: String!) {\n    deleteSport(sportId: $sportId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation deleteSport($sportId: String!) {\n    deleteSport(sportId: $sportId) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getTeamDetails($id: String!) {\n    team(id: $id) {\n      id\n      spaceId\n      sportId\n      name\n      createdAt\n      updatedAt\n      gamesAsA {\n        id\n        createdAt\n        teamAId\n        teamBId\n      }\n      gamesAsB {\n        id\n        createdAt\n        teamAId\n        teamBId\n      }\n      playerTeams {\n        player {\n          id\n          name\n        }\n      }\n      space {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getTeamDetails($id: String!) {\n    team(id: $id) {\n      id\n      spaceId\n      sportId\n      name\n      createdAt\n      updatedAt\n      gamesAsA {\n        id\n        createdAt\n        teamAId\n        teamBId\n      }\n      gamesAsB {\n        id\n        createdAt\n        teamAId\n        teamBId\n      }\n      playerTeams {\n        player {\n          id\n          name\n        }\n      }\n      space {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createTeam($name: String!, $spaceId: String!, $sportId: String!, $playerIds: [String!]!) {\n    createTeam(name: $name, spaceId: $spaceId, sportId: $sportId, playerIds: $playerIds) {\n        name\n        spaceId\n        sportId\n    }\n}"): (typeof documents)["mutation createTeam($name: String!, $spaceId: String!, $sportId: String!, $playerIds: [String!]!) {\n    createTeam(name: $name, spaceId: $spaceId, sportId: $sportId, playerIds: $playerIds) {\n        name\n        spaceId\n        sportId\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addMultiplePlayersToTeam($teamId: String!, $playerIds: [String!]!) {\n    addMultiplePlayersToTeam(teamId: $teamId, playerIds: $playerIds) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation addMultiplePlayersToTeam($teamId: String!, $playerIds: [String!]!) {\n    addMultiplePlayersToTeam(teamId: $teamId, playerIds: $playerIds) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation removePlayerFromTeam($teamId: String!, $playerId: String!) {\n    removePlayerFromTeam(teamId: $teamId, playerId: $playerId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation removePlayerFromTeam($teamId: String!, $playerId: String!) {\n    removePlayerFromTeam(teamId: $teamId, playerId: $playerId) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteTeam($teamId: String!) {\n    deleteTeam(teamId: $teamId) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTeam($teamId: String!) {\n    deleteTeam(teamId: $teamId) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query spaces {\n    spaces {\n        id\n        name\n    }\n}"): (typeof documents)["query spaces {\n    spaces {\n        id\n        name\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query space($name: String!) {\n    space(name: $name) {\n      id\n      name\n      createdAt\n      updatedAt\n      games {\n        id\n        teamAScore\n        teamBScore\n        teamA {\n          name\n        }\n        teamB {\n          name\n        }\n      }\n      players {\n          id\n          name\n      }\n      teams {\n        id\n        name\n        playerTeams {\n          id\n          player {\n            id\n            name\n          }\n        }\n      }\n      admin {\n        id\n        username\n      }\n      sports {\n        id\n        name\n      }\n    }\n  }"): (typeof documents)["query space($name: String!) {\n    space(name: $name) {\n      id\n      name\n      createdAt\n      updatedAt\n      games {\n        id\n        teamAScore\n        teamBScore\n        teamA {\n          name\n        }\n        teamB {\n          name\n        }\n      }\n      players {\n          id\n          name\n      }\n      teams {\n        id\n        name\n        playerTeams {\n          id\n          player {\n            id\n            name\n          }\n        }\n      }\n      admin {\n        id\n        username\n      }\n      sports {\n        id\n        name\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query user($id: String!) {\n    user(id: $id) {\n      id\n      username\n      email\n      createdAt\n      updatedAt\n      isGuest\n      adminSpaces {\n        id\n        name\n      }\n      userSpaces {\n        id\n        name\n      }\n    }\n  }"): (typeof documents)["query user($id: String!) {\n    user(id: $id) {\n      id\n      username\n      email\n      createdAt\n      updatedAt\n      isGuest\n      adminSpaces {\n        id\n        name\n      }\n      userSpaces {\n        id\n        name\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSpaces {\n    spaces {\n        id\n        name\n    }\n}"): (typeof documents)["query GetSpaces {\n    spaces {\n        id\n        name\n    }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;