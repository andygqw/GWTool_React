import React from 'react';
import {TextField, Box, Typography} from '@mui/material';

const FloatingInput = ({label, value, onChange, sx}) => {

    return (
        <Box
            sx={{
                position: 'absolute',
                right: '0',
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                animation: 'float 8s ease-in-out infinite',
                ...sx,
                '@keyframes float': {
                    '0%': {transform: 'translate(0, 0)'},
                    '50%': {transform: 'translate(20px, -20px)'},
                    '100%': {transform: 'translate(0, 0)'},
                }
            }}
            noValidate
            autoComplet="off"
        >
            <Typography variant="subtitle2" sx={{
                color: 'text.secondary',
                mb: 1,
                textAlign: 'left',
            }}>
                {label}
            </Typography>
            <TextField color="primary"
                       variant="outlined"
                       value={value}
                       size="small"
                       onChange={onChange}
            />
        </Box>
    );
};

export default FloatingInput;