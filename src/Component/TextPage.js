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

            const response = await api.post('/text', {text: inputText}, {
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                }
            });
            if (response.status === 200) {
                await fetchText();
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleClear = () => {
        setInputText('');
    };

    const handleDeepClear = async () => {
        try {
            const response = await api.delete('/text', {
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                }
            });
            if (response.status === 200) {
                await fetchText();
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchText = async () => {
        try {
            const response = await api.get('/text', {
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                }
            });
            if (response.status === 200) {

                setRetrievedText(response.data.text === null ? '' : response.data.text);
            } else {
                throw new Error(response.data.error);
            }
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
        <Container maxWidth="lg" sx={{
            margin: 0,
            height: {xs: 'auto', sm: '100vh'},
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: {xs: '40px', sm: 0},
            padding: { xs: 4, sm: 3},
        }}>
            <Box sx={{width: {xs: '100%', md: '48%'}, mb: {xs: 3, md: 0}}}>
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
                    sx={{
                        fontSize: {xs: '1rem', sm: '1.25rem'},
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{mt: 2}}>
                    Submit Text
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClear} sx={{mt: 2, ml: 2}}>
                    Clear
                </Button>
            </Box>

            <Box sx={{width: {xs: '100%', md: '48%'}}}>
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
                    sx={{
                        fontSize: {xs: '1rem', sm: '1.25rem'},
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
    );
};

export default TextPage;