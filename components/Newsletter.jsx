import React, { useState } from 'react';
import Title from './Title';
import toast from 'react-hot-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleSubscribe = () => {
        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email address.');
            return;
        }
        
        toast.success(`Welcome to our handloom family! 🎉`);
        setEmail('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubscribe();
        }
    };

    return (
        <section className='w-full bg-gradient-to-br from-[#FFF8E9] via-white to-[#F9EDCF] py-20 overflow-hidden relative'>
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-[#e50029]/5 to-[#a41212]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-[#a41212]/5 to-[#e50029]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                {/* Simple Header */}
                <div className='text-center mb-16'>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-[#e50029]/20 px-6 py-3 rounded-full mb-8 shadow-lg animate-fadeInUp">
                        <span className="w-2 h-2 bg-[#e50029] rounded-full animate-pulse"></span>
                        <span className="text-[#a41212] font-bold text-sm uppercase tracking-widest">Newsletter</span>
                        <span className="text-2xl">📧</span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                        <span className="block bg-gradient-to-r from-[#a41212] via-[#e50029] to-[#a41212] bg-clip-text text-transparent">
                            Stay Updated
                        </span>
                    </h2>

                    {/* Simple Description */}
                    <div className="max-w-2xl mx-auto animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Get exclusive deals and new arrivals from our handloom collection.
                        </p>
                    </div>
                </div>

                {/* Enhanced Newsletter Form */}
                <div className='max-w-2xl mx-auto animate-fadeInUp' style={{animationDelay: '0.6s'}}>
                    <div 
                        className={`relative group transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Glowing Background Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#e50029] to-[#a41212] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                        
                        {/* Main Form Container */}
                        <div className='relative bg-white/95 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-2 shadow-xl'>
                            <div className='flex flex-col sm:flex-row gap-3'>
                                {/* Email Input */}
                                <div className='flex-1 relative'>
                                    <input 
                                        className='w-full px-6 py-4 bg-transparent outline-none text-[#a41212] placeholder:text-gray-500 text-lg rounded-xl border-2 border-transparent focus:border-[#e50029]/30 transition-all duration-300' 
                                        type="email" 
                                        placeholder='Your email address...'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>

                                {/* Subscribe Button */}
                                <button 
                                    onClick={handleSubscribe}
                                    className='group bg-gradient-to-r from-[#e50029] to-[#a41212] hover:from-[#a41212] hover:to-[#e50029] text-white font-bold px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 justify-center text-lg whitespace-nowrap'
                                >
                                    Subscribe
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Simple Trust Indicators */}
                    <div className='flex items-center justify-center gap-6 mt-8 text-sm text-gray-600 animate-fadeInUp' style={{animationDelay: '0.8s'}}>
                        <div className='flex items-center gap-2'>
                            <span className="text-green-500">✓</span>
                            <span>No Spam</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className="text-green-500">✓</span>
                            <span>Weekly Updates</span>
                        </div>
                    </div>

                    {/* Simple Social Proof */}
                    <div className='text-center mt-10 animate-fadeInUp' style={{animationDelay: '1s'}}>
                        <p className='text-gray-600'>
                            Join <span className='font-bold text-[#e50029]'>50K+</span> happy subscribers 
                            <span className='text-[#e50029] ml-2'>★★★★★</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Enhanced CSS Animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
};

export default Newsletter;
