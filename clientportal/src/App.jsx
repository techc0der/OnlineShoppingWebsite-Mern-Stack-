import './app.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Homecontent from './Components/Homecontent';
import About from './Components/About';
import Category from './Components/Category';
import Showproduct from './Components/Showproduct';
import Productdetail from './Components/Productdetail';
import HomeSellerPage from './Components/HomeSellerPage';
import { products } from './context/context';
import { ProductProvider, useProductContext } from './context/productdetailcontext';
import AddCart from './Components/Addcart';
import React, { useState, useEffect, useContext } from 'react';

function App() {
  const [product, setproduct] = useState([]);
  const [cartproduct, setcartproduct] = useState([]);
  const [loginbtn, setloginbtn] = useState(true);
  const [productdata, setproductData] = useState({});
  return (
    <products.Provider value={{ product, setproduct, loginbtn, setloginbtn, productdata, setproductData }}>
      <ProductProvider>
        <Router>
          <AppContent cartproduct={cartproduct} setcartproduct={setcartproduct} />
        </Router>
      </ProductProvider>
    </products.Provider>
  );
}

function AppContent({ cartproduct, setcartproduct }) {
  const location = useLocation();
  const { pdetail } = useProductContext()
  const hideNavFooterRoutes = ['/login', '/signup'];
  const { setproduct } = React.useContext(products);
  const { setloginbtn } = React.useContext(products);
  const hideNavFooter = hideNavFooterRoutes.includes(location.pathname);

  const searchproduct = async () => {
    await fetch('http://localhost:3000/product')  // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        // Set loading to false once data is fetched
        setproduct(data);  // Set the fetched data into state
      })
      .catch(err => {
        // Set loading to false
        setError(err);       // Handle any error that occurs during the fetch
      });
  }
  const profile = async() => {
    const token = Cookies.get('token');
    await fetch('http://localhost:3000/user/',{
      method: "POST",
      headers: {
        "Authorization":`bearer ${token}`,
      },
    }
    )
    .then(response => response.json())
    .then(data => {
      // Set loading to false once data is fetched
      console.log(data.msg)
      if(data.msg == 'user not found') {
        setloginbtn(true);
      }
      else if(data.msg == 'user is found') setloginbtn(false);
    })
    .catch(err => {
      // Set loading to false
      setError(err);       // Handle any error that occurs during the fetch
    });
  }
  useEffect(() => {
    const token = Cookies.get('token');
    profile();
  
    if (location.pathname === "/shop") {
      searchproduct();
    }
  }, [location]);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Homecontent />} />
        <Route path='/about' element={<About />} />
        <Route path='/category' element={<Category />} />
        <Route path='/productdetail' element={<Productdetail />} />
        <Route path='/shop' element={<Showproduct cartproduct={cartproduct} setcartproduct={setcartproduct} />} />
        <Route path='/seller' element={<HomeSellerPage />} />
        <Route path='/cart' element={<AddCart cartproduct={cartproduct} setcartproduct={setcartproduct} />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  );
}

export default App;
