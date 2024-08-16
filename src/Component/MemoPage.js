import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container, Typography, Box, Card, CardContent, CardActions,
    Button, Avatar, CircularProgress, Dialog, DialogContent,
    DialogTitle, DialogActions, TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import api from '../utils/api';
import axios from 'axios';

import NoPermissionPage from './NoPermissionPage';

const MemoPage = ({ isLoggedIn, setIsLoggedIn }) => {

    const theme = useTheme();
    const [memos, setMemos] = useState([]);
    const [openImage, setOpenImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false);
    const [error, setError] = useState(null);

    // States for Add Memo Modal
    const [openAddMemoModal, setOpenAddMemoModal] = useState(false);
    const [newMemoTitle, setNewMemoTitle] = useState('');
    const [newMemoDescription, setNewMemoDescription] = useState('');
    const [newMemoImage, setNewMemoImage] = useState(null);

    // State for Delete Confirmation Modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [memoToDelete, setMemoToDelete] = useState(null);

    // State for Reply Modal
    const [openReplyModal, setOpenReplyModal] = useState(false);
    const [memoToReply, setMemoToReply] = useState(null);
    const [replyToReply, setReplyToReply] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const fetchMemos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/memo', {
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                }
            });
            if (response.status === 200) {
                setError(null);
                setIsAllowed(true);
                setMemos(response.data);
            }
            else if (response.status === 401) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login', { state: { from: location } });
            }
            else if (response.status === 403) {
                setIsAllowed(false);
            }
            else {
                throw new Error(response.data.error || 'Failed to load memos');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [location, navigate, setIsLoggedIn]);

    useEffect(() => {

        if (isLoggedIn) {
            fetchMemos();
        } else {
            navigate('/login', { state: { from: location } });
        }
        setError('');
    }, [fetchMemos, navigate, location, isLoggedIn]);

    const handleAddMemo = async () => {
        try {

            if (newMemoImage && !newMemoImage.type.startsWith('image/')) {
                throw new Error('Only images are allowed.');
            }

            if (newMemoTitle === null || newMemoTitle.length === 0){
                throw new Error('Title is required');
            }

            const response = await api.put('/memo', {
                name: newMemoTitle,
                description: newMemoDescription,
                image: newMemoImage === null ? null : newMemoImage.name
            }, {
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                }
            });

            if (response.status === 200) {

                if (response.data.presignedUrl !== null) {

                    await axios.put(response.data.presignedUrl, newMemoImage, {
                        headers: {
                            'Content-Type': newMemoImage.type
                        }
                    });
                }

                fetchMemos();
                setNewMemoTitle('');
                setNewMemoDescription('');
                setNewMemoImage(null);

            } else if (response.status === 401) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login', { state: { from: location } });
            } else {
                throw new Error(response.data.error || 'Failed to add memo');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setOpenAddMemoModal(false);
        }
    };

    const handleDeleteMemo = async () => {
        try {
            setLoading(true);
            const response = await api.post(`/memo`, {
                memo_id: memoToDelete
            }, {
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                }
            });

            if (response.status === 200) {
                fetchMemos();
            }
            else if (response.status === 401) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login', { state: { from: location } });
            }
            else if (response.status === 403) {
                throw new Error('You can\'t delete a memo which doesn\'t belong to you');
            }
            else {
                throw new Error(response.data.error || 'Failed to load memos');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setOpenDeleteModal(false);
            setMemoToDelete(null);
        }
    };

    const handleReplyMemo = async () => {
        try {
            setLoading(true);
            if (memoToReply) {
                const response = await api.put(`/reply`, {
                    memo_id: memoToReply,
                    reply_id: replyToReply,
                    content: replyContent
                }, {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });

                if (response.status === 200) {
                    fetchMemos();
                }
                else if (response.status === 401) {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    navigate('/login', { state: { from: location } });
                }
                else {
                    throw new Error(response.data.error || 'Failed to reply');
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setOpenReplyModal(false);
            setMemoToReply(null);
            setReplyToReply(null);
            setReplyContent('');
        }
    };

    const handleDeleteReply = async () => {
        try {
            setLoading(true);
            if (memoToReply) {
                const response = await api.post(`/reply`, {
                    reply_id: replyToReply,
                }, {
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    }
                });

                if (response.status === 200) {
                    fetchMemos();
                }
                else if (response.status === 403) {
                    throw new Error('You can\'t delete a reply which doesn\'t belong to you');
                }
                else if (response.status === 406) {
                    throw new Error('You can\'t delete a reply when others have replied to this reply');
                }
                else if (response.status === 401) {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    navigate('/login', { state: { from: location } });
                }
                else {
                    throw new Error(response.data.error || 'Failed to delete');
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setOpenReplyModal(false);
            setMemoToReply(null);
            setReplyToReply(null);
            setReplyContent('');
        }
    }

    const handleOpenAddMemoModal = () => setOpenAddMemoModal(true);
    const handleCloseAddMemoModal = () => setOpenAddMemoModal(false);

    const handleOpenDeleteModal = (memoId) => {
        setMemoToDelete(memoId);
        setOpenDeleteModal(true);
    };
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setMemoToDelete(null);
    };

    const handleOpenReplyModal = (memoId, replyId) => {
        setReplyToReply(replyId);
        setMemoToReply(memoId);
        setOpenReplyModal(true);
    };
    const handleCloseReplyModal = () => {
        setOpenReplyModal(false);
        setMemoToReply(null);
        setReplyContent('');
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setOpenImage(true);
    };
    const handleCloseImage = () => {
        setOpenImage(false);
        setSelectedImage(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isAllowed) {
        return <NoPermissionPage />;
    }

    return (
        <Container maxWidth="md" sx={{ 
                mt: 4,
                marginTop: 8,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Typography variant="h4" gutterBottom>
                Memos
            </Typography>
            {error && <Typography color="error">{error}</Typography>}

            <Button variant="contained" color="primary" sx={{mb: 2}} onClick={handleOpenAddMemoModal}>
                Add Memo
            </Button>
            <Dialog open={openAddMemoModal} onClose={handleCloseAddMemoModal} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Memo</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Memo Title"
                        value={newMemoTitle}
                        onChange={(e) => setNewMemoTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Memo Description"
                        value={newMemoDescription}
                        onChange={(e) => setNewMemoDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setNewMemoImage(e.target.files[0])}
                        />
                    </Button>
                    {newMemoImage && (
                        <Typography sx={{ mt: 2 }}>Selected image: {newMemoImage.name}</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddMemoModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddMemo} color="primary">
                        Add Memo
                    </Button>
                </DialogActions>
            </Dialog>

            {[...memos].reverse().map((memo) => (
                <Card key={memo.id} sx={{
                    mb: 3, display: 'flex', flexDirection: 'row', flexGrow: true, gap: 2, justifyContent: 'flex-start',
                    boxShadow: 6, backgroundColor: theme.palette.background.paper,
                }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', maxWidth: {xs: '100%', sm: '60%'} }}>
                        <div style={{ padding: 10 }}>

                            <Typography variant="h5">{memo.name}</Typography>
                            {memo.description && (
                                <Typography sx={{ mt: 2, whiteSpace: 'pre-line' }}>
                                    {memo.description}
                                </Typography>
                            )}
                            {/* Replies Section */}
                            {memo.replies.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1">Replies:</Typography>
                                    {memo.replies.map((reply) => (
                                        <Box key={reply.id} sx={{ ml: 2 }}>
                                            <Typography variant="body2" color="textSecondary">
                                                {reply.reply_to === null ? (
                                                    <>{reply.author} ({new Date(reply.create_time).toLocaleString()}):</>
                                                ) : (
                                                    <>{reply.author} replied to {reply.reply_to} ({new Date(reply.create_time).toLocaleString()}):</>
                                                )}
                                            </Typography>
                                            <Typography variant="body1"
                                                onClick={() => handleOpenReplyModal(memo.id, reply.id)}
                                                sx={{ whiteSpace: 'pre-line', cursor: 'pointer' }}>
                                                {reply.content}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </div>

                        <CardActions sx={{ marginTop: 'auto', padding: 0, }}>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => handleOpenReplyModal(memo.id, null)}
                            >
                                Reply
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={() => handleOpenDeleteModal(memo.id)}
                            >
                                Delete
                            </Button>

                            <Box sx={{ flex: '1 1 100%' }}>
                                <Typography variant="subtitle2" color="textSecondary" sx={{ textAlign: 'right' }}>
                                    By {memo.author} on {new Date(memo.create_time).toLocaleString()}
                                </Typography>
                            </Box>
                        </CardActions>
                    </CardContent>

                    {memo.image && (
                        <Box sx={{
                            flex: '0 1 auto', alignSelf: 'center', display: {xs: 'none', sm: 'block'},
                            maxWidth:'40%', marginLeft: 'auto', padding: 4
                        }}>
                            <Avatar
                                variant="square"
                                src={memo.image}
                                alt={memo.name}
                                sx={{ width: '100%', height: 'auto', maxHeight: '500px', cursor: 'pointer' }}
                                onClick={() => handleImageClick(memo.image)}
                            />
                        </Box>
                    )}
                </Card>
            ))
            }

            {/* Reply Modal */}
            <Dialog open={openReplyModal} onClose={handleCloseReplyModal} maxWidth="sm" fullWidth>
                <DialogTitle>Reply to Memo</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Your Reply"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        size="small"
                        color="error"
                        onClick={handleDeleteReply}
                    >
                        Delete
                    </Button>
                    <Button onClick={handleCloseReplyModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleReplyMemo} color="primary">
                        Submit Reply
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this memo?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteMemo} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openImage} onClose={handleCloseImage}>
                <DialogContent>
                    {selectedImage && (
                        <img src={selectedImage} alt="Memo Zoom" style={{ width: '100%', height: 'auto' }} />
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default MemoPage;