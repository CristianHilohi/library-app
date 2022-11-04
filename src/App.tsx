import React from 'react';
import './App.scss';
import {useBooks} from "./Hooks/UseBooks";
import Header from "./Components/Layout/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import InfoPage from "./Components/Library/InfoPage";
import BooksList from "./Components/Library/BooksList";

export const BooksContext = React.createContext(null);

function App() {
    const booksHook = useBooks();
    return (
        // @ts-ignore
        <BooksContext.Provider value={booksHook}>
            <div className="App">
                <Header/>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<InfoPage />}/>
                        <Route path='books' element={<BooksList />}/>
                        <Route path='*' element={<InfoPage />}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </BooksContext.Provider>

    );
}

export default App;
