import React from 'react';
import DownArrowIcon from '~icons/icomoon-free/arrow-down';
import SyncIcon from '~icons/fa-solid/sync';
import RemoveIcon from '~icons/fluent/delete-24-filled';
import type { Conversion } from '../types';

const ConversionCard = ({
  conversion,
  onSync,
  onRemove,
}: {
  conversion: Conversion;
  onSync?: (conversion: Conversion) => void;
  onRemove?: (id: number) => void;
}) => {
  return (
    <>
      <li className="flex flex-col justify-center items-center bg-white hover:border-blue-700 transition-all duration-all col-span-1 gap-5 border rounded h-fit w-full p-2.5">
        <div className="w-full flex items-center justify-between text-xs">
          <p className="flex flex-col">
            <span className="font-semibold">Created At</span>
            <span>{new Date(conversion.id).toLocaleString()}</span>
          </p>
          <p className="flex flex-col items-end">
            <span className="font-semibold">Last Synced</span>
            <span>{new Date(conversion.lastSynced).toLocaleString()}</span>
          </p>
        </div>
        <div className="w-full flex flex-col items-center gap-2.5">
          <p className="text-3xl">{conversion.amount.toFixed(2)}</p>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex justify-center items-center gap-2.5">
              <img
                src={conversion.source.logo}
                alt={conversion.source.name}
                className="w-10 h-10 rounded-full"
              />
              <h4 className="w-full text-4xl font-semibold">
                {conversion.source.symbol}
              </h4>
            </div>
            <p className="text-xs">({conversion.source.name})</p>
          </div>
        </div>
        <DownArrowIcon style={{ fontSize: 30 }} />
        <div className="w-full flex flex-col items-center gap-2.5">
          <p className="text-3xl">{conversion.rate.toFixed(2)}</p>
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex justify-center items-center gap-2.5">
              <span className="inline-flex justify-center items-center text-white bg-blue-700 rounded-full text-xl font-bold w-14 aspect-square">
                {conversion.target.sign}
              </span>
              <h4 className="w-full text-3xl font-semibold">
                {conversion.target.symbol}
              </h4>
            </div>
            <p className="text-xs">({conversion.target.name})</p>
          </div>
        </div>
        {onRemove && onSync && (
          <div className="w-full flex items-center justify-center gap-5">
            <button
              type="button"
              className="flex justify-center items-center text-green-700 hover:text-green-500 font-semibold gap-1"
              onClick={() => onSync(conversion)}
            >
              <SyncIcon style={{ fontSize: 12 }} />
              Sync
            </button>
            <button
              type="button"
              className="flex justify-center items-center text-red-700 hover:text-red-500 font-semibold gap-1"
              onClick={() => onRemove(conversion.id)}
            >
              <RemoveIcon style={{ fontSize: 12 }} />
              Remove
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default React.memo(ConversionCard);
