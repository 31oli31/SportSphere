import {gql} from "@/graphql/__generated__";
import { DocumentNode } from "@apollo/client";




export const GET_GAMES_SPACE_PAGINATED = gql(`query getGamesSpacePaginated($spaceName: String!, $skip: Int!, $take: Int!) {
    getGamesSpacePaginated(spaceName: $spaceName, skip: $skip, take: $take) {
        id
        teamAId
        teamA {
            name
        }
        teamBId
        teamB {
            name
        }
        teamAScore
        teamBScore
        sport {
            name
        }
        gameDate
    }
}`)  as DocumentNode;

export const DELETE_GAME_BY_ID = gql(
    `mutation deleteGameById($id: String!) {
        deleteGameById(id: $id) {
        success
    }
    }`
) as DocumentNode;