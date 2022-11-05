import {useAuth0} from "@auth0/auth0-react";
import {useContext, useEffect} from "react";
import {useUsers} from "../../Hooks/useUsers";
import {useNavigate} from "react-router-dom";
import {CircularProgress, Table} from "@mui/material";
import {PageTitle} from "../Common/PageTitle";
import {BooksContext} from "../../App";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {BorrowedCopy} from "../../Models";
import {SingleBorrowedCopy} from "./SingleBorrowedCopy";

export const AllBorrowedBooks = () => {
    const {user, isLoading} = useAuth0();
    // @ts-ignore
    const {borrowedCopiesList, getBooks, getAllBorrowedCopies} = useContext(BooksContext);

    useEffect(() => {
        getBooks();
        getAllBorrowedCopies();
    }, []);

    if (isLoading) {
        return <div className='page-container'><CircularProgress/></div>
    }

    return <div className='all-borrowed-books page-container'>
        <PageTitle title={'All borrowed books:'} emptyText={!borrowedCopiesList ? 'No borrowed books' : ''}/>

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
    </div>
}