import React from 'react';
import './App.scss';
import {useBooks} from "./Hooks/UseBooks";
import Header from "./Components/Common/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import InfoPage from "./Components/Static/InfoPage";
import { AllBooksList } from './Components/Library/AllBooksList';
import {MyBooks} from './Components/Library/MyBooks';
import {AllBorrowedBooks} from "./Components/Library/AllBorrowedBooks";

export const BooksContext = React.createContext(null);

function App() {
    const booksHook = useBooks();
    return (
        // @ts-ignore
        <BooksContext.Provider value={booksHook}>
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route index element={<InfoPage />}/>
                        <Route path='books-list' element={<AllBooksList />}/>
                        <Route path='my-books' element={<MyBooks />}/>
                        <Route path='all-borrowed-books' element={<AllBorrowedBooks />}/>
                        <Route path='*' element={<InfoPage />}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </BooksContext.Provider>

    );
}

export default App;
