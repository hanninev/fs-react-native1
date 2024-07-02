import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import useCreateReview from '../hooks/useCreateReview';

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
    repositoryOwnerName: yup
        .string()
        .required("Repository owner's name is required"),
    repositoryName: yup
        .string()
        .required("Repository's name is required"),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required("Rating is required"),
    review: yup
        .string(),
});

const initialValues = {
    repositoryOwnerName: '',
    repositoryName: '',
    rating: '',
    reviewText: '',
};

const ReviewForm = () => {
    const [createReview, result] = useCreateReview();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { repositoryOwnerName, repositoryName, rating, reviewText } = values;

        try {
            const review = await createReview({ repositoryOwnerName, repositoryName, rating: parseInt(rating, 10), reviewText });
            console.log(review.data.createReview.repositoryId);
            navigate("/" + review.data.createReview.repositoryId);
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
            style={[styles.formInput, formik.errors.repositoryOwnerName && styles.errorInput]}
            placeholder="Repository owner name"
            value={formik.values.repositoryOwnerName}
            onChangeText={formik.handleChange('repositoryOwnerName')}
        />
        {formik.touched.repositoryOwnerName && formik.errors.repositoryOwnerName && (
            <Text style={{ color: 'red' }}>{formik.errors.repositoryOwnerName}</Text>
        )}
        <TextInput
            style={[styles.formInput, formik.errors.repositoryName && styles.errorInput]}
            placeholder="Repository name"
            value={formik.values.repositoryName}
            onChangeText={formik.handleChange('repositoryName')}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
            <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
        )}
        <TextInput
            style={[styles.formInput, formik.errors.rating && styles.errorInput]}
            placeholder="Rating"
            value={formik.values.rating}
            onChangeText={formik.handleChange('rating')}
        />
        {formik.touched.rating && formik.errors.rating && (
            <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
        )}
        <TextInput
            style={[styles.formInput, formik.errors.reviewText && styles.errorInput]}
            placeholder="Review"
            value={formik.values.reviewText}
            onChangeText={formik.handleChange('reviewText')}
            multiline
        />
        {formik.touched.reviewText && formik.errors.reviewText && (
            <Text style={{ color: 'red' }}>{formik.errors.reviewText}</Text>
        )}
        <Pressable style={styles.button} onPress={formik.handleSubmit} >
            <Text style={styles.buttonText}>Create a review</Text>
        </Pressable >
    </View >);
};

export default ReviewForm;