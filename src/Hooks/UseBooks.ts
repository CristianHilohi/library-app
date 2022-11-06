import {useEffect, useState} from "react";
import {Book, BorrowedCopy, Client} from "../Models";
import {toast} from 'react-toastify';
import {useAuth0} from "@auth0/auth0-react";

export const useBooks = () => {
    const {user} = useAuth0();
    
    const [booksList, setBooksList] = useState<Array<Book>>([]);
    const [borrowedCopiesList, setBorrowedCopiesList] = useState<Array<BorrowedCopy>>([]);
    const [userCopies, setUserCopies] = useState<Array<BorrowedCopy>>([]);
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
        // eslint-disable-next-line
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
        // eslint-disable-next-line
    }, [borrowedCopiesList]);

    const getBooks = () => {
        const localStorageBooksString: string = localStorage.getItem('books') ?? '[]';
        const localStorageBooksObject: Array<Book> = JSON.parse(localStorageBooksString);

        setBooksList(localStorageBooksObject ?? []);
    }

    const getAllBorrowedCopies = () => {
        const localStorageBorrowedCopiesString: string = localStorage.getItem('borrowedCopies') ?? '[]';
        const localStorageBorrowedCopiesObject: Array<BorrowedCopy> = JSON.parse(localStorageBorrowedCopiesString);

        setBorrowedCopiesList(localStorageBorrowedCopiesObject ?? []);
    }

    const getUsersCopies = () => {
        const localStorageBorrowedCopiesString: string = localStorage.getItem('borrowedCopies') ?? '[]';
        const localStorageBorrowedCopiesObject: Array<BorrowedCopy> = JSON.parse(localStorageBorrowedCopiesString);

        const usersCopies = localStorageBorrowedCopiesObject.filter((borrowedCopy:BorrowedCopy) => borrowedCopy.client.email === user?.email);
        console.log(usersCopies)
        setUserCopies(usersCopies);
    }

    const addBook = (book: Book) => {
        // @ts-ignore
        const updatedBooksList = [...booksList];
        updatedBooksList.push(book);

        setBooksList(updatedBooksList);

        toast.success('Book created!', {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }

    const removeBook = (isbn: string) => {
        const updatedBooks = booksList.filter((book) => book.isbn !== isbn);
        setBooksList(updatedBooks);

        toast.success('Book permanently removed!', {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }

    const supplyStock = (isbn: string, showMessage: boolean = true) => {
        const updatedBooks = booksList.map((book: Book) => {
            if (book.isbn === isbn) {
                book.stocks++;
                return book;
            }
            return book;
        });
        setBooksList(updatedBooks);

        if(showMessage) {
            toast.success('Stock supplied!', {
                position: "bottom-center",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    }

    const reduceStock = (isbn: string, showMessage: boolean = true) => {
        const updatedBooks = booksList.map((book: Book) => {
            if (book.isbn === isbn && book.stocks > 0) {
                book.stocks--;
                return book;
            }
            return book;
        });
        setBooksList(updatedBooks);

        if(showMessage) {
            toast.success('Stock reduced!', {
                position: "bottom-center",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }

    }

    const checkStock = (isbn: string) => {
        let bookIsInStock = false;
        booksList.forEach((book: Book) => {
            if (book.isbn === isbn) {
                bookIsInStock = book.stocks !== 0;
            }
        })
        return bookIsInStock;
    }

    const borrowBookCopy = (isbn: string, client: Client) => {
        const bookInStock = checkStock(isbn);
        if (bookInStock) {
            reduceStock(isbn, false);

            const updatedBorrowedBooks = [...borrowedCopiesList];
            const copyToBeBorrowed: BorrowedCopy = {
                isbn: isbn,
                client: client,
                borrowDate: new Date(Date.now())
            }

            updatedBorrowedBooks.push(copyToBeBorrowed);
            setBorrowedCopiesList(updatedBorrowedBooks);

            toast.success('Book borrowed! You can find it in your list now.', {
                position: "bottom-center",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        } else {
            toast.error('The last copy was just borrowed before! We are sorry for the inconvenience', {
                position: "bottom-center",
                autoClose: 10000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
        return;
    }

    const returnBookCopy = (isbn: string, borrowDate: Date) => {
        // Will check only date because a user can borrow multiple copies of the same book and the date has a precise enough timestamp
        const updatedBorrowedCopies = borrowedCopiesList.filter((copy:BorrowedCopy) => copy.borrowDate !== borrowDate);
        setBorrowedCopiesList(updatedBorrowedCopies);
        supplyStock(isbn, false);
        getUsersCopies();

        toast.success('Book returned!', {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }

    const findCopyByIsbn = (isbn: string) => {
        const book: Book | null = booksList?.find((book: Book) => book.isbn === isbn) ?? null;

        return book;
    }

    return {
        booksList,
        borrowedCopiesList,
        userCopies,
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