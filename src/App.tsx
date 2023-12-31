import React from 'react';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <div className="w-screen h-screen">
        <Header />
        APP
      </div>
    </>
  );
};

export default React.memo(App);
