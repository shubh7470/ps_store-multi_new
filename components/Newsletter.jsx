import React, { useState } from 'react';
import Title from './Title';
import toast from 'react-hot-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        // Basic email validation
        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email address.');
            return;
        }
        
        // On success
        toast.success(`Thank you for subscribing, ${email}!`);
        setEmail('');
        
        // TODO: Add your actual subscription logic or API call here
    };

    return (
        <div className='flex flex-col items-center mx-4 my-20 sm:my-36 bg-gradient-to-b from-[#FFF8E9] via-white to-[#F9EDCF] py-12 px-6 rounded-2xl shadow-lg max-w-3xl mx-auto text-center'>
            <Title 
                title="Join Our Handloom Community" 
                description="Subscribe to get exclusive handloom deals, new arrivals, and artisan stories delivered straight to your inbox every week." 
                visibleButton={false} 
            />
            <div className='flex bg-white text-sm p-1.5 rounded-full w-full max-w-xl my-10 border-2 border-transparent ring-1 ring-inset ring-[#F9EDCF] focus-within:ring-[#e50029] transition-all duration-300'>
                <input 
                    className='flex-1 pl-5 bg-transparent outline-none text-[#a41212] placeholder:text-slate-400' 
                    type="email" 
                    placeholder='Enter your email address' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                    onClick={handleSubscribe}
                    className='font-medium bg-gradient-to-r from-[#e50029] to-[#ca2629] text-white px-5 sm:px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 shadow-md'
                >
                    Get Updates
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
