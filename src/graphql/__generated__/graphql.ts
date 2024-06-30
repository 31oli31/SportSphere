/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
};

export type AddMultiplePlayersResult = {
  __typename?: 'AddMultiplePlayersResult';
  success: Scalars['Boolean']['output'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String']['output'];
};

export type Game = {
  __typename?: 'Game';
  createdAt: Scalars['Date']['output'];
  gameDate: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  space: Space;
  spaceId: Scalars['ID']['output'];
  sport: Sport;
  sportId?: Maybe<Scalars['ID']['output']>;
  teamA: Team;
  teamAId: Scalars['ID']['output'];
  teamAScore: Scalars['Int']['output'];
  teamB: Team;
  teamBId: Scalars['ID']['output'];
  teamBScore: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Login = {
  __typename?: 'Login';
  space: Scalars['String']['output'];
  user: Scalars['String']['output'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  space: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: Scalars['String']['output'];
};

/** Mutation type for the application */
export type Mutation = {
  __typename?: 'Mutation';
  addMultiplePlayersToTeam: AddMultiplePlayersResult;
  createGame: AddMultiplePlayersResult;
  createPlayer: Player;
  createSpace: Space;
  createSport: Sport;
  createTeam: Team;
  createUser: UserSession;
  deleteGameById: AddMultiplePlayersResult;
  deleteSport: AddMultiplePlayersResult;
  deleteTeam: AddMultiplePlayersResult;
  removePlayerFromTeam: AddMultiplePlayersResult;
  userLogin: UserSession;
};


/** Mutation type for the application */
export type MutationAddMultiplePlayersToTeamArgs = {
  playerIds: Array<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationCreateGameArgs = {
  gameDate: Scalars['String']['input'];
  spaceName: Scalars['String']['input'];
  sportId: Scalars['String']['input'];
  teamAId: Scalars['String']['input'];
  teamAScore: Scalars['Int']['input'];
  teamBId: Scalars['String']['input'];
  teamBScore: Scalars['Int']['input'];
};


/** Mutation type for the application */
export type MutationCreatePlayerArgs = {
  name: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationCreateSpaceArgs = {
  adminId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  privatePassword: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationCreateSportArgs = {
  name: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationCreateTeamArgs = {
  name: Scalars['String']['input'];
  playerIds: Array<Scalars['String']['input']>;
  spaceId: Scalars['String']['input'];
  sportId: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  ssoProvider?: InputMaybe<Scalars['String']['input']>;
  ssoProviderUserId?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationDeleteGameByIdArgs = {
  id: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationDeleteSportArgs = {
  sportId: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationDeleteTeamArgs = {
  teamId: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationRemovePlayerFromTeamArgs = {
  playerId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


/** Mutation type for the application */
export type MutationUserLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type NumberResult = {
  __typename?: 'NumberResult';
  result: Scalars['Int']['output'];
};

export type Player = {
  __typename?: 'Player';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  playerTeams: Array<PlayerTeam>;
  updatedAt: Scalars['Date']['output'];
};

export type PlayerTeam = {
  __typename?: 'PlayerTeam';
  id: Scalars['ID']['output'];
  player: Player;
  playerId: Scalars['ID']['output'];
  team: Team;
  teamId: Scalars['ID']['output'];
};

/** Query type for the application */
export type Query = {
  __typename?: 'Query';
  currentUser: Login;
  fetchUser: UserSession;
  games: Array<Game>;
  getGamesSpacePaginated: Array<Game>;
  guestLogin: UserSession;
  players: Array<Player>;
  space: Space;
  spaceCount: NumberResult;
  spaces: Array<Space>;
  spacesPaginated: Array<Space>;
  sport: Sport;
  sports: Array<Sport>;
  team: Team;
  teams: Array<Team>;
  teamsBySpaceName: Array<Team>;
  user: User;
};


/** Query type for the application */
export type QueryFetchUserArgs = {
  id: Scalars['String']['input'];
};


/** Query type for the application */
export type QueryGetGamesSpacePaginatedArgs = {
  skip: Scalars['Int']['input'];
  spaceName: Scalars['String']['input'];
  take: Scalars['Int']['input'];
};


/** Query type for the application */
export type QueryGuestLoginArgs = {
  password: Scalars['String']['input'];
  spaceName: Scalars['String']['input'];
};


/** Query type for the application */
export type QuerySpaceArgs = {
  name: Scalars['String']['input'];
};


/** Query type for the application */
export type QuerySpacesPaginatedArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


/** Query type for the application */
export type QuerySportArgs = {
  id: Scalars['String']['input'];
};


/** Query type for the application */
export type QueryTeamArgs = {
  id: Scalars['String']['input'];
};


/** Query type for the application */
export type QueryTeamsBySpaceNameArgs = {
  spaceName: Scalars['String']['input'];
};


/** Query type for the application */
export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type Space = {
  __typename?: 'Space';
  admin: User;
  createdAt: Scalars['Date']['output'];
  games: Array<Game>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  players: Array<Player>;
  sports: Array<Sport>;
  teams: Array<Team>;
  updatedAt: Scalars['Date']['output'];
};

export type Sport = {
  __typename?: 'Sport';
  createdAt: Scalars['Date']['output'];
  games: Array<Game>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['Date']['output'];
  gamesAsA: Array<Game>;
  gamesAsB: Array<Game>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  playerTeams: Array<PlayerTeam>;
  space: Space;
  spaceId: Scalars['ID']['output'];
  sportId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type User = {
  __typename?: 'User';
  adminSpaces: Array<Space>;
  createdAt: Scalars['Date']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isGuest: Scalars['Boolean']['output'];
  updatedAt: Scalars['Date']['output'];
  userSpaces: Array<Space>;
  username: Scalars['String']['output'];
};

export type UserSession = {
  __typename?: 'UserSession';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isGuest: Scalars['Boolean']['output'];
  spaces: Array<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateSpaceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  adminId: Scalars['String']['input'];
  privatePassword: Scalars['String']['input'];
}>;


export type CreateSpaceMutation = { __typename?: 'Mutation', createSpace: { __typename?: 'Space', name: string } };

export type SpacesQueryVariables = Exact<{ [key: string]: never; }>;


export type SpacesQuery = { __typename?: 'Query', spaces: Array<{ __typename?: 'Space', id: string, name: string }> };

export type SpacesPaginatedQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type SpacesPaginatedQuery = { __typename?: 'Query', spacesPaginated: Array<{ __typename?: 'Space', id: string, name: string }> };

export type SpaceCountQueryVariables = Exact<{ [key: string]: never; }>;


export type SpaceCountQuery = { __typename?: 'Query', spaceCount: { __typename?: 'NumberResult', result: number } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserSession', username: string, email?: string | null } };

export type CreateGameMutationVariables = Exact<{
  teamAId: Scalars['String']['input'];
  teamBId: Scalars['String']['input'];
  teamAScore: Scalars['Int']['input'];
  teamBScore: Scalars['Int']['input'];
  spaceName: Scalars['String']['input'];
  sportId: Scalars['String']['input'];
  gameDate: Scalars['String']['input'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'AddMultiplePlayersResult', success: boolean } };

export type SportsQueryVariables = Exact<{ [key: string]: never; }>;


export type SportsQuery = { __typename?: 'Query', sports: Array<{ __typename?: 'Sport', id: string, name: string }> };

export type TeamsBySpaceNameQueryVariables = Exact<{
  spaceName: Scalars['String']['input'];
}>;


export type TeamsBySpaceNameQuery = { __typename?: 'Query', teamsBySpaceName: Array<{ __typename?: 'Team', id: string, name: string, sportId?: string | null }> };

export type GetGamesSpacePaginatedQueryVariables = Exact<{
  spaceName: Scalars['String']['input'];
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type GetGamesSpacePaginatedQuery = { __typename?: 'Query', getGamesSpacePaginated: Array<{ __typename?: 'Game', id: string, teamAId: string, teamBId: string, teamAScore: number, teamBScore: number, gameDate: any, teamA: { __typename?: 'Team', name: string }, teamB: { __typename?: 'Team', name: string }, sport: { __typename?: 'Sport', name: string } }> };

export type DeleteGameByIdMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteGameByIdMutation = { __typename?: 'Mutation', deleteGameById: { __typename?: 'AddMultiplePlayersResult', success: boolean } };

export type CreatePlayerMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreatePlayerMutation = { __typename?: 'Mutation', createPlayer: { __typename?: 'Player', name: string } };

export type PlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', id: string, name: string }> };

export type GetSportDetailsQueryVariables = Exact<{
  sport: Scalars['String']['input'];
}>;


export type GetSportDetailsQuery = { __typename?: 'Query', sport: { __typename?: 'Sport', id: string, name: string, createdAt: any, updatedAt: any, games: Array<{ __typename?: 'Game', id: string, teamAScore: number, teamBScore: number, teamA: { __typename?: 'Team', id: string, name: string, playerTeams: Array<{ __typename?: 'PlayerTeam', player: { __typename?: 'Player', id: string, name: string } }> }, teamB: { __typename?: 'Team', id: string, name: string, playerTeams: Array<{ __typename?: 'PlayerTeam', player: { __typename?: 'Player', id: string, name: string } }> } }> } };

export type CreateSportMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateSportMutation = { __typename?: 'Mutation', createSport: { __typename?: 'Sport', name: string } };

export type DeleteSportMutationVariables = Exact<{
  sportId: Scalars['String']['input'];
}>;


export type DeleteSportMutation = { __typename?: 'Mutation', deleteSport: { __typename?: 'AddMultiplePlayersResult', success: boolean } };

export type GetTeamDetailsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetTeamDetailsQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string, spaceId: string, sportId?: string | null, name: string, createdAt: any, updatedAt: any, gamesAsA: Array<{ __typename?: 'Game', id: string, createdAt: any, teamAId: string, teamBId: string }>, gamesAsB: Array<{ __typename?: 'Game', id: string, createdAt: any, teamAId: string, teamBId: string }>, playerTeams: Array<{ __typename?: 'PlayerTeam', player: { __typename?: 'Player', id: string, name: string } }>, space: { __typename?: 'Space', id: string, name: string } } };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String']['input'];
  spaceId: Scalars['String']['input'];
  sportId: Scalars['String']['input'];
  playerIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', name: string, spaceId: string, sportId?: string | null } };

export type AddMultiplePlayersToTeamMutationVariables = Exact<{
  teamId: Scalars['String']['input'];
  playerIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AddMultiplePlayersToTeamMutation = { __typename?: 'Mutation', addMultiplePlayersToTeam: { __typename?: 'AddMultiplePlayersResult', success: boolean } };

export type RemovePlayerFromTeamMutationVariables = Exact<{
  teamId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
}>;


export type RemovePlayerFromTeamMutation = { __typename?: 'Mutation', removePlayerFromTeam: { __typename?: 'AddMultiplePlayersResult', success: boolean } };

export type DeleteTeamMutationVariables = Exact<{
  teamId: Scalars['String']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: { __typename?: 'AddMultiplePlayersResult', success: boolean } };

export type SpaceQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type SpaceQuery = { __typename?: 'Query', space: { __typename?: 'Space', id: string, name: string, createdAt: any, updatedAt: any, games: Array<{ __typename?: 'Game', id: string, teamAScore: number, teamBScore: number, teamA: { __typename?: 'Team', name: string }, teamB: { __typename?: 'Team', name: string } }>, players: Array<{ __typename?: 'Player', id: string, name: string }>, teams: Array<{ __typename?: 'Team', id: string, name: string, playerTeams: Array<{ __typename?: 'PlayerTeam', id: string, player: { __typename?: 'Player', id: string, name: string } }> }>, admin: { __typename?: 'User', id: string, username: string }, sports: Array<{ __typename?: 'Sport', id: string, name: string }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, username: string, email?: string | null, createdAt: any, updatedAt: any, isGuest: boolean, adminSpaces: Array<{ __typename?: 'Space', id: string, name: string }>, userSpaces: Array<{ __typename?: 'Space', id: string, name: string }> } };

export type GetSpacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpacesQuery = { __typename?: 'Query', spaces: Array<{ __typename?: 'Space', id: string, name: string }> };


export const CreateSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adminId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"privatePassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"adminId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adminId"}}},{"kind":"Argument","name":{"kind":"Name","value":"privatePassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"privatePassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSpaceMutation, CreateSpaceMutationVariables>;
export const SpacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SpacesQuery, SpacesQueryVariables>;
export const SpacesPaginatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"spacesPaginated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spacesPaginated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SpacesPaginatedQuery, SpacesPaginatedQueryVariables>;
export const SpaceCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"spaceCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spaceCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<SpaceCountQuery, SpaceCountQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamAId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamBId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamAScore"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamBScore"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamAId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamAId"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamBId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamBId"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamAScore"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamAScore"}}},{"kind":"Argument","name":{"kind":"Name","value":"teamBScore"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamBScore"}}},{"kind":"Argument","name":{"kind":"Name","value":"spaceName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceName"}}},{"kind":"Argument","name":{"kind":"Name","value":"sportId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sportId"}}},{"kind":"Argument","name":{"kind":"Name","value":"gameDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const SportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SportsQuery, SportsQueryVariables>;
export const TeamsBySpaceNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"teamsBySpaceName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamsBySpaceName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sportId"}}]}}]}}]} as unknown as DocumentNode<TeamsBySpaceNameQuery, TeamsBySpaceNameQueryVariables>;
export const GetGamesSpacePaginatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGamesSpacePaginated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGamesSpacePaginated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceName"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamAId"}},{"kind":"Field","name":{"kind":"Name","value":"teamA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamBId"}},{"kind":"Field","name":{"kind":"Name","value":"teamB"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamAScore"}},{"kind":"Field","name":{"kind":"Name","value":"teamBScore"}},{"kind":"Field","name":{"kind":"Name","value":"sport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gameDate"}}]}}]}}]} as unknown as DocumentNode<GetGamesSpacePaginatedQuery, GetGamesSpacePaginatedQueryVariables>;
export const DeleteGameByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteGameById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGameById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteGameByIdMutation, DeleteGameByIdMutationVariables>;
export const CreatePlayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const PlayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<PlayersQuery, PlayersQueryVariables>;
export const GetSportDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSportDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sport"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sport"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamAScore"}},{"kind":"Field","name":{"kind":"Name","value":"teamBScore"}},{"kind":"Field","name":{"kind":"Name","value":"teamA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"playerTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamB"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"playerTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSportDetailsQuery, GetSportDetailsQueryVariables>;
export const CreateSportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSportMutation, CreateSportMutationVariables>;
export const DeleteSportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sportId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sportId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteSportMutation, DeleteSportMutationVariables>;
export const GetTeamDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTeamDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"spaceId"}},{"kind":"Field","name":{"kind":"Name","value":"sportId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"gamesAsA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"teamAId"}},{"kind":"Field","name":{"kind":"Name","value":"teamBId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gamesAsB"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"teamAId"}},{"kind":"Field","name":{"kind":"Name","value":"teamBId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"playerTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"space"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamDetailsQuery, GetTeamDetailsQueryVariables>;
export const CreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sportId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sportId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"spaceId"}},{"kind":"Field","name":{"kind":"Name","value":"sportId"}}]}}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const AddMultiplePlayersToTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addMultiplePlayersToTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMultiplePlayersToTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddMultiplePlayersToTeamMutation, AddMultiplePlayersToTeamMutationVariables>;
export const RemovePlayerFromTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removePlayerFromTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePlayerFromTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemovePlayerFromTeamMutation, RemovePlayerFromTeamMutationVariables>;
export const DeleteTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const SpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"space"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"space"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"teamAScore"}},{"kind":"Field","name":{"kind":"Name","value":"teamBScore"}},{"kind":"Field","name":{"kind":"Name","value":"teamA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamB"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"playerTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SpaceQuery, SpaceQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isGuest"}},{"kind":"Field","name":{"kind":"Name","value":"adminSpaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userSpaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const GetSpacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSpaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetSpacesQuery, GetSpacesQueryVariables>;