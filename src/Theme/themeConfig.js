import {createTheme} from "@mui/material";
import {primaryLight, primaryDark} from './colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: primaryDark,
        },
        info: {
            main: primaryLight,
        }
    },
});