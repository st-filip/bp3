import React from "react";
import Button from "./Button";

const Modal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Otkaži",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button text={cancelText} onClick={onCancel} variant="gray" />
          )}
          {onConfirm && (
            <Button text={confirmText} onClick={onConfirm} variant="info" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
