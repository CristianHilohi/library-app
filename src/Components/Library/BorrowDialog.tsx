import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
// @ts-ignore
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import React, {useContext, useEffect, useState} from "react";
import {BooksContext} from "../../App";
import {Client} from "../../Models";
import {useAuth0} from "@auth0/auth0-react";
import {useWindowSize} from "../../Hooks/useWindowSize";

export const BorrowDialog: React.FC<{ isDialogOpen: boolean, closeDialog: Function, isbn: string, name: string }> = ({
                                                                                                                         isDialogOpen,
                                                                                                                         closeDialog,
                                                                                                                         isbn,
                                                                                                                         name,
                                                                                                                     }) => {
    // @ts-ignore
    const {borrowBookCopy} = useContext(BooksContext);
    const {user, isLoading} = useAuth0();
    const isMobile = useWindowSize();

    const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

    const [clientName, setClientName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    useEffect(()=> {
        const nameValid = name.length > 0 && name.length <= 100;
        const phoneValid = phoneNumber.length >= 10 && phoneNumber.length <= 20;

        setIsSaveDisabled(!nameValid || !phoneValid || isLoading);
        // eslint-disable-next-line
    }, [clientName, phoneNumber, isLoading])

    // @ts-ignore
    const handleChangeClientName = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setClientName(e.target.value);

    // @ts-ignore
    const handleChangePhoneNumber = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setPhoneNumber(e.target.value.trim());

    const handleCloseDialog = () => closeDialog();

    const handleBorrowBook = () => {
        const client:Client = {email:user?.email ?? 'error' , name: clientName, phoneNumber: phoneNumber};
        borrowBookCopy(isbn, client);
        closeDialog();
    }

    return <Dialog open={isDialogOpen} fullScreen={isMobile}>
        <DialogTitle>
            Borrow {name}
        </DialogTitle>
        <ValidatorForm onSubmit={handleBorrowBook}>
            <DialogContent>
                <TextValidator
                    value={clientName}
                    onChange={handleChangeClientName}
                    fullWidth
                    label='Your full name'
                    margin='normal'
                    type='text'
                    validators={['required', 'minStringLength:1', 'maxStringLength: 100']}
                    errorMessages={[
                        'Your name is required',
                        'Your name is required',
                        'You have reached the maximum limit (100). Please decrease the number of characters',
                    ]}
                    InputProps={{
                        endAdornment: <span> {clientName ? clientName.length : 0}/100 </span>,
                    }}
                />
                <TextValidator
                    value={phoneNumber}
                    onChange={handleChangePhoneNumber}
                    fullWidth
                    label='Your phone number'
                    margin='normal'
                    type='text'
                    validators={['required', 'isNumber', 'minStringLength:10', 'maxStringLength: 20']}
                    errorMessages={[
                        'Your phone number is required',
                        'Please enter only digits',
                        'Please enter a valid phone number',
                        'You have reached the maximum limit (20). Please decrease the number of characters',
                    ]}
                />
            </DialogContent>
            <DialogActions>
                <Button variant={'text'}
                        onClick={handleCloseDialog}
                >
                    CANCEL
                </Button>
                <Button variant={'contained'}
                        disabled={isSaveDisabled}
                        type="submit"
                >
                    BORROW
                </Button>
            </DialogActions>
        </ValidatorForm>
    </Dialog>
}