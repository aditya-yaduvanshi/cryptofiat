import React, { useState } from 'react';
import ConversionCard from '../components/ConversionCard';
import NewConversionModal from '../components/NewConversionModal';
import { useConversionRates } from '../contexts/conversion';

const Index = () => {
  const [isShowModal, setShowModal] = useState(false);
  const { conversions, getConversionRate, removeConversion } =
    useConversionRates();

  return (
    <>
      <main className="flex flex-col gap-5 p-5 md:gap-0 w-full h-[calc(100vh-98px)] overflow-y-auto overflow-x-hidden">
        {conversions.length ? (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full hover:bg-blue-500 transition-all duration-200 active:scale-90 flex items-center justify-center bg-blue-700 py-2 text-white rounded"
          >
            New Conversion
          </button>
        ) : null}
        <ul className="h-full w-full">
          {conversions.length ? (
            <>
              {conversions.map((conversion) => (
                <ConversionCard
                  key={conversion.id}
                  conversion={conversion}
                  onSync={getConversionRate}
                  onRemove={removeConversion}
                />
              ))}
            </>
          ) : (
            <li className="flex flex-col justify-center items-center h-full text-2xl gap-5">
              No recent conversions to show.
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="bg-blue-700 hover:bg-blue-500 transition-all duration-200 active:scale-90 flex items-center justify-center px-5 py-2 text-white rounded"
              >
                New Conversion
              </button>
            </li>
          )}
        </ul>
      </main>
      <NewConversionModal
        isShow={isShowModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default React.memo(Index);
