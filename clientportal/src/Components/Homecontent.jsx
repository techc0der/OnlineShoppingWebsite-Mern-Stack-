import React from 'react'

const Homecontent = () => {
  return (
    <>
      <div className='flex justify-center w-100vw   bg-[#3b5d50] ' id='mainBox'>
        <div className='w-[100rem] h-[60%] p-5 px-28  relative ' >
          <img src="./public/images'/dots-green.svg " className='h-25  absolute right-0 top-10' alt="" id='svgdotgreen' />

          <div className='flex justify-between items-center '>
            <div className='w-[45%] flex flex-col gap-5'>
              <h1 className='text-6xl font-bold '>Quality Products, Amazing Prices, Delivered Fast.</h1>
              <p className='text-lg text-slate-300'>Discover the best deals on electronics, fashion, home essentials, and more. Fast shipping, secure payment, and unbeatable prices.</p>
              <button className='bg-[#f9bf29] p-2 px-4 w-fit rounded-full text-black ' >Explore us</button>
            </div>
            <div className='h-[100%]  z-[1]'>
              <img src="./public/images'/couch.png" className='w-[100%] mt-7 mb-[-185px]' alt="" />
            </div>
          </div>
        </div>
      </div>


      <div className='flex justify-center w-100vw mt-28'>
        <div className='w-[100rem] h-[60%] p-5 px-28  relative flex flex-col gap-24 my-16 mb-52'>
          <div className='flex justify-between'>

            <div className='w-[300px] flex flex-col gap-5 mt-10'>
              <h1 className='text-4xl font-semibold '>Top Selling Product</h1>
              <p className='text-lg'>Our best-selling combines unmatched quality, reliability, and affordability. Perfect for everyday use, it's no wonder this is a customer favorite!</p>
            </div>

            <div className='flex justify-between gap-10 flex-wrap px-5 '>

              <div className='p-5  rounded-xl flex flex-col items-center gap-1 overflow-hidden relative' id='product'>
                <img src="./public/images'/product-1.png" className='' id="product_image" alt="" />
                <h1 className='text-xl font-medium'>Nordic chair</h1>
                <h1 className='text-2xl font-bold'>5500</h1>
                <div className="absolute bottom-0 bg-[#DCE5E4]" id="hidden-bg"></div>
              </div>

              <div className='p-5 rounded-xl flex flex-col items-center gap-1 overflow-hidden relative' id='product'>
                <img src="./public/images'/product-2.png" className='' id="product_image" alt="" />
                <h1 className='text-xl font-medium'>Nordic chair</h1>
                <h1 className='text-2xl font-bold'>5500</h1>
                <div className="absolute bottom-0 bg-[#DCE5E4]" id="hidden-bg"></div>
              </div>

              <div className='p-5 rounded-xl flex flex-col items-center gap-1 overflow-hidden relative' id='product'>
                <img src="./public/images'/product-3.png" className='' id="product_image" alt="" />
                <h1 className='text-xl font-medium'>Nordic chair</h1>
                <h1 className='text-2xl font-bold mb-5'>5500</h1>
                <div className="absolute bottom-0 bg-[#DCE5E4]" id="hidden-bg"></div>
              </div>
            </div>
          </div>


          <div className="flex justify-between w-full gap-20 relative ">
            <img src="./public/images'/dots-yellow.svg" className='absolute left-[50%] z-[-10] top-[-10%] w-72' alt="" />
            <div className="w-3/6 flex flex-col justify-center gap-5" id='whychoose'>
              <h1 className="text-4xl ">Why Choose Us</h1>
              <p className="text-slate-500 leading-7">Choosing us means opting for exceptional quality, reliability, and a customer-focused experience. We pride ourselves on delivering top-notch solutions tailored to your unique needs, backed by an expert team committed to excellence.</p>

              <div className="grid grid-cols-2 gap-9 ">
                <div className='leading-7'>
                  <img src="./public/images'/truck.svg" alt="Fast & Free Shipping Icon" />
                  <h1 className="text-lg font-medium mt-4">Fast & Free Shipping</h1>
                  <p className="text-slate-500 leading-6 ">Enjoy quick and cost-free delivery for all your orders, ensuring a seamless shopping experience.</p>
                </div>
                <div className='leading-7'>
                  <img src="./public/images'/bag.svg" alt="Easy to Shop Icon" />
                  <h1 className="text-lg font-medium mt-4">Easy to Shop</h1>
                  <p className="text-slate-500 leading-6">Browse and purchase with ease using our user-friendly platform designed to save you time and effort.</p>
                </div>
                <div className='leading-7'>
                  <img src="./public/images'/support.svg" alt="24/7 Support Icon" />
                  <h1 className="text-lg font-medium mt-4">24/7 Support</h1>
                  <p className="text-slate-500 leading-6">Our dedicated support team is available anytime to assist you with any inquiries or issues you may have.</p>
                </div>
                <div className='leading-7'>
                  <img src="./public/images'/return.svg" alt="Hassle-Free Returns Icon" />
                  <h1 className="text-lg font-medium mt-4">Hassle-Free Returns</h1>
                  <p className="text-slate-500 leading-6">We make returns simple and stress-free, ensuring you have complete peace of mind with your purchases.</p>
                </div>
              </div>

            </div>
            <div className="w-2/5 ">
              <img src="./public/images'/why-choose-us-img.jpg" className="rounded-3xl" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homecontent