import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';

const Footer : React.FC = () : React.ReactElement => {

    const theme = useTheme();

    const footerStyle = {
        backgroundColor: theme.palette.primary.main,
        height: '40px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white', 
        marginTop: '30px'
      };

    return (

    <Box sx={footerStyle}>
        
        <Typography variant='body1'>@ Hanna Mero 2024</Typography>

    </Box>

    
    );
}

export default Footer;