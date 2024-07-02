import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY, GET_REVIEWS_BY_REPOSITORY_ID } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import { format } from 'date-fns'


import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'white',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    content: {
        flexGrow: 1,
        flexShrink: 1,
    },
    rating: {
        marginRight: 20,
        width: 60,
        height: 60,
        borderColor: theme.colors.primary,
        borderWidth: 4,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryText: {
        color: theme.textSecondary,
        marginVertical: 8,
    },
});

const ItemSeparator = () => {
    return (
        <View style={{ height: 12 }} />
    );
};

const SinglePage = () => {
    let { repositoryId } = useParams();
    const { loading, error, data } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId }
    });
    const { data: reviews } = useQuery(GET_REVIEWS_BY_REPOSITORY_ID, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId },
    });

    if (loading || error) return;

    const ReviewItem = ({ review }) => {
        return (
            <View style={styles.container}>
                <View style={styles.rating}>
                    <Text fontSize='subheading' fontWeight='bold' color='primary'>{review.node.rating}</Text>
                </View>
                <View style={styles.content}>
                    <Text fontSize='subheading' fontWeight='bold'>{review.node.user.username}</Text>
                    <Text style={styles.secondaryText}>{format(review.node.createdAt, 'dd.MM.yyyy')}</Text>
                    <Text>{review.node.text}</Text>
                </View>
            </View>
        )
    };

    return (
        <FlatList
            data={reviews?.repository?.reviews.edges}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <View><RepositoryItem singleView={true} item={data.repository} /><ItemSeparator /></View>}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default SinglePage;