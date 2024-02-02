// Functions for validating numeric input values and DeliveryFeeCalculator class.

import { getDay } from 'date-fns';

// Validation function for cartValue
export const validateCartValue = (value : string) : string => {
    const numberRegex = /^-?\d+(\.\d{1,2})?$/;

    if (!numberRegex.test(value) || isNaN(parseFloat(value)) || parseFloat(value) < 0) {
      return 'Invalid number or too many decimals';
    }
  
    return '';
  }

// Validation function for distance
export const validateDistance = (value : string) : string => {
    const integerRegex = /^\d+$/;

    if (!integerRegex.test(value) || parseInt(value, 10) < 0) {
      return 'Invalid distance';
    }
  
    return '';
  }

// Validation function for numberOfItems
export const validateNumberOfItems = (value : string) : string => {
    const integerRegex = /^\d+$/;

    if (!integerRegex.test(value) || parseInt(value, 10) < 0) {
      return 'Invalid number of items';
    }
  
    return '';
  }

// class for calculating delivery fee
export class DeliveryFeeCalculator {

    //properties
    private cartValue: number;
    private deliveryDistance: number;
    private numberOfItems: number;
    private orderTime: Date;
    
    constructor(cartValue : number, deliveryDistance : number, numberOfItems : number, orderTime : Date) {
      this.cartValue = cartValue;
      this.deliveryDistance = deliveryDistance;
      this.numberOfItems = numberOfItems;
      this.orderTime = orderTime;
    }

    calculateDeliveryFee() {

      let deliveryFee = 0;

       //free delivery if cartValue >= 200
       if(this.cartValue >= 200) {

        return deliveryFee;

      } else {

        //Small order surcharge
        if (this.cartValue < 10) {
          const surcharge = 10 - this.cartValue;
          deliveryFee += surcharge
        }

        //Base fee (first 1000 meters)
        deliveryFee += 2;

        //Additional fee when distance grows
        const additionalDistance = Math.max(0, this.deliveryDistance - 1000);
        const additionalFee = Math.ceil(additionalDistance / 500) * 1;
        deliveryFee += additionalFee;
      
        //Surcharge: number of items 5 or more
        if(this.numberOfItems >= 5) {
          const itemSurcharge = (this.numberOfItems - 4) * 0.5;
          deliveryFee += itemSurcharge;

          //bulk fee: more than 12 items
          if(this.numberOfItems > 12) {
            deliveryFee += 1.2;
          }
        }

        //rush hour
        const isFriday : boolean = getDay(this.orderTime) === 5;

        if (isFriday) {

          const isRushHour : boolean = 
              (this.orderTime.getHours() === 15 && this.orderTime.getMinutes() >= 0) ||
              (this.orderTime.getHours() > 15 && this.orderTime.getHours() < 19) ||
              (this.orderTime.getHours() === 19 && this.orderTime.getMinutes() === 0);
          
          if (isRushHour) {
            deliveryFee *= 1.2
          }
        }

        //max delivery fee
        deliveryFee = Math.min(deliveryFee, 15)

        //round the final delivery fee

        deliveryFee = Number(deliveryFee.toFixed(2));

        return deliveryFee;

      }
    
    }
  }