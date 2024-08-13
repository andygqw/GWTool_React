import React, {useState, useEffect} from 'react';
import {Container, TextField, Button, Typography, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import api from '../utils/api'; // Assume you're using the same api instance

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

    const handleClear = async () => {
        try {
            setInputText('');
        } catch (err) {
            setError(err.message);
        }
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
        }
        catch (err) {
            setError('Failed to retrieve text from the API.');
        }
    };

    useEffect(() => {

        fetchText();
    }, []);

    return (
        <Box component="main" sx={{
            height: '100vh',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
        }}>
            <Container maxWidth="sm">
                <Typography variant="h4" gutterBottom sx={{color: theme.palette.text.primary}}>
                    Text Transfer
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
                    rows={4}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{mt: 2}}>
                    Submit Text
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClear} sx={{mt: 2}}>
                    Clear
                </Button>

                <Box sx={{mt: 4}}>
                    <Typography variant="h5" gutterBottom sx={{color: theme.palette.text.primary}}>
                        Retrieved Text
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={retrievedText}
                        margin="normal"
                        multiline
                        rows={4}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={fetchText} sx={{mt: 2}}>
                        Retrieve Text
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleDeepClear} sx={{mt: 2}}>
                        Clear
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default TextPage;