import React from 'react';

const HomeSellerPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Seller Portal</h1>
      <div className="flex flex-col gap-4">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
          onClick={() => window.open('/signup', '_blank')}
        >
          Signup
        </button>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700"
          onClick={() => window.open('/login', '_blank')}
        >
          Login
        </button>
        <button
          className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-700"
          onClick={() => window.open('/add-product', '_blank')}
        >
          CRUD of Products
        </button>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-700"
          onClick={() => window.open('/edit-seller', '_blank')}
        >
          Edit Seller Page
        </button>
      </div>
    </div>
  );
};

export default HomeSellerPage;
