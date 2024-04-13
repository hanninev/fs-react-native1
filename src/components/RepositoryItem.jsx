import { StyleSheet, View, Image } from 'react-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'white',
        padding: 24,
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    basicInfo: {
        marginLeft: 20,
    },
    languageTag: {
        backgroundColor: theme.colors.primary,
        padding: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginVertical: 8,
    },
    secondaryText: {
        color: theme.textSecondary,
        marginTop: 8,
    },
    picture: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    statContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        marginTop: 8,
        alignItems: 'center',
    },
});

const RepositoryItem = ({ item }) => (
    <View style={styles.container}>
        <View style={styles.topRow}>
            <Image
                style={styles.picture}
                source={{
                    uri: item.ownerAvatarUrl,
                }}
            />
            <View style={styles.basicInfo}>
                <Text fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
                <Text style={styles.secondaryText}>{item.description}</Text>
                <View style={styles.languageTag}><Text style={{ color: theme.colors.white }}>{item.language}</Text></View>
            </View>
        </View>

        <View style={styles.statContainer}>
            <View style={styles.statItem}>
                <Text fontSize='subheading' fontWeight='bold'>{item.stargazersCount}</Text>
                <Text style={styles.secondaryText}>Stars</Text>
            </View>
            <View style={styles.statItem}>
                <Text fontSize='subheading' fontWeight='bold'>{item.forksCount}</Text>
                <Text style={styles.secondaryText}>Forks</Text>
            </View>

            <View style={styles.statItem}>
                <Text fontSize='subheading' fontWeight='bold'>{item.reviewCount}</Text>
                <Text style={styles.secondaryText}>Reviews</Text>
            </View>

            <View style={styles.statItem}>
                <Text fontSize='subheading' fontWeight='bold'>{item.ratingAverage}</Text>
                <Text style={styles.secondaryText}>Rating</Text>
            </View>

        </View>
    </View >
);

export default RepositoryItem;