import React from 'react';
import useConversionRates from '../hooks/useConversionRates';

const Index = () => {
  const { conversions } = useConversionRates();
  return (
    <>
      <main className="flex flex-col gap-5 p-5 md:gap-0 w-full h-[calc(100vh-98px)] overflow-y-auto overflow-x-hidden">
        {conversions.length ? (
          <button className="w-full flex items-center justify-center bg-green-700 py-2 text-white rounded">
            New Conversion
          </button>
        ) : null}
        <ul className="h-full w-full">
          {conversions.length ? (
            <>
              {conversions.map((conversion) => (
                <li key={conversion}>{conversion}</li>
              ))}
            </>
          ) : (
            <li className="flex flex-col justify-center items-center h-full text-2xl gap-5">
              No recent conversions to show.
              <button className="bg-green-700 flex items-center justify-center px-5 py-2 text-white rounded">
                New Conversion
              </button>
            </li>
          )}
        </ul>
      </main>
    </>
  );
};

export default React.memo(Index);
