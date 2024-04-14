import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
          node {
            id,description,forksCount,language,ownerAvatarUrl,reviewCount,stargazersCount,fullName,forksCount,ratingAverage
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

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
      repository(id: $repositoryId) {
        id
        ownerName
        name
        createdAt
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
        forksCount
        openIssuesCount
        url
        ownerAvatarUrl
        description
        language
        userHasReviewed
      }
    }
`;

export const GET_REVIEWS_BY_REPOSITORY_ID = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;
