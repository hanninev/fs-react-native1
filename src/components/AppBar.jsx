import { View, StyleSheet, Pressable, Text as NativeText } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme'

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.appBarBackground,
        padding: 20,
        paddingTop: Constants.statusBarHeight + 20,
    },
    text: {
        color: theme.colors.appBarText,
        fontSize: 20,
        fontWeight: '700',
    },
});

const AppBar = () => {
    return <View style={styles.container}>
        <Pressable onPress={() => { }}>
            <NativeText style={styles.text}>Repositories</NativeText>
        </Pressable>
    </View >;
};

export default AppBar;