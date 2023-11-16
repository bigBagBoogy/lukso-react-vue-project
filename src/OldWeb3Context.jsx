// // Web3Context.jsx

// import { createContext, useContext, useEffect, useState } from 'react';

// const Web3Context = createContext();

// const Web3Provider = ({ children }) => {
//   const [web3, setWeb3] = useState(null);
//   const [userAddress, setUserAddress] = useState(null);
//   const [userAddressFromLocalStorage, setUserAddressFromLocalStorage] = useState(null);

//   useEffect(() => {
//     // Check if userAddress is stored in localStorage
//     const storedUserAddress = localStorage.getItem('userAddress');
//     console.log('Stored User Address:', storedUserAddress);

//     if (storedUserAddress) {
//       setUserAddress(storedUserAddress);
//       setUserAddressFromLocalStorage(storedUserAddress);
//     }
//   }, []);

//   const setConnectionData = (data) => {
//     // Update userAddress state and also store it in localStorage
//     setUserAddress(data.userAddress);
//     setUserAddressFromLocalStorage(data.userAddress); // Add this line
//     localStorage.setItem('userAddress', data.userAddress);
//   };
  

//  // Log the userAddress when it changes
// useEffect(() => {
//   console.log('User Address Updated (State):', userAddress);
//   console.log('User Address Updated (LocalStorage):', userAddressFromLocalStorage);
// }, [userAddress, userAddressFromLocalStorage]);


//   const contextValue = { web3, userAddress, setConnectionData, userAddressFromLocalStorage };

//   return (
//     <Web3Context.Provider value={contextValue}>
//       {children}
//     </Web3Context.Provider>
//   );
// };

// const useWeb3 = () => {
//   const context = useContext(Web3Context);
//   if (!context) {
//     throw new Error('useWeb3 must be used within a Web3Provider');
//   }
//   return context;
// };

// export { Web3Provider, useWeb3 };
