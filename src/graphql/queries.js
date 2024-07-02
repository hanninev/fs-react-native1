import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          description
          forksCount
          language
          ownerAvatarUrl
          reviewCount
          stargazersCount
          fullName
          ratingAverage
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            text
            createdAt
            repositoryId
            user {
              id
              username
              createdAt
              reviewCount
            }
          }
        }
      }
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
