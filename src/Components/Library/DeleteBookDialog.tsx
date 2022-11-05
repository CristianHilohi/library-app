import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import React, {useContext} from "react";
import {BooksContext} from "../../App";

export const DeleteBookDialog: React.FC<{ isDialogOpen: boolean, closeDialog: Function, isbn: string, name: string }> =
    ({
         isDialogOpen,
         closeDialog,
         isbn,
         name,
     }) => {
        // @ts-ignore
        const {removeBook} = useContext(BooksContext);

        const handleCloseDialog = () => closeDialog();

        const handleDeleteBook = () => {
            removeBook(isbn).then(()=> closeDialog())
        }

        return <Dialog open={isDialogOpen}>
            <DialogTitle>Remove forever {name}?</DialogTitle>
            <DialogActions>
                <Button variant='text'
                        onClick={handleCloseDialog}
                >
                    CANCEL
                </Button>
                <Button variant='contained'
                        onClick={handleDeleteBook}
                        color='error'
                >
                    REMOVE
                </Button>
            </DialogActions>
        </Dialog>
    }