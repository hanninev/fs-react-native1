import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'white',
        padding: 24,
    },
    formInput: {
        borderColor: theme.colors.textSecondary,
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 20,
        padding: 10,
        marginBottom: 16,
    },
    button: {
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        fontSize: 20,
        padding: 10,
        alignItems: 'center',
        marginBottom: 8,
    },
    buttonText: {
        color: theme.colors.appBarText,
        fontSize: 20,
        fontWeight: '700',
    },
});

const onSubmit = (values) => {
    console.log(values);
};

const initialValues = {
    username: '',
    password: '',
};

const SignIn = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (<View style={styles.container}>
        <TextInput
            style={styles.formInput}
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
        />
        <TextInput
            style={styles.formInput}
            placeholder="Password"
            secureTextEntryddd
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
        />
        <Pressable style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
    </View>);
};

export default SignIn;