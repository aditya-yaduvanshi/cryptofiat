import React from 'react';
import CryptoFiatIcon from '~icons/flat-color-icons/currency-exchange';

const Header = () => {
  return (
    <>
      <header className="p-5 bg-blue-100 flex justify-center items-center gap-2 sticky top-0">
        <CryptoFiatIcon style={{ fontSize: 48 }} />
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="text-3xl">CryptoFiat</h1>
          <p className="text-[10px]">Crypto to Fiat price converter</p>
        </div>
      </header>
    </>
  );
};

export default React.memo(Header);
