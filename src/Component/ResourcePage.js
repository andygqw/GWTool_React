import React, {useState, useEffect, useCallback} from 'react';
import {Container, Typography, Box, List, ListItem, ListItemText, CircularProgress} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import api from '../utils/api';
import {formatFileSize} from "../utils/helper";

import {useTheme} from '@mui/material/styles';

const ResourcePage = ({isLoggedIn, setIsLoggedIn}) => {

    const theme = useTheme();
    const [resources, setResources] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const fetchResources = useCallback(async (path) => {
        try {
            setLoading(true);
            const response = await api.post(`/resource`, {
                prefix: path
            }, {
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                }
            });
            if (response.status === 200) {
                setResources(response.data);
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login', {state: {from: location}});
            } else if (response.status === 403) {
                throw new Error("Client does not have access to this feature, try other features!");
            } else {
                throw new Error('Failed to fetch resources');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [location, navigate, setIsLoggedIn]);

    useEffect(() => {
        isLoggedIn ? fetchResources(currentPath) : navigate('/login', {state: {from: location}});
    }, [currentPath, fetchResources, isLoggedIn, navigate, location]);

    const handleFolderClick = (folderName) => {

        setCurrentPath(folderName);
        fetchResources(folderName);
    };

    const handleBreadcrumbClick = (index) => {
        const parts = currentPath.split('/').filter(Boolean);
        const newPath = parts.slice(0, index + 1).join('/') + '/';
        setCurrentPath(newPath);
        fetchResources(newPath);
    };

    const getFolderName = (folder) => {

        const parts = folder.split('/');
        return parts[parts.length - 2];
    }

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </Box>
        );
    }

    const pathParts = currentPath.split('/').filter(Boolean);

    return (
        <Container maxWidth="md" sx={{textAlign: 'center', marginTop: 4}}>
            <Typography variant="h4" gutterBottom>
                Resources
            </Typography>
            {error && <Typography color="error" variant="body2">{error}</Typography>}


            {pathParts.length > 0 && (
                <Typography variant="body1" sx={{marginBottom: 2}}>
                    <span key={-1}>
                            <span
                                style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}
                                onClick={() => handleFolderClick('')}
                            >
                                Resources
                            </span>
                            {' >> '}
                        </span>
                    {pathParts.map((part, index) => (
                        <span key={index}>
                            <span
                                style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}
                                onClick={() => handleBreadcrumbClick(index)}
                            >
                                {part}
                            </span>
                            {index < pathParts.length - 1 && ' >> '}
                        </span>
                    ))}
                </Typography>
            )}

            {resources === null || (resources.folders.length === 0 && resources.files.length === 0) ? (
                <Typography variant="body1">No resources available.</Typography>
            ) : (
                <List>
                    {resources.folders.map((folder) => (
                        <ListItem button key={folder}
                                  onClick={() => handleFolderClick(folder)}>
                        <ListItemText
                                primary={
                                    <Typography variant="body1" color="primary">
                                        📁 {getFolderName(folder)}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                    {resources.files.map((file) => (

                        <ListItem button key={file.key}>
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
            )
            }
        </Container>
    )
        ;
};

export default ResourcePage;