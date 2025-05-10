import React from 'react';
import { X } from 'lucide-react';

type CartTimeoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onExtendTime: () => void;
  timeLeft: number;
};

export const CartTimeoutModal: React.FC<CartTimeoutModalProps> = ({
  isOpen,
  onClose,
  onExtendTime,
  timeLeft,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Your Cart is About to Expire</h3>
          <p className="text-gray-600 mb-6">
            Your cart will be cleared in {Math.ceil(timeLeft / 1000)} seconds. Would you like
            to keep your items for longer?
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              No, Clear Cart
            </button>
            <button
              onClick={onExtendTime}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Yes, Keep Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};