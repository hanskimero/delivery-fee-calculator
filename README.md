# Delivery Fee Calculator

This project showcases my TypeScript and React skills in a form of delivery fee calculator for food delivery service. MUI components are used in creating the UI. Project is a pre-assignment for a internship recruitement process.

## Features

1. Form where user inserts cart value, delivery distance, number of items and order time. 

2. Validity of inserted values is checked before calculating is possible. 

4. Delivery fee gets calculated when calculate button is clicked. 

5. Specifications for validation of numeric input values can be modified easily, since validation functions are separate form actual form handling (Utils.ts).

6. Specifications for delivery fee calculation can be modified easily, since calculator is created as a class (Utils.ts).

## Specifications

Rules for calculating a delivery fee
* If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.
* A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
  * Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
  * Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
  * Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
* If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€
  * Example 1: If the number of items is 4, no extra surcharge
  * Example 2: If the number of items is 5, 50 cents surcharge is added
  * Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
  * Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)
* The delivery fee can __never__ be more than 15€, including possible surcharges.
* The delivery is free (0€) when the cart value is equal or more than 200€. 
* During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€). Use the timezone of the browser** (so Friday rush is 3 - 7 PM in the timezone of the browser).

Note! From specifications the rush hour is interpreted to start on fridays at 3:00 PM and last until 7:00 PM, meaning that 7:00 PM is still rush hour, but 7:01 PM is not.

## Prerequisites

Make sure you have the following installed on your local machine:

- Node.js and npm

## Getting started

All necessary dependencies are included in package.json.

### npm install

Installs dependencies.

### npm start

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


