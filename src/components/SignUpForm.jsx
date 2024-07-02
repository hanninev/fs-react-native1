import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import useSignUp from '../hooks/useSignUp';
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
        .min(5, "Username must be at least 5 characters")
        .max(30, "Username must be at most 30 characters")
        .required("Username is required"),
    password: yup
        .string()
        .min(5, "Password must be at least 5 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Password confirmation is required"),
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
};

const SignUpForm = () => {
    const [createUser] = useSignUp();
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const user = await createUser({ username, password });
            if (user) {
            await signIn({username, password});
            navigate("/");
            }
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
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password && (
            <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
        )}
        <TextInput
            style={[styles.formInput, formik.errors.passwordConfirmation && styles.errorInput]}
            placeholder="Password confirmation"
            value={formik.values.passwordConfirmation}
            onChangeText={formik.handleChange('passwordConfirmation')}
        />
        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <Text style={{ color: 'red' }}>{formik.errors.passwordConfirmation}</Text>
        )}
        <Pressable style={styles.button} onPress={formik.handleSubmit} >
            <Text style={styles.buttonText}>Sign up</Text>
        </Pressable >
    </View >);
};

export default SignUpForm;