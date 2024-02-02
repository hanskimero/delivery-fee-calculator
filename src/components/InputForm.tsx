import React, { useState, Dispatch, SetStateAction } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import Stack from '@mui/material/Stack';
import { Errors, FormData } from '../types';
import { DeliveryFeeCalculator, validateCartValue, validateDistance, validateNumberOfItems } from '../Utils';

interface Props {
  setFormData : Dispatch<SetStateAction<FormData | undefined>>,
  formData : FormData | undefined
  deliveryFee : number | undefined
  setDeliveryFee : Dispatch<SetStateAction<number | undefined>>
}

const InputForm : React.FC<Props> = (props : Props) : React.ReactElement => {

  const [errors, setErrors] = useState<Errors>({});

  // handles numeric input values
  const formHandler = (e : React.ChangeEvent<HTMLInputElement>) : void => {

    e.preventDefault();

    const { name, value } = e.target;

    let error = '';

    switch (name) {
      case 'cartValue':
        error = validateCartValue(value);
        break;
      case 'deliveryDistance':
        error = validateDistance(value);
        break;
      case 'numberOfItems':
        error = validateNumberOfItems(value);
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));

    if (!error) {

      props.setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      
    }; 
  }

  //handle and validate orderTime changes
  const handleDateTimeChange = (newDate: Date | null) => {
    if (newDate && !isNaN(newDate.getTime())) {
    
      setErrors((prevErrors) => ({ ...prevErrors, orderTime: '' }));

      props.setFormData((prevData) => ({
        ...prevData,
        orderTime: newDate,
      }));
    } else {
      
      setErrors((prevErrors) => ({
        ...prevErrors,
        orderTime: 'Invalid Date',
      }));
    }
  };

  //controls calculate-button to enabled/disabled
  const hasErrors = (): boolean => {

    const requiredProperties = ['cartValue', 'deliveryDistance', 'numberOfItems', 'orderTime'];
  
    const anyPropertyUndefined = requiredProperties.some(prop => props.formData![prop] === undefined);
    const anyError = Object.values(errors).some((error) => Boolean(error));

    return anyPropertyUndefined || anyError;

  };
  
  //creates instance of DeliveryFeeCalculator with given parameters
  const calculate = () : void => { 
    
    const cartValue = props.formData!.cartValue
    const deliveryDistance = props.formData!.deliveryDistance
    const numberOfItems = props.formData!.numberOfItems
    const orderTime = props.formData!.orderTime; 

    const feeCalculator = new DeliveryFeeCalculator(cartValue!, deliveryDistance!, numberOfItems!, orderTime!)

    const deliveryFee = feeCalculator.calculateDeliveryFee();

    props.setDeliveryFee(deliveryFee);

  }

  return (
      
    <LocalizationProvider dateAdapter={AdapterDateFns} >
    <form>
        <Stack spacing={2} marginTop={5}>
          <TextField
            fullWidth
            label="Cart Value (€)"
            type="number"
            name="cartValue"
            onChange={formHandler}
            error={Boolean(errors.cartValue)}
            helperText={errors.cartValue}
            inputProps={{ 'data-test-id': "cartValue", step: '0.01' }}
          />
          <TextField
            fullWidth
            label="Delivery Distance (meters)"
            type="number"
            name="deliveryDistance"
            onChange={formHandler}
            error={Boolean(errors.deliveryDistance)}
            helperText={errors.deliveryDistance}
            inputProps={{ 'data-test-id': "deliveryDistance" }}
          />
          <TextField
            fullWidth
            label="Number of Items"
            type="number"
            name="numberOfItems"
            onChange={formHandler}
            error={Boolean(errors.numberOfItems)}
            helperText={errors.numberOfItems}
            inputProps={{ 'data-test-id': "numberOfItems" }}
          />
          <div data-test-id="orderTime">
            <DateTimePicker
                    label="Order time"
                    name="orderTime"
                    ampm={true}
                    format="dd.MM.yyyy hh:mm a"
                    defaultValue={null}
                    onChange={handleDateTimeChange}
                    />
          </div>
          {errors.orderTime && (
            <Typography variant="body2" color="error">
              {errors.orderTime}
            </Typography>
          )}
          <Stack>  
          <Button type="button" variant="contained" color="primary" fullWidth disabled={hasErrors()} onClick={calculate}>
            Calculate
          </Button>
          </Stack>
        </Stack>
      </form>
      </LocalizationProvider>   
  );
}

export default InputForm;
