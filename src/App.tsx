import React from 'react';
import Header from './components/Header';
import Index from './pages/index';

const App = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden bg-[url(/icon.svg)] bg-repeat bg-center">
        <Header />
        <Index />
      </div>
    </>
  );
};  

export default React.memo(App);
