import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ reviewId }) => {
    try {
      console.log(reviewId);
      const response = await mutate({
        variables: {
        deleteReviewId: reviewId,
        },
      });
      return response;
    } catch (e) {
      console.error('Delete review error:', e);
      throw e;
    }
  };

  return [deleteReview, result];
};

export default useDeleteReview;