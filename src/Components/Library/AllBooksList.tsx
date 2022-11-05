import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {useContext} from "react";
import {BooksContext} from "../../App";
import {Book} from "../../Models";
import {SingleBookRow} from "./SingleBookRow";
import {useUsers} from "../../Hooks/useUsers";
import Button from "@mui/material/Button";
import {PageTitle} from "../Common/PageTitle";

export const AllBooksList = () => {
    // @ts-ignore
    const {bookList, addBook} = useContext(BooksContext);
    const {userIsAdmin} = useUsers();

    return <div className='books-list page-container'>
        <PageTitle title={'These are the books you can find in our library:'}
                   emptyText={!bookList ? 'There are no available books in the library yet!' : ''}/>

        {bookList &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='right'>Name</TableCell>
                            <TableCell align='right'>Author</TableCell>
                            <TableCell align='right'>Available copies</TableCell>
                            <TableCell align='right'>Price per day (€)</TableCell>
                            <TableCell align='right'/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookList?.map((book: Book) => <SingleBookRow book={book}/>)}
                    </TableBody>
                </Table>
            </TableContainer>}

        {userIsAdmin() && <Button onClick={addBook} variant='contained'>Add Book</Button>}
    </div>
}