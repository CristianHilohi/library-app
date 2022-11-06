import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
// @ts-ignore
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Book} from "../../Models";
import {BooksContext} from "../../App";
import {useWindowSize} from "../../Hooks/useWindowSize";

export const AddBookDialog: React.FC<{ isDialogOpen: boolean, closeDialog: Function }> = ({
                                                                                              isDialogOpen,
                                                                                              closeDialog
                                                                                          }) => {
    // @ts-ignore
    const {addBook} = useContext(BooksContext);
    const isMobile = useWindowSize();

    const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

    const [name, setName] = useState<string>('');
    const [isbn, setIsbn] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [stocks, setStocks] = useState<string>('');

    useEffect(() => {
        // add this rule for the case when user inputs number starting with 0
        // because the input allows numbers starting with 0
        ValidatorForm.addValidationRule('isValidNumber', (value: string) => {
            return value[0]!== '0';
        })

        return () => {
            ValidatorForm.removeValidationRule('isValidNumber');
        }
    }, []);

    useEffect(()=> {
        const nameValid = name.length > 0 && name.length <= 50;
        const isbnValid = isbn.length > 0 && isbn.length <= 30;
        const priceNumber = Number(price); // need to do this because the input transforms value to string
        const priceValid = priceNumber > 0 && priceNumber < 1000000 && price.toString()[0] !== '0';

        setIsSaveDisabled(!nameValid || !isbnValid || !priceValid);
    }, [name, isbn, price]);

    const handleCloseDialog = () => closeDialog();

    const handleAddBook = () => {
        const newBook: Book = {
            isbn: isbn,
            name: name.trim(),
            price: Number(price),
            stocks: Number(stocks),
        }
        addBook(newBook);
        closeDialog();
        return;
    }

    // @ts-ignore
    const handleChangeName = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setName(e.target.value);

    // @ts-ignore
    const handleChangeIsbn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setIsbn(e.target.value.trim());

    // @ts-ignore
    const handleChangePrice = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setPrice(e.target.value);

    // @ts-ignore
    const handleChangeStocks = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setStocks(e.target.value);


    return <Dialog open={isDialogOpen} fullScreen={isMobile}>
        <DialogTitle>
            Add book
        </DialogTitle>

        <ValidatorForm onSubmit={handleAddBook}>
            <DialogContent>
                <TextValidator
                    value={name}
                    onChange={handleChangeName}
                    fullWidth
                    label='Name'
                    margin='normal'
                    type='text'
                    validators={['required', 'minStringLength:1', 'maxStringLength: 50']}
                    errorMessages={[
                        'Name is required',
                        'Name is required',
                        'You have reached the maximum limit (50). Please decrease the number of characters',
                    ]}
                    InputProps={{
                        endAdornment: <span> {name ? name.length : 0}/50 </span>,
                    }}
                />
                <TextValidator
                    value={isbn}
                    onChange={handleChangeIsbn}
                    fullWidth
                    label='ISBN'
                    margin='normal'
                    type='text'
                    validators={['required', 'minStringLength:1', 'maxStringLength: 50']}
                    errorMessages={[
                        'ISBN is required',
                        'ISBN is required',
                        'You have reached the maximum limit (30). Please decrease the number of characters',
                    ]}
                    InputProps={{
                        endAdornment: <span>{isbn ? isbn.length : 0}/30</span>,
                    }}
                />
                <TextValidator
                    value={price}
                    onChange={handleChangePrice}
                    fullWidth
                    label='Price per week'
                    margin='normal'
                    type='number'
                    validators={['required', 'isValidNumber', 'minNumber:1', 'maxNumber:1000000']}
                    errorMessages={[
                        'The price is required',
                        'Please enter a valid number',
                        'You must enter a price',
                        'Price is too big! Please check.',
                    ]}
                    InputProps={{
                        endAdornment: <span>€</span>,
                    }}
                />
                <TextValidator
                    value={stocks}
                    onChange={handleChangeStocks}
                    fullWidth
                    label='Stock number'
                    margin='normal'
                    type='number'
                    validators={['required', 'isValidNumber', 'minNumber:1', 'maxNumber:1000000']}
                    errorMessages={[
                        'The stock number is required',
                        'Please enter a valid stock number',
                        'You must enter a stock number',
                        'Too many books! Please check.',
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
                    ADD
                </Button>
            </DialogActions>
        </ValidatorForm>
    </Dialog>
}