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
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import {DarkMode, LightMode, Menu as MenuIcon} from '@mui/icons-material';
import {theme} from './theme';
import NotFoundPage from './Component/NotFoundPage';
import LandingPage from './Component/LandingPage';
import LoginPage from './Component/LoginPage';
import RegisterPage from './Component/RegisterPage';
import TextPage from './Component/TextPage';
import WordPage from './Component/WordPage';
import FilePage from './Component/FilePage';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';

function App() {
    const getDefaultMode = () => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDarkMode ? 'dark' : 'light';
    };

    const [mode, setMode] = useState(getDefaultMode);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [drawerOpen, setDrawerOpen] = useState(false);

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMenuClick = (path) => {
        navigate(path);
        setDrawerOpen(false);
    };

    return (
        <ThemeProvider theme={themeMode}>
            <CssBaseline/>
            <AppBar position="absolute" elevation={0} color="transparent"
                    sx={{
                        top: 0,
                        left: 0,
                        right: 0,
                        pl: {xs: 0, sm: 2},
                        pr: {xs: 0, sm: 2},
                    }}>
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
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Button color="inherit" onClick={() => navigate('/text')}>Text</Button>
                        <Button color="inherit" onClick={() => navigate('/word')}>Words</Button>
                        <Button color="inherit" onClick={() => navigate('/file')}>Files</Button>
                        <Button color="inherit" onClick={() => navigate('/resource')}>Resources</Button>
                        <Button color="inherit" onClick={() => navigate('/kiskis')}>KisKis</Button>
                        <Switch
                            checked={mode === 'dark'}
                            onChange={toggleTheme}
                            icon={<LightMode sx={{color: themeMode.palette.text.primary}}/>}
                            checkedIcon={<DarkMode sx={{color: themeMode.palette.text.primary}}/>}
                        />
                        {isLoggedIn ? (
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        ) : (
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                        )}
                    </Box>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        sx={{display: {xs: 'flex', md: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                <List sx={{width: 250}}>
                    <ListItem button onClick={() => handleMenuClick('/text')}>
                        <ListItemText primary="Text"/>
                    </ListItem>
                    <ListItem button onClick={() => handleMenuClick('/word')}>
                        <ListItemText primary="Words"/>
                    </ListItem>
                    <ListItem button onClick={() => handleMenuClick('/file')}>
                        <ListItemText primary="Files"/>
                    </ListItem>
                    <ListItem button onClick={() => handleMenuClick('/resource')}>
                        <ListItemText primary="Resources"/>
                    </ListItem>
                    <ListItem button onClick={() => handleMenuClick('/kiskis')}>
                        <ListItemText primary="KisKis"/>
                    </ListItem>
                    <ListItem button onClick={toggleTheme}>
                        <Switch
                            checked={mode === 'dark'}
                            icon={<LightMode sx={{color: themeMode.palette.text.primary}}/>}
                            checkedIcon={<DarkMode sx={{color: themeMode.palette.text.primary}}/>}
                        />
                        <ListItemText primary="Toggle Theme"/>
                    </ListItem>
                    {isLoggedIn ? (
                        <ListItem button onClick={handleLogout}>
                            <ListItemText primary="Logout"/>
                        </ListItem>
                    ) : (
                        <ListItem button onClick={() => handleMenuClick('/login')}>
                            <ListItemText primary="Login"/>
                        </ListItem>
                    )}
                </List>
            </Drawer>

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
                    <Route path="/" element={<LandingPage mode={mode} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/text" element={<TextPage/>}/>
                    <Route path="/word" element={<WordPage/>}/>
                    <Route path="/file" element={<FilePage isLoggedIn={isLoggedIn}/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Box>
        </ThemeProvider>
    );
}

export default App;