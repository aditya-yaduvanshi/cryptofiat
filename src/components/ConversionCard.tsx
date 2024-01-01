import React from 'react';
import type { Conversion, ConversionInput } from '../types';

const ConversionCard = ({
  conversion,
  onSync,
  onRemove,
}: {
  conversion: Conversion;
  onSync: ({ source, target, amount }: ConversionInput) => void;
  onRemove: (id: number) => void;
}) => {
  return (
    <>
      <li className="flex items-center gap-2.5">
        <div className="w-full">
          <h4 className="w-full text-lg font-semibold">
            {conversion.source.name}
          </h4>
          <p className="w-full">Good for small websites</p>
        </div>
        <div className="w-full">
          <h4 className="w-full text-lg font-semibold">
            {conversion.target.name}
          </h4>
          <p className="w-full">Good for small websites</p>
        </div>
        <div className="w-full">
          <h4 className="w-full text-lg font-semibold">{conversion.rate}</h4>
          <p className="w-full">Good for small websites</p>
        </div>
        <div className="w-full">
          <h4 className="w-full text-lg font-semibold">{conversion.amount}</h4>
          <p className="w-full">Good for small websites</p>
          <button
            type="button"
            onClick={() =>
              onSync({
                source: conversion.source.symbol,
                target: conversion.target.symbol,
                amount: conversion.amount,
              })
            }
          >
            Sync
          </button>
          <button type="button" onClick={() => onRemove(conversion.id)}>
            Remove
          </button>
        </div>
      </li>
    </>
  );
};

export default React.memo(ConversionCard);
