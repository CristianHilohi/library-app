import {useAuth0} from "@auth0/auth0-react";
import {useContext, useEffect} from "react";
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
    const {user, isLoading, isAuthenticated} = useAuth0();
    const {navigateToBooksList} = useAppNavigation();
    // @ts-ignore
    const {getUsersCopies, getBooks, userCopies} = useContext(BooksContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigateToBooksList();
        }
        getBooks();
        getUsersCopies();
        // eslint-disable-next-line
    }, [user]);

    if (isLoading) {
        return <div className='page-container'><CircularProgress/></div>
    }

    return <div className='my-books page-container'>
        <PageTitle title='My borrowed books:'
                   emptyText={!userCopies ? 'You don\'t have any books borrowed' : ''}/>

        {/*I wanted to also add some sorting to the table, but found out that MUI doesn't provide sorting in the table API*/}
        {/*I can do it manually or change the table component (for example Ant Design has sort options)*/}
        {userCopies && <TableContainer component={Paper}>
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
                    {userCopies?.map((bookCopy: BorrowedCopy) => <SingleBorrowedCopy  key={bookCopy.borrowDate.toString()} bookCopy={bookCopy}/>)}
                </TableBody>
            </Table>
        </TableContainer>}

        <br/>
        <Button variant='contained' onClick={navigateToBooksList}>Search new books</Button>
    </div>
}
