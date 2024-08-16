import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container, Typography, Box, Card, CardContent, CardActions,
    Button, TextField, Avatar, CircularProgress, Dialog, DialogContent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import api from '../utils/api';
import NoPermissionPage from './NoPermissionPage';

const MemoPage = ({ isLoggedIn, setIsLoggedIn }) => {

    const [memos, setMemos] = useState([]);
    const [newMemo, setNewMemo] = useState('');
    const [openImage, setOpenImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();

    const navigate = useNavigate();
    const location = useLocation();

    const fetchMemos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/memo');
            if (response.status === 200) {
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
            const response = await api.post('/memos', { content: newMemo });
            if (response.status === 201) {
                fetchMemos();
                setNewMemo('');
            }
        } catch (err) {
            setError('Failed to add memo');
        }
    };

    const handleDeleteMemo = async (id) => {
        try {
            await api.delete(`/memos/${id}`);
            fetchMemos();
        } catch (err) {
            setError('Failed to delete memo');
        }
    };

    const handleReplyMemo = async (id, replyContent) => {
        try {
            await api.post(`/memos/${id}/reply`, { content: replyContent });
            fetchMemos();
        } catch (err) {
            setError('Failed to reply to memo');
        }
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
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Memos
            </Typography>
            {error && <Typography color="error">{error}</Typography>}

            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="New Memo"
                    value={newMemo}
                    onChange={(e) => setNewMemo(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddMemo}>
                    Add Memo
                </Button>
            </Box>

            {[...memos].reverse().map((memo) => (
                <Card key={memo.id} sx={{
                    mb: 3, display: 'flex', flexDirection: 'row', flexGrow: true, gap: 2, justifyContent: 'flex-start',
                    boxShadow: 6,
                }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', maxWidth: '60%' }}>
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
                                                {reply.author} ({new Date(reply.create_time).toLocaleString()}):
                                            </Typography>
                                            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
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
                                onClick={() => handleReplyMemo(memo.id, 'Reply content here')}
                            >
                                Reply
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={() => handleDeleteMemo(memo.id)}
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
                            flex: '0 1 auto', alignSelf: 'center',
                            maxWidth: '40%', marginLeft: 'auto', padding: 4
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