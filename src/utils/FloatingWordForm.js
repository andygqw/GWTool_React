import React from 'react';
import {TextField, Box, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';


const FloatingWordForm = ({label}) => {

    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 8,
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                animation: `float 6s ease-in-out infinite`,
                padding: 4,
                boxShadow: 10,
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h6" sx={{
                color: 'text.primary',
                textAlign: 'left',
            }}>
                {label}
            </Typography>
            <TextField color="primary"
                       variant="outlined"
                       size="small"
                       fullWidth
                       label="Enter your text here"
                       multiline
                       rows={10}
                       sx={{
                           mt: 2,
                       }}
            />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                flexDirection: 'row',
            }}>
                <TextField color="primary"
                           variant="outlined"
                           fullWidth
                           label="Word to replace"
                           size='small'
                           sx={{
                               mr: 2,
                           }}
                />
                <TextField color="primary"
                           variant="outlined"
                           fullWidth
                           label="Replacement word"
                           size='small'
                />
            </Box>

            <style>
                {`
                    @keyframes float {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(15px, 10px); }
                        100% { transform: translate(0, 0); }
                    }
                `}
            </style>
        </Box>

    );
};

export default FloatingWordForm;