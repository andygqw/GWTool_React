import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {

    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 4,
            }}
        >
            <Container>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 'bold',
                        color: theme.palette.text.primary,
                        mb: 2
                    }}
                >
                    404 - Page Not Found
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 4
                    }}
                >
                    Oops! The page you are looking for does not exist.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')}
                >
                    Go Back to Home
                </Button>
            </Container>
        </Box>
    );
};

export default NotFoundPage;