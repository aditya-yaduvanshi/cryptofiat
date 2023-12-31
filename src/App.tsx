import React from 'react';
import Header from './components/Header';
import Index from './pages/index';

const App = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Header />
        <Index />
      </div>
    </>
  );
};

export default React.memo(App);
