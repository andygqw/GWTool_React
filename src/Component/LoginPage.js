import React, {useState} from 'react';
import {Button, TextField, Container, Typography, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useNavigate, useLocation} from 'react-router-dom';
import api from '../utils/api';

const LoginPage = ({ setIsLoggedIn }) => {

    const theme = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async () => {
        try {

            if(!username || !password){
                throw new Error("All fields are required");
            }

            const response = await api.post('/login',
                {username, password},
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
                navigate(from, { replace: true });
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (

        <Box component="main" sx={{
            height: '100vh',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Container maxWidth="xs" sx={{
                textAlign: 'center',
                backgroundColor: { xs: 'transparent', sm: theme.palette.background.paper},
                padding: 4,
                borderRadius: 2,
            }}>
                <Typography variant="h4" gutterBottom>
                    Log In
                </Typography>
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Username"
                    margin="normal"
                    value={username}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password"
                    margin="normal"
                    value={password}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt: 3}}
                    onClick={handleLogin}
                >
                    Log In
                </Button>
                <Box sx={{mt: 2}}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Button color="secondary" onClick={() => navigate('/register')}>
                            Try Register
                        </Button>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;