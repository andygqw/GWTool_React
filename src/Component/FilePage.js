import React, {useState, useEffect} from 'react';
import {Container, Button, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Checkbox} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import api from '../utils/api';

const FilePage = ({isLoggedIn}) => {

    const theme = useTheme();
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
            isLoggedIn ? fetchFiles() : navigate('/login');
            setError('');
        },
        [isLoggedIn, navigate]);

    const fetchFiles = async () => {
        try {
            const response = await api.get('/file',
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });
            if (response.status === 200) {
                setFiles(response.data.objects);
            } else if (response.status === 401) {
                navigate('/login');
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
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
            const response = await api.put('/file',
                formData,
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });
            if (response.status === 200) {
                await fetchFiles();
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
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
            const response = await api.delete('/files',
                {keys: selectedFiles},
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });
            if (response.status === 200) {
                await fetchFiles();
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setSelectedFiles([]);
        }
    };

    return (
        <Box sx={{
            height: {xs: 'auto', sm: '100vh'},
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
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
                                secondary={<a href={file.key}
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