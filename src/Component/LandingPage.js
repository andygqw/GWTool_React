import React from 'react';
import {Typography, Button, Container} from '@mui/material';
import {useTheme} from '@mui/material/styles';

const LandingPage = ({mode}) => {
    const theme = useTheme(); // Access the current theme

    return (
        <div>
            <Container sx={{
                textAlign: 'center',
                margin: 0,
            }}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: theme.palette.text.primary
                    }}
                >
                    Use <span className={"gradient-text tracking-tight inline font-semibold"}>convenient</span> tools
                    <br/>
                    with few simple clicks.
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 4
                    }}
                >
                    Rapid online tools for single user.
                </Typography>
                <div>
                    <Button variant="contained" color="primary" sx={{mr: 2}}>
                        Get Started
                    </Button>
                    <Button variant="outlined" color="secondary">
                        Already have an account? Log in.
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default LandingPage;