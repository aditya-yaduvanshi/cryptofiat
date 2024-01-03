import React, { useState } from 'react';
import ConvertIcon from '~icons/ri/exchange-dollar-fill';
import ConversionCard from '../components/ConversionCard';
import NewConversionModal from '../components/NewConversionModal';
import { useConversionRates } from '../contexts/conversion';

const Index = () => {
  const [isShowModal, setShowModal] = useState(false);
  const { conversions, removeConversion, syncConversion } =
    useConversionRates();

  return (
    <>
      <main className="container mx-auto flex flex-col gap-5 p-5 w-full h-[calc(100vh-98px)] overflow-y-auto overflow-x-hidden">
        {conversions.length ? (
          <>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-1/2 mx-auto gap-1 font-semibold hover:bg-blue-500 transition-all duration-200 active:scale-90 flex items-center justify-center bg-blue-700 py-2 text-white rounded"
            >
              <ConvertIcon />
              New Conversion
            </button>
            <ul className="h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {conversions.map((conversion) => (
                <ConversionCard
                  key={conversion.id}
                  conversion={conversion}
                  onSync={syncConversion}
                  onRemove={removeConversion}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center mx-auto p-5 h-full gap-10">
            <h1 className="text-3xl md:text-5xl lg:text-7xl bg-white font-bold text-blue-700 text-center">Converting currencies<br/>from crypto to fiat</h1>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="bg-blue-700 hover:bg-blue-500 gap-1 font-semibold text-2xl transition-all duration-200 active:scale-90 flex items-center justify-center px-5 py-2 text-white rounded"
            >
              <ConvertIcon />
              CONVERT
            </button>
          </div>
        )}
      </main>
      <NewConversionModal
        isShow={isShowModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default React.memo(Index);
