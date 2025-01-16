import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../context/context';
import { useProductContext } from '../context/productdetailcontext';
import Cookies from 'js-cookie';

const Showproduct = ({ cartproduct, setcartproduct }) => {
  const navigate = useNavigate();
  const { product, setproduct } = useContext(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [price, setprice] = useState(0);
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [search, setsearch] = useState('');
  const [Er, setEr] = useState('');
  const [pdetail, setpdetail] = useState(false);

  const { updateProductDetails } = useProductContext();

  const filterSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (price) params.set('price', price);
    if (rating) params.set('rating', rating);
    if (category && category !== 'all category') params.set('category', category);
    if (search) params.set('search', search);

    console.log(params.toString());
    fetch(`http://localhost:3000/product/filter?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setproduct(data);
        if (data.length === 0) {
          setEr("No products found matching your filter criteria.");
        }
        console.log(data);
      })
      .catch(err => {
        setEr("Error fetching filtered products.");
        console.log(err);
      });
  };

  const addcart = (e, product1) => {
    e.preventDefault();
    const addcartproduct = {
      id: product1._id,
      name: product1.name,
      price:product1.price,
      img:product1.img
    }
    console.log(product1._id);
    console.log(addcartproduct);
    fetch('http://localhost:3000/product/addcart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(addcartproduct),
    }).then(response => response.json())
      .then(data => {
        if (data.msg === 'New cart created and product added') {
          //setEr(`${data.name} is added to cart`);
          console.log(data.cart);
        }
      })
      .catch(err => {
        setEr("Error fetching filtered products.");
        console.log(err);
      });
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleProductClick = (product) => {
    // Save product to localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  };

  return (
    <nav className="flex justify-center w-full ">
      <div className="w-[100rem] px-[6vw]  flex mb-28">
        <div className="flex justify-between w-full relative">
          {/* Filter Button */}
          <button
            className="absolute top-8 left-6 bg-[#3b5d50] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#2f483e] transition-all"
            onClick={toggleFilter}
          >
            Filter
          </button>

          {/* Filter Table */}
          <div
            className={`absolute left-24 top-8  h-fit z-10 w-64 ml-10 bg-white shadow-lg rounded-lg transform overflow-hidden ${isFilterOpen ? "max-h-screen" : "max-h-0"} transition-all duration-500 ease-in-out`}
            id="filter_table"
          >
            <form className="p-4 flex flex-col gap-4" onSubmit={filterSubmit}>
              <h1 className="text-xl font-semibold text-gray-800 border-b pb-3">Filters</h1>

              {/* Rating Filter */}
              <div className="flex flex-col gap-2" id="Rating_f">
                <label htmlFor="rating" className="text-md text-gray-700">Rating</label>
                <div className="flex justify-between items-center">
                  <select
                    name="rating"
                    id="rating"
                    className="p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 transition duration-200"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="" disabled className="text-gray-400">Select Rating</option>
                    <option value="1" className="text-black">1 Star</option>
                    <option value="2" className="text-black">2 Star</option>
                    <option value="3" className="text-black">3 Star</option>
                    <option value="4" className="text-black">4 Star</option>
                    <option value="5" className="text-black">5 Star</option>
                  </select>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="flex flex-col gap-2" id="price_range">
                <div className="flex justify-between text-md text-gray-700">
                  <h1 className="text-md text-gray-700">Price Range</h1>
                  <input
                    type="text"
                    className="text-end border w-20 rounded-md"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
                <input
                  type="range"
                  id="price"
                  name="price"
                  min="1"
                  max="1000000"
                  step="100"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3b5d50]"
                />
                <div className="flex justify-between w-full text-sm text-gray-500">
                  <span>₹1</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-col gap-2" id="Category_f">
                <label htmlFor="category" className="text-md text-gray-700">Category</label>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 transition duration-200"
                >
                  <option value="all category" className="text-black">All Category</option>
                  <option value="Modern Sofa" className="text-black">Modern Sofa</option>
                  <option value="Dining Table" className="text-black">Dining Table</option>
                  <option value="Office Chair" className="text-black">Office Chair</option>
                  <option value="Wooden Bed" className="text-black">Wooden Bed</option>
                  <option value="Coffee Table" className="text-black">Coffee Table</option>
                  <option value="Recliner Sofa" className="text-black">Recliner Sofa</option>
                  <option value="Wardrobe" className="text-black">Wardrobe</option>
                  <option value="Bookshelf" className="text-black">Bookshelf</option>
                  <option value="Shoe Rack" className="text-black">Shoe Rack</option>
                  <option value="TV Stand" className="text-black">TV Stand</option>
                </select>
              </div>

              {/* Apply Filter Button */}
              <button
                type="submit"
                className="bg-[#3b5d50] w-fit text-white py-2 px-5 rounded-full hover:bg-[#2e4a3b] transition-colors duration-300"
              >
                Apply Filters
              </button>

              {/* Close Button */}
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-800 mt-4 self-end"
                onClick={toggleFilter}
              >
                Close
              </button>
            </form>
          </div>

          <div className="w-full flex flex-col py-10">
            {/* Search Bar */}
            <form className="w-full flex justify-center" onSubmit={filterSubmit}>
              <input
                type="text"
                className="p-3 w-1/3 placeholder-text-slate-400 border-2 border-gray-300 rounded-lg bg-transparent"
                placeholder="Enter Product name"
                onChange={(e) => setsearch(e.target.value)}
              />
            </form>
            <div className=' flex flex-wrap mt-16'>

              {
                product.map((product, index) => (
                  <div key={index} className=' w-60 mx-5 p-5 rounded-xl flex flex-col items-center gap-1 overflow-hidden relative' id='product' >
                    {product.rating && product.rating.length > 0 &&
                      <div className='absolute bg-blue-100 right-0 z-[1] top-20
    rounded-full px-2 text-blue-900'>
                        Rating: {product.rating}
                      </div>
                    }
        
                      <img src={product.img} className='rounded-2xl w-[80%] ' id="product_image" alt="" onClick={() => handleProductClick(product)} />
                   
                    <Link to='/productdetail'>
                      <h1 className='text-xl h-14 font-medium text-center mt-5' onClick={() => handleProductClick(product)}>{product.name}</h1>
                    </Link>
                    <Link to='/productdetail'>
                      <h1 className='text-2xl font-bold mb-12 ' onClick={() => handleProductClick(product)}>₹{product.price}</h1>
                    </Link>

                    <button
                      className="absolute bottom-3  bg-slate-800 p-2 rounded-full  hover:bg-slate-700 transition-all"
                      onClick={(e) => addcart(e, product)}
                    >
                      <img src="./images'/cross.svg" alt="" />
                    </button>
                    <div className="absolute bottom-0 bg-[#DCE5E4]" id="hidden-bg" ></div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Showproduct;
