import React from 'react';

const CurrencyCard = ({
  type,
  id,
  name,
  symbol,
  sign,
  logo,
  onSelect,
}: {
  type: 'crypto' | 'fiat';
  id: number;
  name: string;
  symbol: string;
  sign?: string;
  logo?: string;
  onSelect: () => void;
}) => {
  return (
    <>
      <label
        htmlFor={`${type}-currency-${id}-${name}`}
        className="flex items-center gap-2.5 border rounded py-2.5 px-5 col-span-2 sm:col-span-1 cursor-pointer hover:bg-gray-100"
      >
        {type === 'crypto' ? (
          <img src={logo} alt={name} className="w-14 h-14 rounded-full" />
        ) : (
          <span className="inline-flex justify-center items-center text-white bg-blue-700 rounded-full text-2xl font-bold w-14 aspect-square">
            {sign}
          </span>
        )}
        <div className="w-full">
          <h4 className="w-full text-lg font-semibold">{name}</h4>
          <p className="w-full">{symbol}</p>
        </div>
        <input
          name={`${type}-currency`}
          id={`${type}-currency-${id}-${name}`}
          type="radio"
          value={id}
          className="w-5 h-5"
          onChange={(e) => {
            if (e.target.checked) onSelect();
          }}
        />
      </label>
    </>
  );
};

export default React.memo(CurrencyCard);
