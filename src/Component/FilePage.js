import React, {useState, useEffect} from 'react';
import {
    Container, Button, Typography, Box, List, ListItem,
    ListItemIcon, ListItemText, Checkbox, CircularProgress
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import api from '../utils/api';
import axios from 'axios';

const FilePage = ({isLoggedIn, setIsLoggedIn}) => {

    const theme = useTheme();
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
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
                setFiles(response.data);
                setIsEmpty(false);
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login');
            } else if (response.status === 204) {
                setIsEmpty(true);
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (event) => {

        const uploadedFiles = event.target.files;
        const keys = [];
        for (let file of uploadedFiles) {
            keys.push(file.name);
        }

        try {
            setLoading(true);
            const response = await api.put('/file',
                {keys: keys},
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });
            if (response.status === 200) {

                const presignedUrls = response.data.result;

                for (let i = 0; i < uploadedFiles.length; i++) {
                    const file = uploadedFiles[i];
                    const presignedUrl = presignedUrls[i].url;

                    await axios.put(presignedUrl, file, {
                        headers: {
                            'Content-Type': file.type,
                        },
                    });
                }

                await fetchFiles();
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login');
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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
            const response = await api.delete('/file',
                {keys: selectedFiles},
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });
            if (response.status === 200) {
                await fetchFiles();
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login');
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setSelectedFiles([]);
        }
    };
    const formatFileSize = (sizeInBytes) => {
        const sizeInMB = sizeInBytes / (1024 * 1024);
        if (sizeInMB < 1) {
            return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        } else if (sizeInMB < 1024) {
            return `${sizeInMB.toFixed(2)} MB`;
        } else {
            const sizeInGB = sizeInMB / 1024;
            return `${sizeInGB.toFixed(2)} GB`;
        }
    };


    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </Box>
        );
    }
    return (
        <Box sx={{
            minHeight: '100vh',
            height: 'auto',
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


                {isEmpty ? (
                    <Typography variant="body1">No files available.</Typography>
                ) : (
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
                                    primary={
                                        <a href={file.url} rel="noopener noreferrer" download
                                           style={{color: theme.palette.text.primary}}>
                                            {file.key}
                                        </a>
                                    }
                                    secondary={<>{formatFileSize(file.size)}</>}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}

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