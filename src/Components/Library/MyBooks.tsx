import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Button, CircularProgress} from "@mui/material";
import {PageTitle} from "../Common/PageTitle";
import {useAppNavigation} from "../../Hooks/useAppNavigation";

export const MyBooks = () => {
    const {isAuthenticated, isLoading} = useAuth0();
    const {navigateToBooksList} = useAppNavigation();

    if(isLoading) {
        return <div className='page-container'><CircularProgress /></div>
    }

    return <div className='my-books page-container'>
        {/*TODO*/}
        <PageTitle title='My borrowed books:' emptyText={true ? 'You don\'t have any books borrowed' : ''}/>

        <Button variant='contained' onClick={navigateToBooksList}>Search new books</Button>
        </div>
}
