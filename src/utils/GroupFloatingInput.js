import React, {useState} from 'react';
import {Box} from '@mui/material';
import FloatingInput from './FloatingInput';

const GroupFloatingInput = () => {

    const [input1, setInput1] = useState('GWTool');
    const [input2, setInput2] = useState('Hello World!');
    const [input3, setInput3] = useState('Welcome');

    return (

        <Box
            sx={{
                width: '100%',
                minHeight: '350px',
                position: 'relative',
                //overflow: 'hidden',
                ml: 4,
            }}
        >
            <FloatingInput
                label="Text Submit"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                sx={{top: "15%",
                    left: '65%',
                    position: 'absolute',
                }}
                float="float1"
            />
            <FloatingInput
                label="Text Retrieve"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                sx={{
                    top: '45%',
                    left: '20%',
                    position: 'absolute',
                }}
                float="float2"
            />
            <FloatingInput
                label="Tools"
                value={input3}
                onChange={(e) => setInput3(e.target.value)}
                sx={{
                    top: '78%',
                    left: '25%',
                    position: 'absolute',
                }}
                float="float3"
            />

            <style>
                {`
                    @keyframes float1 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(-5px, -15px); }
                        100% { transform: translate(0, 0); }
                    }

                    @keyframes float2 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(-10px, 5px); }
                        100% { transform: translate(0, 0); }
                    }

                    @keyframes float3 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(5px, 10px); }
                        100% { transform: translate(0, 0); }
                    }
                `}
            </style>
        </Box>
    );
};

export default GroupFloatingInput;