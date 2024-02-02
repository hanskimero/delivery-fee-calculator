import React from 'react';
import { Typography, Box } from '@mui/material';

interface Props {
  deliveryFee : number | undefined
}

const FeeDisplay : React.FC<Props> = (props : Props) : React.ReactElement => {
  return (
    
    <Box sx={{ display : 'flex' }}>
      <Typography sx={{marginTop: 3}}>Delivery fee :  </Typography>
      <div data-test-id="fee" >
        <Typography sx={{marginTop: 3, marginLeft: 2}}>{props.deliveryFee}</Typography>
      </div>
      <Typography sx={{marginTop: 3, marginLeft: 1}}>€</Typography>
    </Box>
  );
}

export default FeeDisplay;
