import { UserAddDTO } from "../client/models";
import { AuthorizationApi } from "../client/apis";

const registerMutationKey = "registerMutation";

export const useRegisterApi = () => {
    const registerMutation = (userAddDTO: UserAddDTO) => new AuthorizationApi().apiAuthorizationRegisterPost({ userAddDTO }); // Use the generated client code and adapt it.

    return {
        registerMutation: {
            key: registerMutationKey,
            mutation: registerMutation
        }
    }
}