import React, {useState, useEffect, useCallback} from 'react';
import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Breadcrumbs,
    Link,
    IconButton,
} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import api from '../utils/api';
import {formatFileSize} from "../utils/helper";
import {Folder, InsertDriveFile} from '@mui/icons-material';
import {useTheme} from '@mui/material/styles';
import NoPermissionPage from './NoPermissionPage';

const ResourcePage = ({isLoggedIn, setIsLoggedIn}) => {
    const theme = useTheme();
    const [resources, setResources] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState('');
    const [isAllowed, setIsAllowed] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const fetchResources = useCallback(async (path) => {
        try {
            setLoading(true);
            const response = await api.post(`/resource`, {prefix: path}, {
                validateStatus: (status) => status >= 200 && status <= 500
            });
            if (response.status === 200) {
                setIsAllowed(true);
                setResources(response.data);
            } else if (response.status === 401) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login', {state: {from: location}});
            } else if (response.status === 403) {
                setIsAllowed(false);
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
        if (isLoggedIn) {
            fetchResources(currentPath);
        } else {
            navigate('/login', {state: {from: location}});
        }
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
    };

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (!isAllowed) {
        
        return <NoPermissionPage/>;
    }

    const pathParts = currentPath.split('/').filter(Boolean);

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
                minWidth: '60vw',
                minHeight: '60vh',
                marginTop: 4,
                backgroundColor: {xs: "transparent", sm: theme.palette.background.paper},
                borderRadius: 4,
                boxShadow: {xs: 0, sm: 5},
                padding: 4,
            }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Resources
                    </Typography>

                    {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}

                    {/* Breadcrumb Navigation */}
                    {pathParts.length > 0 && (
                        <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: 1}}>
                            <Link
                                underline="hover"
                                color="inherit"
                                onClick={() => handleFolderClick('')}
                                sx={{cursor: 'pointer'}}
                            >
                                Resources
                            </Link>
                            {pathParts.map((part, index) => (
                                <Link
                                    key={index}
                                    underline="hover"
                                    color={index === pathParts.length - 1 ? 'textPrimary' : 'inherit'}
                                    onClick={() => handleBreadcrumbClick(index)}
                                    sx={{cursor: 'pointer'}}
                                >
                                    {part}
                                </Link>
                            ))}
                        </Breadcrumbs>
                    )}

                    {/* No Resources Available */}
                    {resources === null || (resources.folders.length === 0 && resources.files.length === 0) ? (
                        <Typography variant="body1" align="center">No resources available.</Typography>
                    ) : (
                        <List sx={{
                            textAlign: 'left',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            border: `1px solid ${theme.palette.divider}`,
                            padding: 1,
                        }}>
                            {/* Folder List */}
                            {resources.folders.map((folder) => (
                                <ListItem button key={folder} onClick={() => handleFolderClick(folder)}>
                                    <IconButton edge="start" color="primary">
                                        <Folder/>
                                    </IconButton>
                                    <ListItemText
                                        primary={<Typography variant="body1"
                                                             color="primary">{getFolderName(folder)}</Typography>}
                                    />
                                </ListItem>
                            ))}

                            {resources.files.map((file) => (
                                <ListItem key={file.key} sx={{display: 'flex', alignItems: 'center'}}>
                                    <IconButton edge="start" color="secondary">
                                        <InsertDriveFile/>
                                    </IconButton>
                                    <ListItemText
                                        primary={
                                            <a
                                                href={file.url}
                                                rel="noopener noreferrer"
                                                download
                                                style={{color: theme.palette.text.primary, wordWrap: 'break-word'}}
                                            >
                                                {file.key}
                                            </a>
                                        }
                                        secondary={formatFileSize(file.size)}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
            </Container>
        </Box>
    );
};

export default ResourcePage;