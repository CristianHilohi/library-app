import {useEffect, useState} from "react";
import {Book, BorrowedCopy, Client} from "../Models";


export const useBooks = () => {
    //const [library, setLibrary] = useState<<Library> | {}>({}) // maybe will use this later
    const [booksList, setBooksList] = useState<Array<Book> | null>(null);
    const [firstCall, setFirstCall] = useState<boolean> (true);

    // for keeping it simple, will use just one local storage entity -> books

    useEffect(()=> {
        getBooks();
    }, [])

    useEffect(()=> {
        console.log(booksList);
        if(!firstCall) {
            localStorage.setItem("books", JSON.stringify(booksList));
        }
        return () => setFirstCall(false);
    }, [booksList]);

    const getBooks = () => {
        const localStorageBooksString: string = localStorage.getItem('books') ?? '';
        const localStorageBooksObject: Array<Book> = JSON.parse(localStorageBooksString);

        setBooksList(localStorageBooksObject ?? []);
    }

    const addBook = (book: Book) => {
        // @ts-ignore
        booksList.push(book);
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