export type Client = {
    email: string;
    name: string;
    phoneNumber: string;
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
    price: number; // I consider this price per day
    stocks: number; // books in library
}
