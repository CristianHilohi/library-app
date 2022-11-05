import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {CircularProgress, IconButton} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import './PageTitle.scss';
import {useNavigate} from "react-router-dom";

export const PageTitle: React.FC<{ title: string, emptyText?: string | null }> = ({title, emptyText = ''}) => {
    const {isLoading} = useAuth0();
    const navigate = useNavigate();

    // @ts-ignore
    const displayText = emptyText.length > 0 ? emptyText : title;

    const navigateBack = () => {
        navigate('/');
    }

    return <div className='centered-header'>
        <IconButton onClick={navigateBack}>
            <ArrowBackIosNewIcon/>
        </IconButton>
        {isLoading ?
            <CircularProgress/> :
            <h2 className='center-element'>
                {displayText}
            </h2>}
    </div>
}