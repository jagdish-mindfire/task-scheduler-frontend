import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      refreshToken
    }
  }
`; 

export const SIGNUP_MUTATION = gql`
mutation Signup($email: String!, $password: String!,$name: String!) {
signup(email: $email, password: $password,name: $name) {
  message
}
}
`;

export const REFRESH_TOKEN_MUTATION = gql`
mutation RefreshToken($refreshToken:String!) {
refreshToken(refreshToken: $refreshToken) {
  accessToken
}
}
`;
