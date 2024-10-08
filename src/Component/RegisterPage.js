import React, {useState} from 'react';
import {Button, TextField, Container, Typography, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import { EMAIL_PATTERN, AUTH_CENTER } from '../utils/helper';

const RegisterPage = () => {
    const theme = useTheme();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            if (!username || !email || !password || !verifyPassword) {
                throw new Error("All fields are required");
            }

            if (!EMAIL_PATTERN.test(email)) {
                throw new Error("An valid email is required");
            }

            if (password !== verifyPassword) {

                throw new Error("Two passwords don't match");
            }

            const response = await fetch(AUTH_CENTER + '/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password})
            });

            if (response.status === 200) {
                navigate('/login');
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleRegister();
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
                borderRadius: 2
            }}>
                <Typography variant="h4" gutterBottom>
                    Register
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
                    label="Email"
                    type="email"
                    margin="normal"
                    value={email}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setEmail(e.target.value)}
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
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Verify Password"
                    margin="normal"
                    value={verifyPassword}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt: 3}}
                    onClick={handleRegister}
                >
                    Register
                </Button>
                <Box sx={{mt: 2}}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Button color="secondary" onClick={() => navigate('/login')}>
                            Try Log In
                        </Button>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default RegisterPage;