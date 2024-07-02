import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
        try {
            const { data } = await mutate({
                variables: {
                    username: username,
                    password: password
                }
            });

            if (data.authenticate.accessToken) {
                console.log('Access Token:', data.authenticate.accessToken);
                await authStorage.setAccessToken(data.authenticate.accessToken);
                apolloClient.resetStore();
            }
        } catch (e) {
            console.error('Login error:', e);
        }
    };

    return [signIn, result];
};

export default useSignIn;