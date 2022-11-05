import {Book, BorrowedCopy} from "../../Models";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useContext, useEffect, useState} from "react";
import {BooksContext} from "../../App";
import {Button, IconButton} from "@mui/material";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import {DetailsDialog} from "./DetailsDialog";
import {useAuth0} from "@auth0/auth0-react";
import moment from "moment";

export const SingleBorrowedCopy: React.FC<{ bookCopy: BorrowedCopy }> = ({bookCopy}) => {
    // @ts-ignore
    const {findCopyByIsbn, returnBookCopy} = useContext(BooksContext);
    const {user} = useAuth0();

    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState<boolean>(false);

    const [book, setBook] = useState<Book | null>(null);
    const [penalty, setPenalty] = useState<number>(0);
    const [daysLate, setDaysLate] = useState<number>(0);
    const [daysPassed, setDaysPassed] = useState<number>(0);

    useEffect(() => {
        const book = findCopyByIsbn(bookCopy.isbn);
        setBook(book);
        calculateDaysPassed();
    }, [bookCopy])

    const handleOpenDetailsDialog = () => setIsDetailsDialogOpen(true);

    const handleCloseDetailsDialog = () => setIsDetailsDialogOpen(false);

    const handleReturnBook = () => {
        returnBookCopy(bookCopy.isbn, bookCopy.borrowDate);
    }

    const calculateDaysPassed = () => {
        const borrowDateMoment = moment(bookCopy.borrowDate);
        const now = moment();
        const daysPassed = borrowDateMoment.diff(now, "days") + 1;

        if (daysPassed > 14) {
            const penaltyDays: number = daysPassed - 14;
            const penaltyCost: number = penaltyDays * ((book?.price ?? 1) * 0.01);

            setPenalty(penaltyCost);
            setDaysLate(penaltyDays);
        }
        setDaysPassed(daysPassed);
    }

    const GetTotalPrice = () => {
        const bookPrice: number = Number(book?.price ?? 0);
        const totalPrice: number = bookPrice * daysPassed + penalty;

        const roundedPrice = Math.round(totalPrice * 100) / 100;
        const roundedPenaltyPrice = Math.round(penalty * 100) / 100;

        return <span>
            {roundedPrice} <span className='warning-text'>{!!penalty && `(${roundedPenaltyPrice} penalty)`}</span>
        </span>
    }

    const GetDaysPassed = () => {
        return <span>
            {daysPassed} <span className='warning-text'>{!!penalty && `(${daysLate} days late)`}</span>
        </span>
    }

    const getDate = () => new Date(bookCopy.borrowDate).toLocaleDateString('en-uk', {
        year: "numeric",
        month: "short",
        day: "numeric"
    })

    // for the case when admin sees all borrowed books,
    // only the user who borrowed can return
    const isTheSameUser = () => {
        return user?.email === bookCopy.client.email;
    }

    const GetActions = () => {
        return <span>
            {isTheSameUser() &&
                <Button onClick={handleReturnBook} variant={'outlined'} size='small'>
                    Return book
                </Button>}
            <IconButton onClick={handleOpenDetailsDialog}>
                <ContactMailIcon/>
            </IconButton>
        </span>
    }

    return <>
        <TableRow key={bookCopy.isbn} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell>{book?.name}</TableCell>
            <TableCell>{getDate()}</TableCell>
            <TableCell>{GetDaysPassed()}</TableCell>
            <TableCell>{book?.price}</TableCell>
            <TableCell>{GetTotalPrice()}</TableCell>
            <TableCell align='right'>{GetActions()}</TableCell>
        </TableRow>
        {isDetailsDialogOpen &&
            <DetailsDialog
                client={bookCopy.client}
                isDialogOpen={isDetailsDialogOpen}
                closeDialog={handleCloseDetailsDialog}
            />}
    </>
}