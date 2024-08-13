import React, {useState} from 'react';
import {Box} from '@mui/material';
import FloatingInput from './FloatingInput';

const GroupFloatingInput = () => {

    const [input1, setInput1] = useState('GWTool');
    const [input2, setInput2] = useState('Hello World!');
    const [input3, setInput3] = useState('Welcome');
    const [input4, setInput4] = useState('Aloha~');
    const [input5, setInput5] = useState('Try this out');

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
                sx={{top: "5%",
                    left: '80%',
                    position: 'absolute',
                }}
                float="float1"
            />
            <FloatingInput
                label="Text Retrieve"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                sx={{
                    top: '25%',
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
                    top: '45%',
                    left: '75%',
                    position: 'absolute',
                }}
                float="float3"
            />
            <FloatingInput
                label="Greetings"
                value={input3}
                onChange={(e) => setInput4(e.target.value)}
                sx={{
                    top: '65%',
                    left: '23%',
                    position: 'absolute',
                }}
                float="float2"
            />
            <FloatingInput
                label="Text Field"
                value={input3}
                onChange={(e) => setInput5(e.target.value)}
                sx={{
                    top: '85%',
                    left: '77%',
                    position: 'absolute',
                }}
                float="float1"
            />

            <style>
                {`
                    @keyframes float1 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(5px, 0); }
                        100% { transform: translate(0, 0); }
                    }

                    @keyframes float2 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(-10px, 0); }
                        100% { transform: translate(0, 0); }
                    }

                    @keyframes float3 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(10px, 0); }
                        100% { transform: translate(0, 0); }
                    }
                `}
            </style>
        </Box>
    );
};

export default GroupFloatingInput;