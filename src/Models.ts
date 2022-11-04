type ContactEntity = {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
}

export type Client = ContactEntity & {
    booksBorrowed: Array<string>; // representing books ids
}

export type BorrowedCopy = {
    isbn: string; // ~= id
    borrowDate: Date;
    returnDate: Date | null;

    client: Client;
}

export type Book = {
    isbn: string; // ~= id
    name: string;
    author: string;
    price: number; // I consider this price per day
    stocks: number; // books in library

    borrowedCopies: Array<BorrowedCopy>;
}

export type Library = ContactEntity & {
    books: Array<Book>;
}