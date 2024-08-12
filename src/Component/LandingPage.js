import React from 'react';
import {Typography, Button, Container} from '@mui/material';
import {useTheme} from '@mui/material/styles';

const LandingPage = ({mode, toggleTheme}) => {
    const theme = useTheme(); // Access the current theme

    return (
        <div>
            <Container sx={{textAlign: 'center', mt: 10}}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: theme.palette.text.primary
                    }}
                >
                    Make <span className={"gradient-text tracking-tight inline font-semibold"}>beautiful</span> websites
                    <br/>
                    regardless of your design experience.
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 4
                    }}
                >
                    Beautiful, fast, and modern React UI library.
                </Typography>
                <Button variant="contained" color="primary" sx={{mr: 2}}>
                    Get Started
                </Button>
                <Button variant="outlined" color="secondary">
                    $ npx nextui-cli@latest init
                </Button>
            </Container>
        </div>
    );
};

export default LandingPage;