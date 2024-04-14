import { StyleSheet, View, Image, Linking, TouchableOpacity } from 'react-native';
import Text from './Text';

import theme from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    githubButton: {
        backgroundColor: theme.colors.textPrimary,
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 16,
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

function formatNumber(num) {
    if (num < 1000) {
        return num.toString();
    } else {
        return (num / 1000).toFixed(1) + 'k';
    }
}

const OpenURLButton = ({ url, children }) => {
    const handlePress = async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.githubButton}>
            <Text style={{ color: theme.colors.white, fontSize: 16 }}>{children}</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.white} />
        </TouchableOpacity>
    );
};

const RepositoryItem = ({ item, singleView = false }) => {
    return (
        <View style={styles.container} testID="repositoryItem">
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
                <View style={styles.statItem} testID="stars">
                    <Text fontSize='subheading' fontWeight='bold'>{formatNumber(item.stargazersCount)}</Text>
                    <Text style={styles.secondaryText}>Stars</Text>
                </View>
                <View style={styles.statItem} testID="forks">
                    <Text fontSize='subheading' fontWeight='bold'>{formatNumber(item.forksCount)}</Text>
                    <Text style={styles.secondaryText}>Forks</Text>
                </View>

                <View style={styles.statItem} testID="reviews">
                    <Text fontSize='subheading' fontWeight='bold'>{formatNumber(item.reviewCount)}</Text>
                    <Text style={styles.secondaryText}>Reviews</Text>
                </View>

                <View style={styles.statItem} testID="rating">
                    <Text fontSize='subheading' fontWeight='bold'>{formatNumber(item.ratingAverage)}</Text>
                    <Text style={styles.secondaryText}>Rating</Text>
                </View>

            </View>
            {singleView &&
                <OpenURLButton url={item.url}>
                    Open in GitHub
                </OpenURLButton>}
        </View >
    )
};

export default RepositoryItem;