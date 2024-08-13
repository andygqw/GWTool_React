import React from 'react';
import {Typography, Button, Container, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

const LandingPage = ({mode}) => {

    const theme = useTheme();
    const navigate = useNavigate();

    const sections = [
        {
            title: "Text",
            description: "Enhance your text transferring experience without log in.",
            buttonText: "Explore Text Tools",
            buttonAction: () => navigate('/text'),
            background: mode === 'dark' ? 'linear-gradient(to bottom right, #1f1c2c, #928DAB)' : 'linear-gradient(to bottom right, #f7f7f7, #e3e3e3)',
        },
        {
            title: "Words",
            description: "Manipulate and analyze words effortlessly.",
            buttonText: "Explore Words Tools",
            buttonAction: () => navigate('/words'),
            background: mode === 'dark' ? 'linear-gradient(to bottom right, #333, #111)' : 'linear-gradient(to bottom right, #f0f0f0, #dcdcdc)',
        },
        {
            title: "Files",
            description: "Manage your files with ease and efficiency.",
            buttonText: "Explore Files Tools",
            buttonAction: () => navigate('/files'),
            background: mode === 'dark' ? 'linear-gradient(to bottom right, #000428, #004e92)' : 'linear-gradient(to bottom right, #ffffff, #e8e8e8)',
        },
        {
            title: "Resources",
            description: "Access a wide range of resources to aid your work.",
            buttonText: "Explore Resources",
            buttonAction: () => navigate('/resources'),
            background: mode === 'dark' ? 'linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)' : 'linear-gradient(to bottom right, #fdfcfb, #e2d1c3)',
        },
        {
            title: "KisKis",
            description: "Discover the unique KisKis features.",
            buttonText: "Explore KisKis",
            buttonAction: () => navigate('/kiskis'),
            background: mode === 'dark' ? 'linear-gradient(to bottom right, #414345, #232526)' : 'linear-gradient(to bottom right, #e0eafc, #cfdef3)',
        },
    ];

    return (
        <div>
            <Container sx={{
                textAlign: 'center',
                margin: 0,
                padding: 4,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
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
                    Use <span
                    className={"gradient-text tracking-tight inline font-semibold"}>convenient</span> tools
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
                    <Button variant="contained"
                            color="primary"
                            sx={{mr: 2}}
                            onClick={() => navigate('/register')}
                    >
                        Get Started
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => navigate('/login')}
                    >
                        Already have an account? Log in.
                    </Button>
                </div>
            </Container>

            {sections.map((section, index) => (

                <Container sx={{
                    textAlign: 'center',
                    margin: 0,
                    padding: 4,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: theme.palette.text.primary
                        }}
                    >
                        {section.title}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                            mb: 4
                        }}
                    >
                        {section.description}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={section.buttonAction}
                    >
                        {section.buttonText}
                    </Button>
                </Container>
            ))}
        </div>
    );
};

export default LandingPage;