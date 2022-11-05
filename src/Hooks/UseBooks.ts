import {useEffect, useState} from "react";
import {Book, BorrowedCopy, Client} from "../Models";
import {toast} from 'react-toastify';

export const useBooks = () => {
    const [booksList, setBooksList] = useState<Array<Book>>([]);
    const [borrowedCopiesList, setBorrowedCopiesList] = useState<Array<BorrowedCopy>>([]);
    const [firstCall, setFirstCall] = useState<boolean>(true);

    // for keeping it simple, will use just one local storage entity -> books

    useEffect(() => {
        getBooks();
    }, [])

    useEffect(() => {
        if (!firstCall) {
            localStorage.setItem("books", JSON.stringify(booksList));
            localStorage.setItem("borrowedCopies", JSON.stringify(borrowedCopiesList));
        }
        return () => {
            if (firstCall) {
                setFirstCall(false);
            }
        }
    }, [booksList, borrowedCopiesList]);

    // actually there is no need for async, since these functions run only in the FE,
    // but I'll add it for future BE implementation.
    // Also a loading state could be added, but I'll skip that since it will always be false (because of the same reason)

    const getBooks = async () => {
        const localStorageBooksString: string = localStorage.getItem('books') ?? '[]';
        const localStorageBooksObject: Array<Book> = JSON.parse(localStorageBooksString);

        const localStorageBorrowedCopiesString: string = localStorage.getItem('borrowedCopies') ?? '[]';
        const localStorageBorrowedCopiesObject: Array<BorrowedCopy> = JSON.parse(localStorageBorrowedCopiesString);

        setBooksList(localStorageBooksObject ?? []);
        setBorrowedCopiesList(localStorageBorrowedCopiesObject ?? []);
    }

    const addBook = async (book: Book) => {
        // @ts-ignore
        const updatedBooksList = [...booksList];
        updatedBooksList.push(book);

        setBooksList(updatedBooksList);
        return;
    }

    const removeBook = async (isbn: string) => {
        const updatedBooks = booksList.filter((book) => book.isbn !== isbn);
        setBooksList(updatedBooks);
    }

    const supplyStock = async (isbn: string) => {
        const updatedBooks = booksList.map((book: Book) => {
            if (book.isbn === isbn) {
                book.stocks++;
                return book;
            }
            return book;
        });
        setBooksList(updatedBooks);
    }

    const reduceStock = async (isbn: string) => {
        const updatedBooks = booksList.map((book: Book) => {
            if (book.isbn === isbn && book.stocks > 0) {
                book.stocks--;
                return book;
            }
            return book;
        });
        setBooksList(updatedBooks);
    }
    const checkStock = async (isbn: string) => {
        let bookIsInStock = false;
        booksList.forEach((book: Book) => {
            if (book.isbn === isbn) {
                bookIsInStock = book.stocks !== 0;
            }
        })
        return bookIsInStock;
    }

    // const editBook = (book: Book) => {
    //     return;
    // }

    const borrowBookCopy = async (isbn: string, client: Client) => {
        const bookInStock = await checkStock(isbn);
        if (bookInStock) {
            await reduceStock(isbn);

            const updatedBorrowedBooks = [...borrowedCopiesList];
            const copyToBeBorrowed: BorrowedCopy = {
                isbn: isbn,
                client: client,
                returnDate: null,
                borrowDate: new Date(Date.now())
            }

            updatedBorrowedBooks.push(copyToBeBorrowed);
            setBorrowedCopiesList(updatedBorrowedBooks);
        } else {
            toast.error('The last copy was just borrowed before! We are sorry for the inconvenience', {
                position: "bottom-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        return;
    }

    const returnBookCopy = async (isbn: string, cliendId: string) => {
        let price = 0;
        let numberOfDays = 0;
        let penaltyDays = 0;

        const copyBeReturned: BorrowedCopy | null = findCopyToBeReturned(isbn, cliendId);
        if (copyBeReturned) {
            numberOfDays = getNumberOfDays(copyBeReturned);
            if (numberOfDays > 14) {
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
        // editBook,
        borrowBookCopy,
        returnBookCopy,
        supplyStock,
        reduceStock,
    }

}