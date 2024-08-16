import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ScrollingBar = () => {

    const theme = useTheme();
    const scrollText = '•     POST A MEMO     •     FIRST ON SEPTEMBER 25 2023     •     REPLY TO A REPLY     •     WONDERFUL EXPERIENCE     •     QUICK     •     STABLE';

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                width: '45vw',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 0',
                boxShadow: 6,
            }}
        >
            {/* Fade Effect on Left */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '70px',
                    background: `linear-gradient(to right, ${theme.palette.background.default}, rgba(255, 255, 255, 0))`,
                    zIndex: 1,
                }}
            />

            {/* Scrolling Content */}
            <Box
                sx={{
                    display: 'inline-block',
                    animation: 'scroll-left 20s linear infinite',
                    whiteSpace: 'pre',
                    position: 'relative',
                }}
            >
                <Typography variant="body1" sx={{ display: 'inline', mx: 2 }}>
                    {scrollText}
                </Typography>
                <Typography variant="body1" sx={{ display: 'inline', mx: 2 }}>
                    {scrollText}
                </Typography>
            </Box>

            {/* Fade Effect on Right */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '70px',
                    background: `linear-gradient(to left, ${theme.palette.background.default}, rgba(255, 255, 255, 0))`,
                    zIndex: 1,
                }}
            />

            <style jsx="true">{`
                @keyframes scroll-left {
                    0% {
                    transform: translateX(0%);
                    }
                    100% {
                    transform: translateX(-50%);
                    }
                }
            `}
            </style>
        </Box>
    );
};

export default ScrollingBar;