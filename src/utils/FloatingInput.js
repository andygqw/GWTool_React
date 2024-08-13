import React from 'react';
import {TextField, Box, Typography} from '@mui/material';

const FloatingInput = ({label, value, onChange, sx, float}) => {

    return (
        <Box
            sx={{
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                animation: `${float} 8s ease-in-out infinite`,
                ...sx,
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="subtitle2" sx={{
                color: 'text.secondary',
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