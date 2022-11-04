import './InfoPage.scss'
import {useAuth0} from "@auth0/auth0-react";
import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

const InfoPage = () => {
    const {loginWithRedirect, user, isAuthenticated, isLoading} = useAuth0();
    const navigate = useNavigate();

    const navigateToBooksList = () => {
        navigate('books-list');
    }

    const navigateToMyBooks = () => {
        navigate('my-books');
    }

    return <div className='info-page page-container'>
        <section>
            <h3>
                Welcome to {process.env.REACT_APP_NAME}!
            </h3>
            <p>
                This is your online library that allows you to borrow and return books. With a free account you can
                manage all you library interactions.
            </p>
        </section>
        {isLoading ? <CircularProgress/> :
            isAuthenticated ? <section>
                <p>
                    We are glad to see you back, {user?.name}!
                </p>
                <div className='buttons-container'>
                    <Button variant='outlined' onClick={navigateToMyBooks}>My borrowed books</Button>
                    <Button variant='contained' onClick={navigateToBooksList}>Search new books</Button>
                </div>
            </section> : <p>
                <p>
                    With a free account, you are just a click away from borrowing your books!
                </p>
                <div className='buttons-container'>
                    <Button variant='contained' onClick={loginWithRedirect}>Sign up</Button>
                    <Button variant='outlined' onClick={navigateToBooksList}>Check our books</Button>
                </div>
            </p>
        }
        <section>
            <p>For any question or suggestion, contact our supreme leader on
                {' '}<a href='mailto:cristian.hilohi@gmail.com'>cristian.hilohi@gmail.com</a>.
            </p>
        </section>
    </div>
}

export default InfoPage;