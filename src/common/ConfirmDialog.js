const ConfirmDialog = ({ onConfirm, onCancel, message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <p className="mb-4 text-gray-800 text-lg">
          {message || "Are you sure?"}
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-all"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
