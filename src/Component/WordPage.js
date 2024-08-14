import React, {useState} from 'react';
import {Container, TextField, Button, Typography, Box, IconButton} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const MAX_TEXT_LENGTH = 160000;

const WordPage = () => {

    const theme = useTheme();
    const [longText, setLongText] = useState('');
    const [wordToReplace, setWordToReplace] = useState('');
    const [replacementWord, setReplacementWord] = useState('');
    const [error, setError] = useState(null);

    const handleTextChange = (e) => {

        if (e.target.value.length <= MAX_TEXT_LENGTH) {
            setLongText(e.target.value);
        } else {
            setError('Text exceeds maximum allowed length');
        }
    };

    const handleReplace = () => {
        if (!wordToReplace || !replacementWord) {
            setError('Please specify both the word to replace and the replacement word.');
            return;
        }

        const newText = longText.split(' ').map(word =>
            word === wordToReplace ? replacementWord : word
        ).join(' ');

        setLongText(newText);
        setError(null);
    };

    const handleClear = () => {
        setLongText('');
        setWordToReplace('');
        setReplacementWord('');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(longText);
    };

    const wordCount = longText.trim().split(/\s+/).length;
    const charCount = longText.length;

    return (
        <Box sx={{
            width: '100vw',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            paddingTop: {xs: '42px', sm: '40px'},
            height: {xs: 'auto', sm: '100vh'},
        }}>
            <Container maxWidth="md" sx={{
                padding: 4,
            }}>
                <Typography variant="h5" gutterBottom sx={{color: theme.palette.text.primary}}>
                    Word Replacement Tool
                </Typography>

                {error && <Typography color="error" variant="body2">{error}</Typography>}

                <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter your text here"
                    value={longText}
                    onChange={handleTextChange}
                    margin="normal"
                    multiline
                    rows={10}
                    sx={{fontSize: {xs: '1rem', sm: '1.25rem'}}}
                />

                <Typography variant="body1" sx={{mt: 2}}>
                    Word Count: {wordCount} | Character Count: {charCount} / {MAX_TEXT_LENGTH}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 1,
                    flexDirection: {xs: 'column', sm: 'row'}
                }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Word to replace"
                        value={wordToReplace}
                        onChange={(e) => setWordToReplace(e.target.value)}
                        margin="normal"
                        sx={{fontSize: {xs: '1rem', sm: '1.25rem'}, mb: {xs: 1, sm: 0}}}
                        size='small'
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Replacement word"
                        value={replacementWord}
                        onChange={(e) => setReplacementWord(e.target.value)}
                        margin="normal"
                        sx={{fontSize: {xs: '1rem', sm: '1.25rem'}, ml: {xs: 0, sm: 2}}}
                        size='small'
                    />
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', mt: {xs: 2, sm: 3}}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReplace}
                    >
                        Replace Word
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleClear} sx={{ml: 2}}>
                        Clear
                    </Button>
                    <IconButton color="primary" onClick={handleCopy} sx={{ml: 2}}>
                        <ContentCopyIcon/>
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
};

export default WordPage;