import { Book } from "../../Models";
import TableCell from "@mui/material/TableCell";
import TableRow from '@mui/material/TableRow';
import {useAuth0} from "@auth0/auth0-react";
import {Button, IconButton} from "@mui/material";
import {useUsers} from "../../Hooks/useUsers";
import DeleteIcon from '@mui/icons-material/Delete';
import {useContext} from "react";
import {BooksContext} from "../../App";

export const SingleBookRow:React.FC<{book: Book}> = ({book}) => {
    const {loginWithRedirect, user, isAuthenticated, isLoading} = useAuth0();
    const {userIsAdmin} = useUsers();
    // @ts-ignore
    const {removeBook} = useContext(BooksContext);

    const BookAction = () => {
        if(book.stocks === 0) {
            return <span>no books available</span>
        }
        if(isAuthenticated) {
            return <Button variant='contained'>
                Borrow
            </Button>
        }
        return <span>Sign up / log in to borrow book</span>
    }

    return <TableRow
        key={book.isbn}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell align='right'>{book.name}</TableCell>
        <TableCell align='right'>{book.author}</TableCell>
        <TableCell align='right'>{book.stocks}</TableCell>
        <TableCell align='right'>{book.price}</TableCell>
        <TableCell align='right'>
            {BookAction()}
            {userIsAdmin() && <IconButton onClick={removeBook}>
                <DeleteIcon />
            </IconButton>}
        </TableCell>
    </TableRow>
}