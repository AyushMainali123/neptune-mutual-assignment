
# Neptune Mutual Currency Converter

Neptune Mutual Currency Converter is a web application built with React, NextJS, TypeScript, and CSS.

## Getting Started

To get started with the project, clone the repository and install the dependencies:

Copy code

   `https://github.com/AyushMainali123/neptune-mutual-assignment.git`
    
   `cd neptune-mutual-assignment`
	
Finally, start the development server:

`npm run dev` 

## Technologies Used

-   React
-   NextJS
-   TypeScript
-   CSS

## Additional Technologies

-   tRPC
-   NodeJS
-   Wagmi


## Functionality


The application has two main cards:

-   NEP/BUSD Converter: Allows users to convert an amount between BUSD and NEP currencies. Users can switch currencies by clicking on the "switch" button, and also view their MetaMask data by clicking on the `Wallet details` button.

-   Coin Exchange: Fetches the current value of a coin based on its address. Users can select various coins and convert them accordingly.

## Improvisations

Following improvisations were made to improve the UX:

-   The application displays an error toast if the API request fails
-   The application includes a dropdown menu for selecting currencies
-   The application displays the symbol of the selected currency
