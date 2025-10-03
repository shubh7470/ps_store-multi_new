import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {
    return (
        <section className='w-full bg-gradient-to-b from-white via-[#FFF8E9] to-white py-16'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Enhanced Header Section */}
                <div className='text-center mb-20 relative'>
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <div className="w-96 h-96 bg-gradient-to-r from-[#e50029]/5 to-[#a41212]/5 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10">
                        

                        {/* Main Heading */}
                        <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
                            <span className="block bg-gradient-to-r from-[#a41212] via-[#e50029] to-[#a41212] bg-clip-text text-transparent animate-fadeInUp">
                                Why Choose
                            </span>
                            <span className="block bg-gradient-to-r from-[#e50029] via-[#a41212] to-[#e50029] bg-clip-text text-transparent animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                                HandloomCart?
                            </span>
                        </h3>

                        {/* Subtitle */}
                        <div className="max-w-4xl mx-auto mb-8 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-medium mb-6">
                                Where <span className="text-[#e50029] font-bold">Tradition Meets Excellence</span>
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We are committed to authenticity, quality, and the celebration of craftsmanship. 
                                Every piece tells a story of tradition, dedication, and the skilled hands of master artisans 
                                who have preserved India's rich textile heritage for generations.
                            </p>
                        </div>

                        {/* Feature Highlights */}
                        <div className="flex flex-wrap justify-center gap-6 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                            {[
                                { text: "100% Authentic", icon: "✨" },
                                { text: "Artisan Made", icon: "👐" },
                                { text: "Heritage Quality", icon: "🏺" },
                                { text: "Sustainable", icon: "🌱" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#F9EDCF] px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-[#a41212] font-semibold text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Decorative Line */}
                        <div className="mt-10 flex justify-center animate-fadeInUp" style={{animationDelay: '0.8s'}}>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e50029] to-transparent rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Modern Grid Layout */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'>
                    {ourSpecsData.map((spec, index) => (
                        <div 
                            key={index} 
                            className='group relative'
                            style={{
                                animationDelay: `${index * 150 + 1000}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            {/* Main Card */}
                            <div className='relative bg-white/80 backdrop-blur-sm border border-[#F9EDCF]/50 rounded-2xl p-8 h-full transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:-translate-y-3 group-hover:border-[#e50029]/20 overflow-hidden'>
                                
                                {/* Background Gradient Effect */}
                                <div className='absolute inset-0 bg-gradient-to-br from-[#FFF8E9]/50 via-white to-[#F9EDCF]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl'></div>
                                
                                {/* Floating Background Elements */}
                                <div className='absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#e50029]/5 to-[#a41212]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700'></div>
                                
                                {/* Content */}
                                <div className='relative z-10 flex flex-col items-center text-center h-full'>
                                    {/* Enhanced Icon Container */}
                                    <div className='relative mb-6'>
                                        <div className='w-20 h-20 bg-gradient-to-br from-[#e50029] to-[#a41212] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500'>
                                            <spec.icon size={32} className='text-white group-hover:scale-110 transition-transform duration-300' />
                                        </div>
                                        
                                        {/* Decorative Ring */}
                                        <div className='absolute -inset-2 border-2 border-[#e50029]/20 rounded-2xl group-hover:border-[#e50029]/40 group-hover:scale-125 transition-all duration-500'></div>
                                        
                                        {/* Pulsing Effect */}
                                        <div className='absolute -inset-4 border border-[#e50029]/10 rounded-2xl animate-pulse group-hover:animate-none'></div>
                                    </div>

                                    {/* Title */}
                                    <h3 className='text-xl font-bold text-[#a41212] mb-4 group-hover:text-[#e50029] transition-colors duration-300'>
                                        {spec.title}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className='text-gray-600 leading-relaxed text-base group-hover:text-gray-700 transition-colors duration-300'>
                                        {spec.description}
                                    </p>

                                    {/* Bottom Accent Line */}
                                    <div className='mt-auto pt-6'>
                                        <div className='w-0 h-1 bg-gradient-to-r from-[#e50029] to-[#a41212] rounded-full group-hover:w-16 transition-all duration-500 mx-auto'></div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Decorative Elements */}
                            <div className='absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-[#e50029]/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                            <div className='absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-[#e50029]/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                        </div>
                    ))}
                </div>

                {/* Bottom Statistics Section */}
                <div className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-8'>
                    {[
                        { number: '500+', label: 'Artisan Families', icon: '👥' },
                        { number: '50K+', label: 'Happy Customers', icon: '😊' },
                        { number: '100%', label: 'Authentic Products', icon: '✨' },
                        { number: '25+', label: 'States Covered', icon: '🌏' }
                    ].map((stat, index) => (
                        <div 
                            key={index}
                            className='text-center group'
                            style={{
                                animationDelay: `${(index + ourSpecsData.length) * 150 + 1500}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            <div className='text-4xl mb-2'>{stat.icon}</div>
                            <div className='text-3xl font-black bg-gradient-to-r from-[#e50029] to-[#a41212] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300'>
                                {stat.number}
                            </div>
                            <div className='text-sm font-semibold text-gray-600 uppercase tracking-wider'>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enhanced CSS Animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .group:nth-child(odd) .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .group:nth-child(even) .animate-float {
                    animation: float 6s ease-in-out infinite reverse;
                    animation-delay: 1s;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    )
}

export default OurSpecs
