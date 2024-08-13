import React from 'react';
import {TextField, Box, Typography} from '@mui/material';

const FloatingInput = ({label, value, onChange, sx, float}) => {

    return (
        <Box
            sx={{
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                ...sx,
                animation: `${float} 8s ease-in-out infinite`,
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="subtitle1" sx={{
                color: 'text.secondary',
                textAlign: 'left',
            }}>
                {label}
            </Typography>
            <TextField color="primary"
                       variant="outlined"
                       value={value}
                       onChange={onChange}
            />
        </Box>
    );
};

export default FloatingInput;