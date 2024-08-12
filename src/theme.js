import {createTheme} from '@mui/material/styles';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Light theme colors
                primary: {main: '#a681e5'},
                background: {default: '#ffffff', paper: '#f5f5f5'},
            }
            : {
                // Dark theme colors
                primary: {main: '#9f67ff'},
                background: {default: '#121212', paper: '#1d1d1d'},
            }),
    },
});

export const theme = (mode) => createTheme(getDesignTokens(mode));