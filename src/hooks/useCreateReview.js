import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const createReview = async ({ repositoryOwnerName, repositoryName, rating, reviewText }) => {
        try {
            console.log(repositoryOwnerName, repositoryName, rating, reviewText);
            const response = await mutate({
                variables: {
                    review: {
                        ownerName: repositoryOwnerName,
                        repositoryName: repositoryName,
                        rating: rating,
                        text: reviewText
                    }
                }
            });
            return response; 
        } catch (e) {
            console.error('Create review error:', e);
            throw e;  
        }
    };

    return [createReview, result];
};


export default useCreateReview;
