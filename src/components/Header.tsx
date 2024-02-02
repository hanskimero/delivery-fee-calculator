import React from 'react';
import { Container, Typography, AppBar, Toolbar } from '@mui/material';

const Header : React.FC = () : React.ReactElement => {
  return (

    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant='h5' sx={{ color : 'white'}}>
            Delivery Fee Calculator
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>




    
  );
}

export default Header;
