import React, {useState, useEffect} from 'react';
import {Container, Button, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Checkbox} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import api from '../utils/api';

const FilePage = () => {
    const theme = useTheme();
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await api.get('/files');
            setFiles(response.data);
        } catch (err) {
            setError('Failed to fetch files.');
        }
    };

    const handleUpload = async (event) => {
        const uploadedFiles = event.target.files;
        const formData = new FormData();
        for (let file of uploadedFiles) {
            formData.append('files', file);
        }

        try {
            setUploading(true);
            await api.post('/upload', formData);
            setUploading(false);
            fetchFiles(); // Refresh the file list
        } catch (err) {
            setError('Failed to upload files.');
            setUploading(false);
        }
    };

    const handleSelectFile = (file) => {
        const isSelected = selectedFiles.includes(file);
        if (isSelected) {
            setSelectedFiles(selectedFiles.filter(f => f !== file));
        } else {
            setSelectedFiles([...selectedFiles, file]);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete('/files', {data: {files: selectedFiles}});
            fetchFiles(); // Refresh the file list
            setSelectedFiles([]); // Clear selection
        } catch (err) {
            setError('Failed to delete files.');
        }
    };

    return (
        <Box sx={{
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
            <Container maxWidth="md" sx={{
                textAlign: 'center',
                backgroundColor: theme.palette.background.paper,
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
            }}>
                <Typography variant="h4" gutterBottom>
                    File Management
                </Typography>
                {error && <Typography color="error" variant="body2">{error}</Typography>}

                <Button
                    variant="contained"
                    component="label"
                    sx={{mb: 3}}
                >
                    Upload Files
                    <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleUpload}
                    />
                </Button>

                {uploading && <Typography variant="body2">Uploading...</Typography>}

                <List sx={{textAlign: 'left', maxHeight: '400px', overflowY: 'auto', mt: 3}}>
                    {files.map((file) => (
                        <ListItem key={file.name} sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={selectedFiles.includes(file)}
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={() => handleSelectFile(file)}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={file.name}
                                secondary={<a href={file.downloadUrl} target="_blank"
                                              rel="noopener noreferrer">Download</a>}
                            />
                        </ListItem>
                    ))}
                </List>

                <Button
                    variant="contained"
                    color="secondary"
                    sx={{mt: 3}}
                    disabled={selectedFiles.length === 0}
                    onClick={handleDelete}
                >
                    Delete Selected
                </Button>
            </Container>
        </Box>
    );
};

export default FilePage;