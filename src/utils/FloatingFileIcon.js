import React from 'react';
import FileOpen from '@mui/icons-material/FileOpen';
import {Box} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const FloatingFileIcon = () => {

    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                animation: `float 6s ease-in-out infinite`,
            }}
        >
            <FileOpen
                sx={{
                    fontSize: { xs: '8rem', sm: '10rem' },
                    color: theme.palette.text.primary,
                    cursor: 'pointer',
                }}
                onClick={() => navigate('/resource')}
            />
            <style>
                {`
                    @keyframes float {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(10px, -5px); }
                        100% { transform: translate(0, 0); }
                    }
                `}
            </style>
        </Box>);
};

export default FloatingFileIcon;