import { FetchClient } from "@c8y/client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from './App';

// React library takes fetchClient as an input.
type Props = {
    fetchClient:FetchClient;
    id: string;
}

// In order to use react query in our application, we need Query Client
const client = new QueryClient();

// Create a functional component and pass fetchClient object as an input

export const FetchDeviceDetails : React.FC<Props> = ({fetchClient, id}) =>{
    return (
        <QueryClientProvider client={client}>
        {/* Pass the fetchClient  object as an input to app component */}
            <App fetchClient={fetchClient} id={id} ></App>
        </QueryClientProvider>
    )
}