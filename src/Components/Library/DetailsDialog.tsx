import Dialog from "@mui/material/Dialog/Dialog";
import {Client} from "../../Models";
import {Button, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React from "react";

export const DetailsDialog: React.FC<{ client: Client, isDialogOpen: boolean, closeDialog: Function }> = ({
                                                                                                              client,
                                                                                                              isDialogOpen,
                                                                                                              closeDialog
                                                                                                          }) => {
    const handleCloseDialog = () => closeDialog();

    return <Dialog open={isDialogOpen}>
        <DialogTitle>Client details</DialogTitle>
        <DialogContent>
            <p>Full name: {client.name}</p>
            <p>Email: <a href={`mailto:${client.email}`}>{client.email}</a></p>
            <p>Phone number: <a href={`tel:${client.phoneNumber}`}>{client.phoneNumber}</a></p>
        </DialogContent>
        <DialogActions>
            <Button variant='text'
                    onClick={handleCloseDialog}
            >
                CLOSE
            </Button>
        </DialogActions>
    </Dialog>
}
