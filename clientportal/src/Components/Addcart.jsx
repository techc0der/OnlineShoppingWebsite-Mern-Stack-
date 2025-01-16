import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AddCart = () => {
  const navigate = useNavigate();
  const [cartproduct, setcartproduct] = useState([]);
  const [totals, setTotals] = useState({
    totalPrice: 0,
    cgst: 0,
    sgst: 0,
    totalAfterGst: 0,
  });

  useEffect(() => {
    fetch('http://localhost:3000/product/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) setcartproduct(data.products);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    // Calculate totals whenever the cart changes
    let totalPrice = cartproduct.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let cgst = totalPrice * 0.09; // CGST at 9%
    let sgst = totalPrice * 0.09; // SGST at 9%
    let totalAfterGst = totalPrice + cgst + sgst;

    setTotals({
      totalPrice,
      cgst,
      sgst,
      totalAfterGst,
    });
  }, [cartproduct]);

  const handleQuantityChange = (product_id, inc_dec) => {
    fetch('http://localhost:3000/product/addcart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({ id: product_id, inc_dec: inc_dec }),
    })
      .then(response => response.json())
      .then(data => {
        setcartproduct(data.cart.products);
      })
      .catch(err => console.error(err));
  };

  const handleRemove = (id) => {
    fetch('http://localhost:3000/product/removecart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({ id: id }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.msg === 'cart product is removed') {
          setcartproduct(data.response.products);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="flex justify-center w-100vw">
      <div className="w-[100rem] p-10 px-28 pb-28">
        {cartproduct.length === 0 ? (
          <div className="text-center text-4xl font-semibold text-gray-600 my-52">
            Your cart is empty.
          </div>
        ) : (
          <div className="w-full">
            <div className="overflow-y-auto h-[60vh] drop-shadow-xl shadow-xl">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-center w-32">Image</th>
                    <th className="p-4 text-center w-96">Product</th>
                    <th className="p-4 text-center w-32">Price</th>
                    <th className="p-4 text-center w-32">Quantity</th>
                    <th className="p-4 text-center w-40">Total</th>
                    <th className="p-4 text-center w-32">Remove</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {cartproduct.map((item, index) => (
                    <tr key={index}>
                      <td className="p-4 text-center ">
                        <img src={item.img} alt={item.name} className=" rounded-2xl w-32 h-32" />
                      </td>
                      <td className="p-4 text-center w-96">{item.name}</td>
                      <td className="p-4 text-center w-32">₹{item.price.toFixed(2)}</td>
                      <td className="p-4 w-32">
                        <div className="flex justify-around">
                          <button
                            onClick={() => handleQuantityChange(item.product_id, -1)}
                            className="w-3 px-2 py-1 border border-gray-400 rounded-md"
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product_id, 1)}
                            className="w-3 px-2 py-1 border border-gray-400 rounded-md"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-center w-40">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4 text-center w-32">
                        <button
                          onClick={() => handleRemove(item.product_id)}
                          className="text-red-500"
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

            {/* GST and Total Price Section */}
            <div className="mt-8 p-4 border w-fit rounded-lg shadow-xl bg-gray-50">
              <div className="text-right">
                <p className="text-lg font-semibold">
                  Total Price: ₹{totals.totalPrice.toFixed(2)}
                </p>
                <p className="text-lg">
                  CGST (9%): ₹{totals.cgst.toFixed(2)}
                </p>
                <p className="text-lg">
                  SGST (9%): ₹{totals.sgst.toFixed(2)}
                </p>
                <p className="text-xl font-bold">
                  Total Price After GST: ₹{totals.totalAfterGst.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCart;
