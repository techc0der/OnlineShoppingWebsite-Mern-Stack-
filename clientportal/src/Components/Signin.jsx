import React, { useContext ,useState} from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Signin = () => {
  const navigate = useNavigate();
  const [finalpwd, setfinalpwd] = useState('');
  const [userid, setuserid] = useState('');
  const [Er, seterr] = useState('');
  const [Erpwd, seterrpwd] = useState('');
  const login = async (e) => {
    e.preventDefault();

    const userData = {
      password: finalpwd,
      username: userid
    };

    await fetch('http://localhost:3000/user/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON format
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);  // Log the entire API response

        if (data.msg === "Invalid password") {
          console.log('Setting error: Invalid password');
          seterrpwd("Invalid password");  // Set error message
        } else if (data.msg === "User not found") {
          console.log('Setting error: User not found');
          seterr("User not found");
        } else {
          Cookies.set("token", data.token, {
            secure: true, sameSite: "Strict"// Token expires in 7 days
            // Protects against CSRF
          });
          navigate('/');

        }
      })
      .catch(err => {

        console.error('Error:', err);  // Log the error for debugging
      });
  };
  return (
    <nav className='flex justify-center  '>
      <div className='w-[100rem] relative p-5 px-16 flex justify-between'>
        <div className='flex p-3 items-center gap-2 absolute' >
          <Link className='text-4xl font-bold text-[#3b5d50] after:content-["."] after:text-slate-400 ' to="/"  >E<span className="text-slate-400">-</span>com</Link>
        </div>
        <div className='my-28 flex justify-center w-full '>


          <div className='flex flex-col justify-center items-center w-[80%] h-[80%] '>
            <h1 className='text-2xl font-medium mb-4'>Login</h1>
            <Link className=' flex w-32 mx-auto border-[1px] justify-center gap-2 items-center border-gray-300 text-lg mb-2 hover:bg-gray-800 hover:text-white transition-all duration-200 ease '>
              <FcGoogle className='h-10' />
              <h1 className=''>Google</h1>
            </Link>
            <p className='w-full text-center mb-4'>or</p>
            <div className='flex flex-col gap-5'>

              <form className='flex flex-col ' onSubmit={login}>
                <div className='flex gap-5'>
                  <label htmlFor="userID">UserID</label>
                  <p className='text-red-600 '>{Er}</p>
                </div>
                <input
                  id="userID"
                  type="text"
                  className='h-8 w-[300px] mt-2 mb-2 bg-transparent border-black border-[1px] placeholder-slate-400 py-auto pl-2'
                  placeholder='your@email.com'
                  onChange={(e) => setuserid(e.target.value)}
                  required
                />
                <div className='flex gap-5'>
                  <label htmlFor="userID">Password</label>
                  <p className='text-red-600'>{Erpwd}</p>
                </div>
                <input
                  id="password"
                  type="password"
                  className='h-8 w-[300px] mt-2 mb-4 bg-transparent border-black border-[1px] placeholder-slate-400 py-auto pl-2'
                  placeholder='ex-Password@365'
                  onChange={(e) => setfinalpwd(e.target.value)}
                  required
                />
                <button className=' w-fit p-6 py-1 border-gray-400 text-md mb-2 hover:bg-gray-800 hover:text-white transition-all duration-200 ease   bg-slate-300' type='submit'>login</button>
              </form>

              <div>

                <div className='flex'>
                  <p>Need an account?</p>
                  <Link to="/signup" className='text-indigo-700 underline hover:bg-indigo-100 text-sm' >Sign Up</Link>
                </div>
                <div className='flex'>
                  <p>Forgot your password?</p>
                  <a href="#" className='text-indigo-700 underline hover:bg-indigo-100 text-sm'>Reset Password</a>
                </div>
              </div>
            </div>

          </div>




        </div>
      </div>


    </nav>
  )
}

export default Signin