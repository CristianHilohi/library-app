import {useNavigate} from "react-router-dom";
import {useUsers} from "./useUsers";
import {useAuth0} from "@auth0/auth0-react";

export const useAppNavigation = () => {
    const navigate = useNavigate();
    const {userIsAdmin} = useUsers();
    const {isAuthenticated} = useAuth0();

    const navigateBack = () => navigate(-1);

    const navigateHome = () => navigate('/');

    const navigateToBooksList = () =>  navigate('/books-list');

    const navigateToMyBooks = () => {
        if(isAuthenticated) {
            navigate('/my-books');
        } else {
            navigateHome();
        }
    }

    const navigateToAllBorrowedBooks = () => {
        if(userIsAdmin()){
            navigate('/all-borrowed-books');
        } else {
            navigateToMyBooks();
        }
    }

    return {
        navigateBack,
        navigateHome,
        navigateToBooksList,
        navigateToMyBooks,
        navigateToAllBorrowedBooks,
    }
}