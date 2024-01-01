import React from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '~icons/mi/close';

export type ModalProps = {
  isShow: boolean;
  title: string;
  primaryActionText?: string;
  onClose: () => void;
  onPrimaryAction?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const Modal = ({
  isShow,
  title,
  onClose,
  onPrimaryAction,
  primaryActionText = 'Submit',
  className,
  children,
}: ModalProps) => {
  return (
    isShow &&
    ReactDOM.createPortal(
      <dialog
        open
        className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20"
      >
        <div className={`bg-white rounded relative flex flex-col ${className}`}>
          <header className="flex justify-between items-center w-full p-5">
            <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
            <button
              className="flex justify-center items-center hover:text-gray-500 transition-all duration-200 active:scale-90"
              type="button"
              onClick={onClose}
            >
              <CloseIcon style={{ fontSize: 20 }} />
            </button>
          </header>
          <main className="w-full h-full overflow-x-hidden overflow-y-auto px-5">
            {children}
          </main>
          <footer className="w-full p-5">
            <button
              type="button"
              title={primaryActionText}
              onClick={onPrimaryAction}
              className="px-5 py-2 w-full font-semibold rounded hover:bg-blue-500 bg-blue-700 text-white active:scale-90 transition-all duration-100"
            >
              {primaryActionText}
            </button>
          </footer>
        </div>
      </dialog>,
      document.getElementById('portal')!
    )
  );
};

export default React.memo(Modal);
