import React from 'react';
import CryptoFiatIcon from '~icons/flat-color-icons/currency-exchange';

const Header = () => {
  return (
    <>
      <header className="p-5 flex justify-center items-center sticky top-0">
        <div className="flex justify-center items-center gap-2 bg-white px-10">
          <CryptoFiatIcon style={{ fontSize: 48 }} />
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="text-3xl">CryptoFiat</h1>
            <p className="text-[10px]">Crypto to Fiat price converter</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default React.memo(Header);
