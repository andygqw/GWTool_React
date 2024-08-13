import React, {useState, useEffect} from 'react';
import {Container, TextField, Button, Typography, Box, IconButton} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';  // Icon for the Copy button
import api from '../utils/api';

const TextPage = () => {
    const theme = useTheme();
    const [inputText, setInputText] = useState('');
    const [retrievedText, setRetrievedText] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            if (!inputText) {
                throw new Error('Please enter some text before submitting.');
            }

            await api.post('/text', {text: inputText});
            await fetchText();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleClear = () => {
        setInputText('');
    };

    const handleDeepClear = async () => {
        try {
            await api.delete('/text');
            await fetchText();
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchText = async () => {
        try {
            const response = await api.get('/text');
            setRetrievedText(response.data.text === null ? '' : response.data.text);
        } catch (err) {
            setError('Failed to retrieve text from the API.');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(retrievedText);
    };

    useEffect(() => {
        fetchText();
    }, []);

    return (
        <Box component="main" sx={{
            height: '100vh',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            background: theme.palette.mode === 'dark'
                ? 'linear-gradient(to bottom right, #090909, #3C1945)'
                : 'linear-gradient(to bottom right, #ffffff, #E9CEF0)',
        }}>
            <Container maxWidth="lg" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Left Side - Input Text Field */}
                <Box sx={{width: '48%'}}>
                    <Typography variant="h5" gutterBottom sx={{color: theme.palette.text.primary}}>
                        Enter Text
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Enter Text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        margin="normal"
                        multiline
                        rows={15}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{mt: 2}}>
                        Submit Text
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleClear} sx={{mt: 2, ml: 2}}>
                        Clear
                    </Button>
                </Box>

                {/* Right Side - Retrieved Text Field */}
                <Box sx={{width: '48%'}}>
                    <Typography variant="h5" gutterBottom sx={{color: theme.palette.text.primary}}>
                        Retrieved Text
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={retrievedText}
                        margin="normal"
                        multiline
                        rows={15}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                        <Button variant="contained" color="primary" onClick={fetchText}>
                            Retrieve Text
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleDeepClear} sx={{ml: 2}}>
                            Clear
                        </Button>
                        <IconButton color="primary" onClick={handleCopy} sx={{ml: 2}}>
                            <ContentCopyIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default TextPage;