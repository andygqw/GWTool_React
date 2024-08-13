import React from 'react';
import {Typography, Button, Container, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

const LandingPage = ({mode}) => {

    const theme = useTheme();
    const navigate = useNavigate();

    const sections = [
        {
            description1: "Text transferring experience ",
            description2: "without ",
            description3: "log in.",
            subTitle: "Text",
            buttonText: "Explore Text Tools",
            buttonAction: () => navigate('/text'),
            gradientClass:  "gradient-text2 tracking-tight inline font-semibold",
        },
        {
            description1: "Manipulate and analyze words ",
            description2: "effortlessly.",
            description3: "",
            subTitle: "Text",
            buttonText: "Explore Words Tools",
            buttonAction: () => navigate('/words'),
            gradientClass: "gradient-text3 tracking-tight inline font-semibold",
        },
        {
            description1: "Manage ",
            description2: "files ",
            description3: "with ease and efficiency.",
            subTitle: "Text",
            buttonText: "Explore Files Tools",
            buttonAction: () => navigate('/files'),
            gradientClass: "gradient-text4 tracking-tight inline font-semibold",
        },
        {
            description1: "Access a ",
            description2: "wide range ",
            description3: "of resources.",
            subTitle: "Text",
            buttonText: "Explore Resources",
            buttonAction: () => navigate('/resources'),
            gradientClass:  "gradient-text5 tracking-tight inline font-semibold",
        },
        {
            description1: "Discover the ",
            description2: "unique ",
            description3: "KisKis features.",
            subTitle: "Text",
            buttonText: "Explore KisKis",
            buttonAction: () => navigate('/kiskis'),
            gradientClass:  "gradient-text tracking-tight inline font-semibold",
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
                    alignItems: 'center',
                }}>
                    <div className={'feature-card'}>
                        <Typography
                            variant="h3"
                            component="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                color: theme.palette.text.primary
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
                    </div>
                </Container>
            ))}
        </div>
    );
};

export default LandingPage;