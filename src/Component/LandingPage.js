import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Box } from '@mui/material';

function LandingPage() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        My Web Project
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
                <Container maxWidth="sm">
                    <Typography variant="h2" align="center" gutterBottom>
                        Welcome to My Web Project
                    </Typography>
                    <Typography variant="h5" align="center" paragraph>
                        A modern browsing experience tailored to your needs.
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h5" align="center">
                                Feature 1
                            </Typography>
                            <Typography>
                                Description of feature 1.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h5" align="center">
                                Feature 2
                            </Typography>
                            <Typography>
                                Description of feature 2.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h5" align="center">
                                Feature 3
                            </Typography>
                            <Typography>
                                Description of feature 3.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
            </Box>
        </>
    );
}

export default LandingPage;