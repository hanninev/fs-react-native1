import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
        try {
            await mutate({
                variables: {
                    username: username,
                    password: password
                }
            });
            if (result) {
                console.log('Access Token:', result.data.authenticate.accessToken);
            }
        } catch (e) {
            console.error('Login error:', e);
        }
    };

    return [signIn, result];
};

export default useSignIn;