import React, {useMemo, useState, useEffect} from 'react';
import {
    ThemeProvider,
    CssBaseline,
    Switch,
    Toolbar,
    Typography,
    Button,
    AppBar,
    Box,
} from '@mui/material';
import {DarkMode, LightMode} from '@mui/icons-material';
import {theme} from './theme';
import LandingPage from './Component/LandingPage';
import LoginPage from './Component/LoginPage';
import RegisterPage from './Component/RegisterPage'
import './App.css';

import {Route, Routes, useNavigate} from 'react-router-dom';

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

    const navigate = useNavigate();
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
            <AppBar position="absolute"
                    elevation={0}
                    color="transparent"
                    sx={{
                        top: 0,
                        left: 0,
                        right: 0,
                        pl: 2,
                        pr: 2,
                    }}
            >
                <Toolbar>
                    <Typography
                        onClick={() => navigate('/')}
                        sx={{
                            flexGrow: 1,
                            fontSize: '2rem',
                            fontWeight: 300,
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'none',
                                color: themeMode.palette.text.primary,
                            }
                        }}>
                        GWTool
                    </Typography>
                    <Button color="inherit">Text</Button>
                    <Button color="inherit">Words</Button>
                    <Button color="inherit">Files</Button>
                    <Button color="inherit">Resources</Button>
                    <Button color="inherit">KisKis</Button>
                    <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                        icon={<LightMode sx={{color: themeMode.palette.text.primary}}/>}
                        checkedIcon={<DarkMode sx={{color: themeMode.palette.text.primary}}/>}
                    />
                    <Button color="inherit" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{
                height: 'auto',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: mode === 'dark'
                    ? 'linear-gradient(to bottom right, #090909, #3C1945)'
                    : 'linear-gradient(to bottom right, #ffffff, #E9CEF0)',
            }}>
                <Routes>
                    <Route path="/" element={<LandingPage mode={mode}/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </Box>
        </ThemeProvider>
    );
}

export default App;