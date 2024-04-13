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