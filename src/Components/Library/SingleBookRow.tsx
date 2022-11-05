import {useContext, useState} from "react";

import {useAuth0} from "@auth0/auth0-react";
import {BooksContext} from "../../App";
import {useUsers} from "../../Hooks/useUsers";

import {Book} from "../../Models";

import {Button, IconButton, Tooltip} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteBookDialog} from "./DeleteBookDialog";

export const SingleBookRow: React.FC<{ book: Book }> = ({book}) => {
    const {isAuthenticated} = useAuth0();
    const {userIsAdmin} = useUsers();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    // @ts-ignore
    // const {supplyStock, reduceStock} = useContext(BooksContext);  TODO

    const handleRemoveStockCopy = () => {

    }

    const handleAddStockCopy = () => {

    }

    const handleOpenDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    }

    const BookAction = () => {
        if (book.stocks === 0) {
            // @ts-ignore
            return <span>no books available</span>
        }
        if (isAuthenticated) {
            return <Button variant='contained'>
                Borrow
            </Button>
        }
        return <span>Sign up / log in to borrow book</span>
    }

    const Stocks = () => {
        return <>
            {userIsAdmin() && <Tooltip title={'remove one book from stocks'}>
                <IconButton onClick={handleRemoveStockCopy}>
                    <RemoveIcon/>
                </IconButton>
            </Tooltip>}
            <span>{book.stocks}</span>
            {userIsAdmin() && <Tooltip title={'add one book to stocks'}>
                <IconButton onClick={handleAddStockCopy}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>}
        </>
    }

    return <><TableRow
        key={book.isbn}
        sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
        <TableCell>{book.name}</TableCell>
        <TableCell>{book.stocks}</TableCell>
        <TableCell>{book.price}</TableCell>
        <TableCell>{Stocks()}</TableCell>
        <TableCell align='right'>
            {BookAction()}
            {userIsAdmin() && <IconButton onClick={handleOpenDeleteDialog}>
                <DeleteIcon/>
            </IconButton>}
        </TableCell>


    </TableRow>
    {isDeleteDialogOpen &&
        <DeleteBookDialog
            isDialogOpen={isDeleteDialogOpen}
            closeDialog={handleCloseDeleteDialog}
            isbn={book.isbn}
            name={book.name}
        />}
    </>
}