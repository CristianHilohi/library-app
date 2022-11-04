import {Button, CircularProgress, IconButton, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import {useState, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";

import './Header.scss';

const Header = () => {
    const {loginWithRedirect, logout, user, isAuthenticated, isLoading} = useAuth0();

    const handleButtonClick = () => {
        if (isLoading) {
            return;
        }
        if (isAuthenticated) {
            logout({returnTo: window.location.origin});
        } else {
            loginWithRedirect();
        }
    }

    const LoginButtonContent = () => {
        if (isLoading) {
            return <CircularProgress color={'info'} size={25}/>
        }
        if (isAuthenticated) {
            return <LogoutIcon/>
        }
        return <LoginIcon/>
    }

    const navigateToInfo = () => {
        window.location.href = '/';
    }

    return <header className='header-bar'>
        <div className='header-actions'>
            <IconButton onClick={navigateToInfo}>
                <InfoIcon/>
            </IconButton>
            <IconButton onClick={handleButtonClick}>
                {LoginButtonContent()}
            </IconButton>
        </div>

        <div className={'app-logo'}><Typography variant='h3'>{process.env.REACT_APP_NAME}</Typography></div>


        {isAuthenticated &&
            <Typography variant='h5'>Hi {user?.name}!</Typography>}

    </header>
}

export default Header;