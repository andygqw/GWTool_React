import React, {useState, useEffect, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Container, Button, Typography, Box, List, ListItem,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    ListItemIcon, ListItemText, Checkbox, CircularProgress
} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import {formatFileSize} from "../utils/helper";
import api from '../utils/api';
import axios from 'axios';

const FilePage = ({isLoggedIn, setIsLoggedIn}) => {

    const theme = useTheme();
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);

    const fetchFiles = useCallback(async () => {
        try {
            const response = await api.get('/file', {
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                }
            });
            if (response.status === 200) {
                setFiles(response.data);
            } else if (response.status === 401) {
                localStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
                navigate('/login', { state: { from: location } });
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [location, navigate, setIsLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchFiles();
        } else {
            navigate('/login', { state: { from: location } });
        }
        setError('');
    }, [isLoggedIn, fetchFiles, navigate, location]);


    const handleUpload = async (acceptedFiles) => {

        //const uploadedFiles = event.target.files;
        const keys = [];
        // for (let file of uploadedFiles) {
        //     keys.push(file.name);
        // }
        for (let file of acceptedFiles) {
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

                for (let i = 0; i < acceptedFiles.length; i++) {
                    const file = acceptedFiles[i];
                    const presignedUrl = presignedUrls[i].url;

                    if (file.name === presignedUrls[i].key) {

                        await axios.put(presignedUrl, file, {
                            headers: {
                                'Content-Type': file.type,
                            },
                        });
                    }
                }
                await fetchFiles();
            } else if (response.status === 401) {
                localStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
                navigate('/login', { state: { from: location } });
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: handleUpload,
        multiple: true,
        noClick: false,
        noKeyboard: true
    });

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
            setLoading(true);
            const response = await api.post('/file',
                {keys: selectedFiles.map((file) => (file.key))},
                {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });
            if (response.status === 200) {
                await fetchFiles();
            } else if (response.status === 401) {
                localStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
                navigate('/login', { state: { from: location } });
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setSelectedFiles([]);
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
        }}>
            <Container maxWidth="md" sx={{
                textAlign: 'center',
                backgroundColor: {xs: "transparent", sm: theme.palette.background.paper},
                padding: 4,
                borderRadius: 2,
                boxShadow: {xs: 0, sm: 5},
                marginTop: {xs: 4, sm: 0},
                display: 'flex',
                flexDirection: {xs: 'column', md: 'row'},
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{ marginRight: '16px'}}>
                    < Typography variant="h4" gutterBottom>
                        File Management
                    </Typography>
                    {error && <Typography color="error" variant="body2">{error}
                    </Typography>}

                    <Box {...getRootProps()} sx={{
                        border: '2px dashed',
                        borderColor: theme.palette.divider,
                        borderRadius: 2,
                        padding: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: theme.palette.background.default,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'auto',
                    }}>
                        <input {...getInputProps()} />
                        <CloudUploadIcon sx={{fontSize: 50, color: theme.palette.text.secondary}}/>
                        <Typography variant="h6" gutterBottom>
                            {isDragActive ? "Drop the files here ..." : "Drag and drop or select files"}
                        </Typography>
                        <Button variant="contained" sx={{mt: 2}}>
                            Select from computer
                        </Button>
                        <Typography variant="caption" color="textSecondary" sx={{marginTop: 2}}>
                            Note that files are automatically deleted 120 days after last upload.
                        </Typography>
                    </Box>
                </div>

                {files.length === 0 ? (
                        <Typography variant="body1">No files available.</Typography>
                    ) : (
                        <div>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingX: 2,
                                paddingLeft: '25px',
                            }}>
                                <Checkbox
                                    edge="start"
                                    checked={selectedFiles.length === files.length && files.length > 0}
                                    indeterminate={selectedFiles.length > 0 && selectedFiles.length < files.length}
                                    onChange={() => {
                                        if (selectedFiles.length === files.length) {
                                            setSelectedFiles([]);
                                        } else {
                                            setSelectedFiles(files);
                                        }
                                    }}
                                />
                                <Typography variant="body1">
                                    Selected {selectedFiles.length} of {files.length} files
                                </Typography>
                            </Box>
                            <List sx={{
                                textAlign: 'left',
                                maxHeight: '300px',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                border: `1px solid ${theme.palette.divider}`,
                                padding: 1,
                            }}>
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
                                                   style={{
                                                       color: theme.palette.text.primary,
                                                       wordWrap: 'break-word'
                                                   }}>
                                                    {file.key}
                                                </a>
                                            }
                                            secondary={<>{formatFileSize(file.size)}</>}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{mt: 3}}
                                disabled={selectedFiles.length === 0}
                                onClick={() => setOpenDialog(true)}
                            >
                                Delete Selected
                            </Button>
                        </div>
                    )
                }

                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the selected {selectedFiles.length} file(s)?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setOpenDialog(false);
                                handleDelete();
                            }}
                            color="secondary" autoFocus
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default FilePage;