import React from 'react';
import {Typography, Button, Container, Box} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

import GroupFloatingInput from '../utils/GroupFloatingInput';

const LandingPage = ({mode, isLoggedIn}) => {

    const theme = useTheme();
    const navigate = useNavigate();

    const sections = [
        {
            title: "Text",
            description1: "Text transferring ",
            description2: "without ",
            description3: "log in.",
            description: "Rapid text transfer across devices.",
            buttonText: "Explore Text",
            buttonAction: () => navigate('/text'),
            gradientClass: "gradient-text2 tracking-tight inline font-semibold",
        },
        {
            title: "Word",
            description1: "Manipulate and analyze words ",
            description2: "effortlessly.",
            description3: "",
            description: "Words replacement? and more!",
            buttonText: "Explore Words",
            buttonAction: () => navigate('/words'),
            gradientClass: "gradient-text3 tracking-tight inline font-semibold",
        },
        {
            title: "File",
            description1: "Manage ",
            description2: "files ",
            description3: "with ease and efficiency.",
            description: "Multi-purposes file storage.",
            buttonText: "Explore Files",
            buttonAction: () => navigate('/files'),
            gradientClass: "gradient-text4 tracking-tight inline font-semibold",
        },
        {
            title: "Resources",
            description1: "Access a ",
            description2: "wide range ",
            description3: "of resources.",
            description: "Periodically updating resources.",
            buttonText: "Explore Resources",
            buttonAction: () => navigate('/resources'),
            gradientClass: "gradient-text5 tracking-tight inline font-semibold",
        },
        {
            title: "KisKis",
            description1: "Discover the ",
            description2: "unique ",
            description3: "KisKis features.",
            description: "Let's talk!",
            buttonText: "Explore KisKis",
            buttonAction: () => navigate('/kiskis'),
            gradientClass: "gradient-text tracking-tight inline font-semibold",
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
                        color: theme.palette.text.primary,
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' }
                    }}
                >
                    {isLoggedIn ? (
                        <>Welcome! Use <span className={"gradient-text tracking-tight inline font-semibold"}>
                            convenient
                        </span> tools<br/>with a few simple clicks.</>
                    ) : (
                        <>Use <span
                            className={"gradient-text tracking-tight inline font-semibold"}>convenient</span> tools<br/>with
                            a few simple clicks.
                        </>
                    )}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 4,
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                    }}
                >
                    Rapid online tools for single user.
                </Typography>
                <div>
                    {isLoggedIn ? (
                        // <Button variant="contained"
                        //         color="primary"
                        //         sx={{mr: 2}}
                        //         onClick={() => navigate('/resources')}
                        // >
                        //     Go to Resources
                        // </Button>
                        <></>
                    ) : (
                        <>
                            <Button variant="contained"
                                    color="primary"
                                    sx={{
                                        mr: { xs: 0, sm: 2},
                                        width: { xs: '100%', sm: 'auto' },
                                    }}
                                    onClick={() => navigate('/register')}
                            >
                                Get Started
                            </Button>
                            <Button variant="outlined"
                                    color="secondary"
                                    sx={{
                                        mt: { xs: 1, sm: 0},
                                        width: { xs: '100%', sm: 'auto' },
                                    }}
                                    onClick={() => navigate('/login')}
                            >
                                Already have an account? Log in.
                            </Button>
                        </>
                    )}
                </div>

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '20px',
                        left: { xs: '48%', sm: '50%'},
                        transform: 'translateX(-50%)',
                        animation: 'bounce 2s infinite'
                    }}
                >
                    <KeyboardDoubleArrowDownIcon
                        sx={{
                            fontSize: { xs: '2rem', sm: '3rem'},
                            color: theme.palette.text.secondary
                        }}
                    />
                </Box>
                <style>
                    {`
                        @keyframes bounce {
                            0%, 100% {
                                transform: translateY(0);
                            }
                            50% {
                                transform: translateY(-10px);
                            }
                        }
                    `}
                </style>
            </Container>

            {sections.map((section, index) => (

                <Container key={index} sx={{
                    textAlign: 'center',
                    margin: 0,
                    padding: 4,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div className={'feature-section'}>
                        <Box
                            sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%'}}>
                            <Box className={'feature-card'} sx={{flexBasis: '45%', textAlign: 'left'}}>
                                <Typography
                                    variant="h3"
                                    component="h2"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 'bold',
                                        color: theme.palette.text.primary,
                                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' }
                                    }}
                                >
                                    {section.description1}
                                    <span className={section.gradientClass}>
                                        {section.description2}
                                    </span>
                                    {section.description3}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        mb: 4,
                                        fontSize: { xs: '1rem', sm: '1.25rem' },
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
                            </Box>
                            {section.title === "Text" ?
                                <Box sx={{
                                    flexBasis: '45%',
                                    display: { xs: 'none', md: 'block' }
                                }}>
                                    <GroupFloatingInput/>
                                </Box>
                                :
                                <></>
                            }
                        </Box>
                    </div>
                </Container>
            ))}
        </div>
    );
};

export default LandingPage;