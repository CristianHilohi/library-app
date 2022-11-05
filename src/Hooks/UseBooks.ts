import {useEffect, useState} from "react";
import {Book, BorrowedCopy, Client} from "../Models";
import {toast} from 'react-toastify';

export const useBooks = () => {
    const [booksList, setBooksList] = useState<Array<Book>>([]);
    const [borrowedCopiesList, setBorrowedCopiesList] = useState<Array<BorrowedCopy>>([]);
    const [firstCall, setFirstCall] = useState<boolean>(true);

    // for keeping it simple, will use just one local storage entity -> books

    useEffect(() => {
        if (!firstCall) {
            localStorage.setItem("books", JSON.stringify(booksList));
        }
        return () => {
            if (firstCall) {
                setFirstCall(false);
            }
        }
    }, [booksList]);

    useEffect(() => {
        if (!firstCall) {
            localStorage.setItem("borrowedCopies", JSON.stringify(borrowedCopiesList));
        }
        return () => {
            if (firstCall) {
                setFirstCall(false);
            }
        }
    }, [borrowedCopiesList]);

    // actually there is no need for async, since these functions run only in the FE,
    // but I'll add it for future BE implementation.
    // Also a loading state could be added, but I'll skip that since it will always be false (because of the same reason)

    const getBooks = async () => {
        const localStorageBooksString: string = localStorage.getItem('books') ?? '[]';
        const localStorageBooksObject: Array<Book> = JSON.parse(localStorageBooksString);

        setBooksList(localStorageBooksObject ?? []);
    }

    const getAllBorrowedCopies = async () => {
        const localStorageBorrowedCopiesString: string = localStorage.getItem('borrowedCopies') ?? '[]';
        const localStorageBorrowedCopiesObject: Array<BorrowedCopy> = JSON.parse(localStorageBorrowedCopiesString);

        setBorrowedCopiesList(localStorageBorrowedCopiesObject ?? []);
    }

    const getUsersCopies = async (email:string) => {
        const localStorageBorrowedCopiesString: string = localStorage.getItem('borrowedCopies') ?? '[]';
        const localStorageBorrowedCopiesObject: Array<BorrowedCopy> = JSON.parse(localStorageBorrowedCopiesString);

        const usersCopies = localStorageBorrowedCopiesObject.filter((borrowedCopy:BorrowedCopy) => borrowedCopy.client.email === email);
        setBorrowedCopiesList(usersCopies ?? []);
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

    const borrowBookCopy = async (isbn: string, client: Client) => {
        const bookInStock = await checkStock(isbn);
        if (bookInStock) {
            await reduceStock(isbn);

            const updatedBorrowedBooks = [...borrowedCopiesList];
            const copyToBeBorrowed: BorrowedCopy = {
                isbn: isbn,
                client: client,
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

    const returnBookCopy = async (isbn: string) => {

        return 0;
    }

    const findCopyByIsbn = (isbn: string) => {
        const book: Book | null = booksList?.find((book: Book) => book.isbn === isbn) ?? null;

        return book;
    }

    return {
        booksList,
        borrowedCopiesList,
        getBooks,
        getAllBorrowedCopies,
        getUsersCopies,
        addBook,
        removeBook,
        borrowBookCopy,
        returnBookCopy,
        supplyStock,
        reduceStock,
        findCopyByIsbn,
    }

}