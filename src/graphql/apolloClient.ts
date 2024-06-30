import { ApolloClient, InMemoryCache } from '@apollo/client'


export const apolloOptions = {
    uri: '/api/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {

                fields: {
                    spacesPaginated: {
                        keyArgs: [],
                        // @ts-ignore
                        merge(existing, incoming, { args: { skip = 0}}) {


                            const merged = existing ? existing.slice(0) : [];

                            for (let i = 0; i < incoming.length; ++i) {

                                merged[skip + i] = incoming[i];

                            }

                            return merged;

                        },
                    }
                }
            }
        }
    })
}

const apolloClient = new ApolloClient(apolloOptions);


export default apolloClient