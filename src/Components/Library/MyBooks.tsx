import {useAuth0} from "@auth0/auth0-react";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, CircularProgress, Table} from "@mui/material";
import {PageTitle} from "../Common/PageTitle";
import {useAppNavigation} from "../../Hooks/useAppNavigation";
import {BorrowedCopy} from "../../Models";
import {BooksContext} from "../../App";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {SingleBorrowedCopy} from "./SingleBorrowedCopy";

export const MyBooks = () => {
    const {user, isLoading} = useAuth0();
    const {navigateToBooksList} = useAppNavigation();
    // @ts-ignore
    const {borrowedCopiesList, getUsersCopies, getBooks} = useContext(BooksContext);

    useEffect(() => {
        getBooks();
        getUsersCopies(user?.email);
    }, [user]);

    if (isLoading) {
        return <div className='page-container'><CircularProgress/></div>
    }

    return <div className='my-books page-container'>
        <PageTitle title='My borrowed books:'
                   emptyText={!borrowedCopiesList ? 'You don\'t have any books borrowed' : ''}/>

        {/*I wanted to also add some sorting to the table, but found out that MUI doesn't provide sorting in the table API*/}
        {/*I can do it manually or change the table component (for example Ant Design has sort options)*/}
        {borrowedCopiesList && <TableContainer  component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table" className={'books-table'}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Borrowing Date</TableCell>
                        <TableCell>Days passed</TableCell>
                        <TableCell>Price per day (€)</TableCell>
                        <TableCell>Price so far (€)</TableCell>
                        <TableCell align='right'/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {borrowedCopiesList?.map((bookCopy:BorrowedCopy) => <SingleBorrowedCopy bookCopy={bookCopy} />)}
                </TableBody>
            </Table>
        </TableContainer>}

        <br />
        <Button variant='contained' onClick={navigateToBooksList}>Search new books</Button>
    </div>
}
