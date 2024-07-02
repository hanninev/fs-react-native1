import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import { format } from 'date-fns'

import theme from '../theme';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        padding: 20,
    },
    container: {
        flexGrow: 1,
        flexShrink: 1,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
      },
      button: {
        flex: 1,
        marginHorizontal: 5,
        padding: 8,
        alignItems: 'center',
        borderRadius: 5,
      },
      viewButton: {
        backgroundColor: 'blue',
      },
      deleteButton: {
        backgroundColor: 'red',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
});

const ItemSeparator = () => {
    return (
        <View style={{ height: 12 }} />
    );
};

const ReviewItem = ({ review, navigate, deleteReview, refetch }) => {
    return (
        <View style={styles.background}><View style={styles.container}>
            <View style={styles.rating}>
                <Text fontSize='subheading' fontWeight='bold' color='primary'>{review.node.rating}</Text>
            </View>
            <View style={styles.content}>
                <Text fontSize='subheading' fontWeight='bold'>{review.node.repository.ownerName + "/" + review.node.repository.name}</Text>
                <Text style={styles.secondaryText}>{format(review.node.createdAt, 'dd.MM.yyyy')}</Text>
                <Text>{review.node.text}</Text>
            </View>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => navigate("/" + review.node.repositoryId)}
        >
        <Text style={styles.buttonText}>View Repository</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
                {
                  text: 'CANCEL',
                  style: 'cancel',
                },
                {text: 'DELETE', onPress: async () => { 
                    await deleteReview({reviewId: review.node.id});
                    refetch();
                }},
              ])}
        >
        <Text style={styles.buttonText}>Delete review</Text>
        </TouchableOpacity>
        </View></View>
    )
};

const MyReviews = () => {
    const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true },
    });

    const [deleteReview] = useDeleteReview();
    const navigate = useNavigate();

    if (loading || error ) {
        return <Text>Loading...</Text>;
    }

    return (
        <FlatList
            data={data.me.reviews.edges}
            renderItem={({ item }) => <ReviewItem review={item} navigate={navigate} deleteReview={deleteReview} refetch={refetch} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default MyReviews;