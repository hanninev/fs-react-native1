import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

const SinglePage = () => {
    let { repositoryId } = useParams();
    const { loading, error, data } = useQuery(GET_REPOSITORY, {
        variables: { repositoryId }
    });

    if (loading || error) return;

    return <RepositoryItem singleView={true} item={data.repository} />
};

export default SinglePage;