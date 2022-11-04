import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme/themeConfig';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <Auth0Provider
            domain="dev-5rdeuqv0k6e13w2w.us.auth0.com"
            clientId="t4KRgCINCi4LjpxndIfOYuRgwhYTrTw5"
            redirectUri={window.location.origin}
        >
            <App/>
        </Auth0Provider>
    </ThemeProvider>
);

reportWebVitals();
