import React from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '~icons/mi/close';

const Modal = ({
  isShow,
  title,
  onClose,
  onPrimaryAction,
  primaryActionText = 'Submit',
  className,
  children,
}: {
  isShow: boolean;
  title: string;
  primaryActionText?: string;
  onClose: () => void;
  onPrimaryAction?: () => void;
  className?: string;
  children?: React.ReactNode;
}) => {
  return ReactDOM.createPortal(
    <dialog
      open={isShow}
      className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20"
    >
      <div className={`bg-white rounded p-5 flex flex-col ${className}`}>
        <header className="flex justify-between items-center w-full">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            className="flex justify-center items-center"
            type="button"
            onClick={onClose}
          >
            <CloseIcon style={{ fontSize: 20 }} />
          </button>
        </header>
        <main className="w-full h-full">{children}</main>
        <footer className="w-full">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="px-5 py-2 w-full rounded bg-blue-700 text-white"
          >
            {primaryActionText}
          </button>
        </footer>
      </div>
    </dialog>,
    document.getElementById('portal')!
  );
};

export default React.memo(Modal);
