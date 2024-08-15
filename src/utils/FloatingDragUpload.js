import {useDropzone} from 'react-dropzone';
import {useTheme} from '@mui/material/styles';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {Box, Typography} from "@mui/material";
import React from "react";

const FloatingDragUpload = () => {

    const theme = useTheme();

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        multiple: true,
        noClick: false,
        noKeyboard: true
    });

    return (
        <Box {...getRootProps()} sx={{
            border: '2px dashed',
            borderColor: theme.palette.divider,
            borderRadius: 5,
            boxShadow: 8,
            padding: 4,
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            animation: `float 6s ease-in-out infinite`,
        }}>
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{fontSize: 50, color: theme.palette.text.secondary}}/>
            <Typography variant="h6" gutterBottom>
                {isDragActive ? "Drop the files here ..." : "Drag and drop or select files/folders"}
            </Typography>
            {/*<Button variant="contained" sx={{mt: 2}}>*/}
            {/*    Select from computer*/}
            {/*</Button>*/}
            <Typography variant="caption" color="textSecondary">
                Enjoy seamlessly cloud file storage.
            </Typography>

            <style>
                {`
                    @keyframes float {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(10px, 15px); }
                        100% { transform: translate(0, 0); }
                    }
                `}
            </style>
        </Box>
    );
};
export default FloatingDragUpload;