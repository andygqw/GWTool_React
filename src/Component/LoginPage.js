import React, {useState} from 'react';
import {Button, TextField, Container, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import api from '../utils/api';

const LoginPage = () => {
    const theme = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {

            const response = await api.post('/login',
                {username, password},
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="xs" sx={{
            textAlign: 'center',
            backgroundColor: theme.palette.background.paper,
            padding: 4,
            borderRadius: 2
        }}>
            <Typography variant="h4" gutterBottom>
                Log In
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                label="Username"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{mt: 3}}
                onClick={handleLogin}
            >
                Log In
            </Button>
        </Container>
    );
};

export default LoginPage;