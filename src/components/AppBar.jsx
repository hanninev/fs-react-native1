import { View, StyleSheet, Pressable, Text as NativeText, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme'
import { Link } from 'react-router-native';
import { GET_CURRENT_USER } from '../graphql/queries';
import { useQuery, useApolloClient, ApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.appBarBackground,
        padding: 20,
        paddingTop: Constants.statusBarHeight + 20,
        display: "flex",
        flexDirection: "row",
    },
    text: {
        color: theme.colors.appBarText,
        fontSize: 20,
        fontWeight: '700',
        marginHorizontal: 8,
    },
});

const AppBar = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const { data } = useQuery(GET_CURRENT_USER, {
        fetchPolicy: 'cache-and-network',
    });

const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
}

    return <View style={styles.container}>
        <ScrollView horizontal>
            <Pressable>
                <Link to="/">
                    <NativeText style={styles.text}>Repositories</NativeText>
                </Link>
            </Pressable>
            {data.me ?
                <Pressable onPress={handleSignOut}>
                    <NativeText style={styles.text}>Sign out</NativeText>
                </Pressable>
                : <Pressable>
                    <Link to="/signin">
                        <NativeText style={styles.text}>Sign in</NativeText>
                    </Link></Pressable>
            }
        </ScrollView>
    </View >;
};

export default AppBar;