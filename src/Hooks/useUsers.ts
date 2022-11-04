import {useAuth0} from "@auth0/auth0-react";

export const useUsers = () => {
    const {user, isAuthenticated} = useAuth0();

    const userIsAdmin = () => {
        if(!isAuthenticated) {
            return false;
        }
        return user?.email === 'cristian.hilohi@gmail.com';
    }


    return {
        userIsAdmin,
    }

}