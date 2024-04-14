import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };

            render(<RepositoryListContainer repositories={repositories} />);

            const repositoryItems = screen.getAllByTestId('repositoryItem');

            const stars = screen.getAllByTestId('stars');
            const forks = screen.getAllByTestId('forks');
            const reviews = screen.getAllByTestId('reviews');
            const rating = screen.getAllByTestId('rating');

            for (let index = 0; index < repositories.edges.length; index++) {
                const fullNameText = repositories.edges[index].node.fullName;
                const description = repositories.edges[index].node.description;
                const language = repositories.edges[index].node.language;

                const forksCount = formatNumber(repositories.edges[index].node.forksCount);
                const stargazersCount = formatNumber(repositories.edges[index].node.stargazersCount);
                const ratingAverage = formatNumber(repositories.edges[index].node.ratingAverage);
                const reviewCount = formatNumber(repositories.edges[index].node.reviewCount);


                expect(within(repositoryItems[index]).getByText(fullNameText)).toBeDefined();
                expect(within(repositoryItems[index]).getByText(description)).toBeDefined();
                expect(within(repositoryItems[index]).getByText(language)).toBeDefined();

                expect(within(stars[index]).getByText(stargazersCount.toString())).toBeDefined();
                expect(within(forks[index]).getByText(forksCount.toString())).toBeDefined();
                expect(within(reviews[index]).getByText(reviewCount.toString())).toBeDefined();
                expect(within(rating[index]).getByText(ratingAverage.toString())).toBeDefined();
            }
        });
    });
});

function formatNumber(num) {
    if (num < 1000) {
        return num.toString();
    } else {
        return (num / 1000).toFixed(1) + 'k';
    }
}