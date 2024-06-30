import apolloClient, {apolloOptions} from "@/graphql/apolloClient";
import {useState} from "react";
import {ApolloClient, NormalizedCacheObject} from "@apollo/client";


export const useClientApollo = () => {
    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>(apolloClient);
    const [headers, setHeaders] = useState<Record<string, string>>({});

    const updateHeaders = (headers: Record<string, string>) => {
        setClient(new ApolloClient({
            ...apolloOptions,
            headers: headers,
        }));
        setHeaders(headers)
    }

    return {
        client,
        headers,
        updateHeaders,
    }
}