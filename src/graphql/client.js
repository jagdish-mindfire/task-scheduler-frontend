import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { getLocalAsString, setLocalAsString, localKeys } from '../services/localStorage';
import authClient from './authClient'; // Import your Apollo Client instance
import { REFRESH_TOKEN_MUTATION } from './mutations';

const httpLink = createHttpLink({ uri: import.meta.env.VITE_API_URL });

const authLink = setContext(async (_, { headers }) => {
  let accessToken = getLocalAsString(localKeys.ACCESS_TOKEN);
  let refreshToken = getLocalAsString(localKeys.REFRESH_TOKEN);
  
  if (!accessToken || (JSON.parse(atob(accessToken.split('.')[1])).exp * 1000 < new Date().getTime())) {
    // Access token is expired, try to get a new one
    try {
        console.log('getting new access token');
      const response = await authClient.mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: { refreshToken },
      });
      const { accessToken: newAccessToken } = response.data.refreshToken;

      // Store the new tokens in local storage
      setLocalAsString(localKeys.ACCESS_TOKEN, newAccessToken);
      accessToken = newAccessToken; // Update the access token variable
      console.log('saved the token');
      console.log(accessToken);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Handle token refresh error (e.g., log out the user)
    }
  }
  
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

// Define the main Apollo client with the authLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
