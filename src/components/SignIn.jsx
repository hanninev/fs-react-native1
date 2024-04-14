import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

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
        marginTop: 16,
        marginBottom: 4,
    },
    errorInput: {
        borderColor: '#d73a4a',
    },
    button: {
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        fontSize: 20,
        padding: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: theme.colors.appBarText,
        fontSize: 20,
        fontWeight: '700',
    },
});

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

const initialValues = {
    username: '',
    password: '',
};

const SignIn = () => {
    const [signIn, result] = useSignIn();

    const onSubmit = async (values) => {
      const { username, password } = values;
  
      try {
        await signIn({ username, password });
        console.log(result.data);
      } catch (e) {
        console.log(e);
      }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (<View style={styles.container}>
        <TextInput
            style={[styles.formInput, formik.errors.username && styles.errorInput]}
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
        />
        {formik.touched.username && formik.errors.username && (
            <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
        )}
        <TextInput
            style={[styles.formInput, formik.errors.password && styles.errorInput]}
            placeholder="Password"
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password && (
            <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
        )}
        <Pressable style={styles.button} disabled={formik.errors.password || formik.errors.username} onPress={formik.handleSubmit} >
            <Text style={styles.buttonText}>Sign in</Text>
        </Pressable >
    </View >);
};

export default SignIn;