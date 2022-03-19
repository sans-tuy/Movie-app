import React from 'react';
import Routing from './src/config/router';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <>
      <Routing />
      <FlashMessage position="top" />
    </>
  );
}; 

export default App;
