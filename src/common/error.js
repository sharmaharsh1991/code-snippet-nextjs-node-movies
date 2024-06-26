export default function Error() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-red-500 text-white p-8 rounded-md shadow-md">
        <h2 className="text-4xl font-bold mb-6">Something went wrong!</h2>
        <p className="text-lg mb-6">An error occurred while fetching data.</p>
        <button
          className="bg-white text-red-500 px-6 py-3 rounded-md hover:bg-red-100 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
