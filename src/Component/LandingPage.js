import React from 'react';
import {AppBar, Toolbar, Typography, Button, Container, Grid, Box, IconButton, Switch} from '@mui/material';
import {Brightness7, Brightness4} from '@mui/icons-material';

const LandingPage = ({mode, toggleTheme}) => {
    return (
        <div>


            <Container sx={{textAlign: 'center', mt: 10}}>
                <Typography variant="h2" component="h1" gutterBottom sx={{fontWeight: 'bold', color: '#fff'}}>
                    Make <span style={{color: '#9f67ff'}}>beautiful</span> websites
                    <br/>
                    regardless of your design experience.
                </Typography>
                <Typography variant="h6" sx={{color: '#aaa', mb: 4}}>
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