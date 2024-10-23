// authClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
});

const authClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default authClient;
