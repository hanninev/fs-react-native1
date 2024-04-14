import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
          node {
            description,forksCount,language,ownerAvatarUrl,reviewCount,stargazersCount,fullName,forksCount,ratingAverage
          }
        }
      }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;