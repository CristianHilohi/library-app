import { CircularProgress, IconButton, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';

import {useAuth0} from "@auth0/auth0-react";

import {useUsers} from "../../Hooks/useUsers";

import './Header.scss';
import {useAppNavigation} from "../../Hooks/useAppNavigation";

const Header = () => {
    const {loginWithRedirect, logout, user, isAuthenticated, isLoading} = useAuth0();
    const {userIsAdmin} = useUsers();
    const {navigateHome} = useAppNavigation();

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


    return <header className='header-bar'>
        <div className='header-actions'>

            <IconButton onClick={navigateHome}>
                <HomeIcon/>
            </IconButton>
            <IconButton onClick={handleButtonClick}>
                {LoginButtonContent()}
            </IconButton>
        </div>

        <div className={'app-logo'}><Typography variant='h3'>{process.env.REACT_APP_NAME}</Typography></div>


        {isAuthenticated ?
            <Typography variant='h5'>Hi {user?.name}!</Typography>
        : <span/>}

    </header>
}

export default Header;