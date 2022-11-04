import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";
import {useUsers} from "../../Hooks/useUsers";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

export const AllBorrowedBooks = () => {
    const {user, isLoading} = useAuth0();
    const {userIsAdmin} = useUsers();
    const navigate = useNavigate();

    useEffect(()=> {
        if(!userIsAdmin()) {
            navigate('/');
        }
    }, [user])

    if(isLoading) {
        return <div className='page-container'><CircularProgress /></div>
    }

    return <div>
        <h2>All borrowed books:</h2>
    </div>
}