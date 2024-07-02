import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

const useSignUp = () => {
    const [mutate, result] = useMutation(SIGN_UP);

    const createUser = async ({ username, password }) => {
        try {
            console.log(username, password);
            const response = await mutate({
                variables: {
                    user: {
                        username,
                        password
                    }
                }
            });
            return response; 
        } catch (e) {
            console.error('Create user error:', e);
            throw e;  
        }
    };

    return [createUser, result];
};


export default useSignUp;
