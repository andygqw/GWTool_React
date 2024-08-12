import React, {useMemo, useState, useEffect} from 'react';
import {
    ThemeProvider,
    CssBaseline,
    Box,
    FormControlLabel,
    Switch,
    Toolbar,
    Typography,
    Button,
    AppBar
} from '@mui/material';
import {Brightness7, Brightness4} from '@mui/icons-material';
import {theme} from './theme';
import LandingPage from './Component/LandingPage';
import './App.css';

function App() {
    const getDefaultMode = () => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDarkMode ? 'dark' : 'light';
    };

    const [mode, setMode] = useState(getDefaultMode);

    const themeMode = useMemo(() => theme(mode), [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            setMode(e.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return (
        <ThemeProvider theme={themeMode}>
            <CssBaseline/>
            <AppBar position="static" elevation={0} color="transparent">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        NextUI
                    </Typography>
                    <Button color="inherit">Text</Button>
                    <Button color="inherit">Words</Button>
                    <Button color="inherit">Files</Button>
                    <Button color="inherit">Resources</Button>
                    <Button color="inherit">KisKis</Button>
                    <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                        icon={<Brightness7/>}
                        checkedIcon={<Brightness4/>}
                    />
                </Toolbar>
            </AppBar>
            <LandingPage/>
        </ThemeProvider>
    );
}

export default App;