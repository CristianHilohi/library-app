import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";
import {useUsers} from "../../Hooks/useUsers";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {PageTitle} from "../Common/PageTitle";

export const AllBorrowedBooks = () => {
    const {user} = useAuth0();


    return <div className='all-borrowed-books page-container'>
        <PageTitle title={'All borrowed books:'} emptyText={true ? 'No borrowed books' : ''}/>
    </div>
}