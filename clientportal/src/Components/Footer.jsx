import React from 'react'

const Footer = () => {
    return (
        <footer className='flex justify-center w-100vw bg-white'>
            <div className='w-[100rem] h-auto p-5 px-28 relative flex flex-col'>
                <div className='flex justify-between mt-32'>
                    {/* Newsletter Section */}
                    <div className='flex flex-col gap-5'>
                        <h1 className='flex items-center text-xl font-normal'>
                            <img src="./public/images'/envelope-outline.svg" className='w-8' alt="" />Subscribe to Newsletter
                        </h1>
                        <form action="" className='flex gap-5'>
                            <input type="text" className='p-3 placeholder-text-slate-400 border border-slate-300 rounded-xl ' placeholder="Enter your name" />
                            <input type="email" className='p-3 border border-slate-300 placeholder-text-slate-600 rounded-xl' placeholder="Enter your email" />
                            <button type='submit' className='p-3 rounded-xl bg-[#3b5d50]'>
                                <img src="./public/images'/envelope-outline.svg" alt="" />
                            </button>
                        </form>
                    </div>
                    {/* Image Section */}
                    <div>
                        <img src="./public/images'/sofa.png" className="mt-[-290px] h-96" alt="" />
                    </div>
                </div>

                {/* Additional Content */}
                <div className='flex justify-between mt-20'>
                    {/* Social Media Links */}
                    <div className='flex flex-col items-start gap-5'>
                        <h3 className='text-xl font-semibold'>Follow Us</h3>
                        <div className='flex gap-4'>
                            <a href="#" className='p-3 bg-[#3b5d50] text-white rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.84 3.87 8.84 8.68 9.74v-6.91H8.26v-2.83h2.42V9.73c0-2.39 1.44-3.7 3.63-3.7 1.05 0 2.15.18 2.15.18v2.37h-1.21c-1.2 0-1.58.75-1.58 1.52v1.83h2.68l-.43 2.83h-2.25v6.91C18.13 20.84 22 16.84 22 12z" />
                                </svg>
                            </a>
                            <a href="#" className='p-3 bg-[#3b5d50] text-white rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.46 6.03c-.77.35-1.6.58-2.46.68a4.34 4.34 0 0 0 1.91-2.4 8.73 8.73 0 0 1-2.76 1.06 4.34 4.34 0 0 0-7.4 3.96A12.32 12.32 0 0 1 2.4 4.89a4.34 4.34 0 0 0 1.34 5.79 4.31 4.31 0 0 1-1.97-.55v.06a4.34 4.34 0 0 0 3.48 4.25c-.78.21-1.6.24-2.4.09a4.34 4.34 0 0 0 4.05 3.01 8.71 8.71 0 0 1-5.38 1.86A12.29 12.29 0 0 0 10.71 20c7.87 0 12.18-6.51 12.18-12.16 0-.19 0-.39-.01-.58a8.67 8.67 0 0 0 2.13-2.23z" />
                                </svg>
                            </a>
                            <a href="#" className='p-3 bg-[#3b5d50] text-white rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zM12 7.1a4.9 4.9 0 1 0 4.9 4.9A4.91 4.91 0 0 0 12 7.1zm0 8a3.1 3.1 0 1 1 3.1-3.1A3.1 3.1 0 0 1 12 15.1zm4.85-8.61a1.14 1.14 0 1 1-1.14-1.14 1.14 1.14 0 0 1 1.14 1.14z" />
                                </svg>
                            </a>
                        </div>
                    </div>


                    {/* FAQ Section */}
                    <div className='flex flex-col items-start gap-5'>
                        <h3 className='text-xl font-semibold'>Frequently Asked Questions</h3>
                        <ul className='text-gray-600'>
                            <li className='mb-3'>What is your return policy?</li>
                            <li className='mb-3'>How can I track my order?</li>
                            <li className='mb-3'>Do you offer international shipping?</li>
                            <li className='mb-3'>Where can I contact customer support?</li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className='flex flex-col items-start gap-5'>
                        <h3 className='text-xl font-semibold'>Contact Us</h3>
                        <div className='flex flex-col gap-2'>
                            <p className='text-slate-600'>
                                <strong>Email:</strong> support@example.com
                            </p>
                            <p className='text-slate-600'>
                                <strong>Phone:</strong> +1 (123) 456-7890
                            </p>
                            <p className='text-slate-600'>
                                <strong>Address:</strong> 1234 Example Street, City, Country
                            </p>
                        </div>
                    </div>


                </div>
                    {/* Copyright and Footer Links */}
                    <div className='mt-10 border-t border-slate-300 pt-5 w-full'>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                            {/* Copyright */}
                            <p className='text-slate-500 text-sm'>
                                © {new Date().getFullYear()} Your Company Name. All rights reserved.
                            </p>

                            {/* Footer Links */}
                            <div className='flex gap-5'>
                                <a href="/privacy-policy" className='text-slate-600 hover:underline text-sm'>
                                    Privacy Policy
                                </a>
                                <a href="/terms-of-service" className='text-slate-600 hover:underline text-sm'>
                                    Terms of Service
                                </a>
                                <a href="/faq" className='text-slate-600 hover:underline text-sm'>
                                    FAQ
                                </a>
                            </div>
                        </div>
                    </div>
            </div>
        </footer>

    )
}

export default Footer