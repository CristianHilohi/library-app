import {useState} from "react";
import {Book, BorrowedCopy, Client, Library} from "../Models";


export const useBooks = () => {
    //const [library, setLibrary] = useState<<Library> | {}>({}) // maybe will use this later
    const [booksList, setBooksList] = useState<Array<Book> | []>([]);

    // for keeping it simple, will use just one 'db' entity
    const getBooks = () => {
        setBooksList([]);
    }

    const addBook = (book: Book) => {
        return;
    }

    const removeBook = (isbn: string) => {
        return;
    }

    const editBook = (book: Book) => {
        return;
    }

    const borrowBookCopy = (isbn: string, client: Client) => {
        return;
    }

    const returnBookCopy = (isbn: string, cliendId: string) => {
        let price = 0;
        let numberOfDays = 0;
        let penaltyDays = 0;

        const copyBeReturned:BorrowedCopy | null = findCopyToBeReturned(isbn, cliendId);
        if(copyBeReturned) {
            numberOfDays = getNumberOfDays(copyBeReturned);
            if(numberOfDays > 14) {
                penaltyDays = numberOfDays - 14;
            }
        }

        //const totalCost = numberOfDays .......
        return 0
    }

    const findCopyToBeReturned = (isbn: string, cliendId: string) => {
        let copy: BorrowedCopy | null = null;


        return copy;
    }

    const getNumberOfDays = (copy: BorrowedCopy) => {
        return 0;
    }

    return {
        booksList,
        getBooks,
        addBook,
        removeBook,
        editBook,
        borrowBookCopy,
        returnBookCopy,
    }

}