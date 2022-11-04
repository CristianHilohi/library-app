type ContactEntity = {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
}

export type Client = ContactEntity & {
    name: string;
    address: string;
    phoneNumber: string;
    booksBorrowed: Array<string>; // representing books ids
}

export type BorrowedCopy = {
    borrowDate: Date;
    returnDate: Date | null;

    client: Client;
}

export type Book = {
    isbn: string; // ~= id
    name: string;
    author: string;
    price: number;
    stocks: number; // books in library

    borrowedCopies: Array<BorrowedCopy>;
}

export type Library = ContactEntity & {
    books: Array<Book>;
}