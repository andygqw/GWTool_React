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
            {/*<Box sx={{textAlign: 'center', m: 2}}>*/}
            {/*    <FormControlLabel*/}
            {/*        control={*/}
            {/*            <Switch*/}
            {/*                checked={mode === 'dark'}*/}
            {/*                onChange={toggleTheme}*/}
            {/*                icon={<Brightness7/>}*/}
            {/*                checkedIcon={<Brightness4/>}*/}
            {/*            />*/}
            {/*        }*/}
            {/*        label=""*/}
            {/*    />*/}
            {/*</Box>*/}
            <AppBar position="static" elevation={0} color="transparent">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        NextUI
                    </Typography>
                    <Button color="inherit">Docs</Button>
                    <Button color="inherit">Components</Button>
                    <Button color="inherit">Blog</Button>
                    <Button color="inherit">Figma</Button>
                    <Button color="inherit">Roadmap</Button>
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