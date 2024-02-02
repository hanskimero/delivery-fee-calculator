import React, { useState } from 'react';
import { Container } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import FeeDisplay from './components/FeeDisplay';
import InputForm from './components/InputForm';
import Header from './components/Header';
import Footer from './components/Footer';
import { FormData } from './types';
import theme from './theme';

const App : React.FC = () : React.ReactElement => {

  const [formData, setFormData] = useState<FormData | undefined>({});

  const [deliveryFee, setDeliveryFee] = useState<number | undefined>();

  return (

    <ThemeProvider theme={theme}>
    <Container maxWidth='sm'>
      <Header/>
      <InputForm formData={formData} setFormData={setFormData} deliveryFee={deliveryFee} setDeliveryFee={setDeliveryFee} />
      <FeeDisplay deliveryFee={deliveryFee}/>
      <Footer/>
    </Container>
    </ThemeProvider>
  );
}

export default App;
