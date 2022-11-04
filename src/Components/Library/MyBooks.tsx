import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

export const MyBooks = () => {
    const {isAuthenticated, isLoading} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !isAuthenticated) {
            navigate('/');
        }
    }, [isLoading]);

    if(isLoading) {
        return <div className='page-container'><CircularProgress /></div>
    }

    return <div className='my-books page-container'>
        <h2>My borrowed books:</h2>
        </div>
}
