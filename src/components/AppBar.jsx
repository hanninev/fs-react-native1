import { View, StyleSheet, Pressable, Text as NativeText, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme'
import { Link } from 'react-router-native';

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
    return <View style={styles.container}>
        <ScrollView horizontal>
            <Pressable>
                <Link to="/">
                    <NativeText style={styles.text}>Repositories</NativeText>
                </Link>
            </Pressable>
            <Pressable>
                <Link to="/signin">
                    <NativeText style={styles.text}>Sign in</NativeText>
                </Link>
            </Pressable>
        </ScrollView>
    </View >;
};

export default AppBar;