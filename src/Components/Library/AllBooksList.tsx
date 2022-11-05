import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {useContext, useEffect, useState} from "react";
import {BooksContext} from "../../App";
import {Book} from "../../Models";
import {SingleBookRow} from "./SingleBookRow";
import {useUsers} from "../../Hooks/useUsers";
import Button from "@mui/material/Button";
import {PageTitle} from "../Common/PageTitle";
import {AddBookDialog} from "./AddBookDialog";
import './TablesStyle.scss';

export const AllBooksList = () => {
    // @ts-ignore
    const {booksList} = useContext(BooksContext);
    const {userIsAdmin} = useUsers();

    const [addDialogIsOpen, setAddDialogIsOpen] = useState<boolean>(false);

    const openAddDialog = () => setAddDialogIsOpen(true);

    const closeAddDialog = () => setAddDialogIsOpen(false);

    return <div className='books-list page-container'>
        <PageTitle title={'These are the books you can find in our library:'}
                   emptyText={!booksList ? 'There are no available books in the library yet!' : ''}/>

        {booksList &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table" className={'books-table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Available copies</TableCell>
                            <TableCell>Price per day (€)</TableCell>
                            <TableCell>Available books</TableCell>
                            <TableCell align='right'/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {booksList?.map((book: Book) => <SingleBookRow book={book}/>)}
                    </TableBody>
                </Table>
            </TableContainer>}

        <br />
        {userIsAdmin() && <Button onClick={openAddDialog} variant='contained'>Add Book</Button>}

        {addDialogIsOpen && <AddBookDialog isDialogOpen={addDialogIsOpen} closeDialog={closeAddDialog}/>}
    </div>
}