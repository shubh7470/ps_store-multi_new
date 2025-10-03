'use client'
import { ArrowRightIcon, ChevronRightIcon, Sparkles, Award, TrendingUp, ChevronLeftIcon, Heart } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import Link from 'next/link'

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Handloom-themed banner slides
    const bannerSlides = [
        {
            id: 1,
            badge: 'AUTHENTIC HANDLOOM',
            title: 'Woven Heritage',
            subtitle: 'Traditional Craftsmanship',
            description: 'Discover the timeless art of Indian handloom weaving. Each thread tells a story of tradition, skill, and cultural heritage passed down through generations.',
            buttonText: 'Explore Collection',
            buttonLink: '/collections/all',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=800&fit=crop&crop=center',
            bgGradient: 'from-amber-50 via-orange-50 to-red-50',
            accentColor: '#d97706'
        },
        {
            id: 2,
            badge: 'ARTISAN CRAFTED',
            title: 'Supporting Artisans',
            subtitle: '500+ Weaver Families',
            description: 'Empowering rural artisan communities across India. Your purchase directly supports traditional weavers and helps preserve ancient crafting techniques.',
            buttonText: 'Meet Our Artisans',
            buttonLink: '/artisans',
            image: 'https://images.unsplash.com/photo-1583391265775-15c7ebfc6ff9?w=800&h=800&fit=crop&crop=center',
            bgGradient: 'from-purple-50 via-pink-50 to-rose-50',
            accentColor: '#c2410c'
        },
        {
            id: 3,
            badge: 'PREMIUM QUALITY',
            title: 'Sustainable Fashion',
            subtitle: 'Eco-Friendly Textiles',
            description: 'Choose sustainable fashion with our eco-friendly handloom fabrics. Made with natural fibers and traditional techniques that respect the environment.',
            buttonText: 'Shop Sustainable',
            buttonLink: '/collections/sustainable',
            image: 'https://images.unsplash.com/photo-1594736797933-d0701ba1b46d?w=800&h=800&fit=crop&crop=center',
            bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
            accentColor: '#059669'
        }
    ]

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [bannerSlides.length])

    const currentSlideData = bannerSlides[currentSlide]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
    }

    return (
        <div className='bg-gradient-to-b from-[#FFF8E9] to-white pt-8 pb-4'>
            {/* Enhanced Main Hero Banner Section - Full Width */}
            <div className='relative overflow-hidden shadow-2xl mb-8'>
                <div className={`relative min-h-[400px] lg:min-h-[500px] bg-gradient-to-br ${currentSlideData.bgGradient} transition-all duration-1000`}>
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                        {/* Traditional Pattern Overlay */}
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${currentSlideData.accentColor.slice(1)}' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    {/* Content Container */}
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
                        <div className='relative z-10 h-full flex flex-col lg:flex-row items-center'>
                            {/* Content Section */}
                            <div className='flex-1 py-8 sm:py-12 lg:py-16'>
                                {/* Enhanced Badge with Animation */}
                                <div className='inline-flex items-center gap-3 mb-6'>
                                    <div className='bg-gradient-to-r from-[#e50029] to-[#a41212] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg animate-pulse'>
                                        <Sparkles size={14} />
                                        {currentSlideData.badge}
                                    </div>
                                    <div className='hidden sm:block text-gray-600 font-medium'>
                                        {currentSlideData.subtitle}
                                    </div>
                                </div>

                                {/* Main Title with Staggered Animation */}
                                <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6'>
                                    <span className='block bg-gradient-to-r from-[#a41212] via-[#e50029] to-[#a41212] bg-clip-text text-transparent animate-slideInLeft'>
                                        {currentSlideData.title.split(' ')[0]}
                                    </span>
                                    <span className='block bg-gradient-to-r from-[#e50029] to-[#a41212] bg-clip-text text-transparent animate-slideInRight animation-delay-200'>
                                        {currentSlideData.title.split(' ').slice(1).join(' ')}
                                    </span>
                                </h1>

                                <p className='text-lg sm:text-xl text-gray-700 max-w-2xl leading-relaxed mb-8 animate-fadeInUp animation-delay-400'>
                                    {currentSlideData.description}
                                </p>

                                {/* Premium Features */}
                                <div className='flex flex-wrap gap-3 mb-8 animate-fadeInUp animation-delay-600'>
                                    <div className='flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white shadow-lg'>
                                        <Award className='text-[#e50029]' size={18} />
                                        <span className='text-sm font-bold text-[#a41212]'>100% Authentic</span>
                                    </div>
                                    <div className='flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white shadow-lg'>
                                        <TrendingUp className='text-[#e50029]' size={18} />
                                        <span className='text-sm font-bold text-[#a41212]'>Trending Now</span>
                                    </div>
                                    <div className='flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white shadow-lg'>
                                        <Heart className='text-[#e50029]' size={18} />
                                        <span className='text-sm font-bold text-[#a41212]'>Handcrafted</span>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className='flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-800'>
                                    <Link href={currentSlideData.buttonLink}>
                                        <button className='group bg-gradient-to-r from-[#e50029] to-[#a41212] text-white font-bold py-4 px-8 rounded-full hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center text-lg'>
                                            {currentSlideData.buttonText}
                                            <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={20} />
                                        </button>
                                    </Link>
                                    <button className='bg-white/90 backdrop-blur-sm border-2 border-[#e50029] text-[#e50029] font-bold py-4 px-8 rounded-full hover:bg-[#e50029] hover:text-white hover:shadow-xl transition-all duration-300 text-lg'>
                                        Learn Our Story
                                    </button>
                                </div>
                            </div>

                            {/* Enhanced Image Section - No Box, Natural Display */}
                            <div className='flex-1 relative min-h-[300px] lg:min-h-[400px] flex items-center justify-center'>
                                <div className='relative group w-full max-w-lg'>
                                    {/* Main Banner Image - Natural Display */}
                                    <div className='relative w-full aspect-square max-w-sm sm:max-w-md lg:max-w-lg mx-auto'>
                                        <Image
                                            src={currentSlideData.image}
                                            alt={`${currentSlideData.badge} Banner`}
                                            fill
                                            className='object-cover rounded-2xl group-hover:scale-105 transition-all duration-700 shadow-2xl'
                                            priority
                                            sizes="(max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
                                        />
                                        
                                        {/* Subtle Gradient Overlay */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl'></div>
                                        
                                        {/* Floating Brand Badge */}
                                        <div className='absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-white/20'>
                                            <div className='text-sm font-bold bg-gradient-to-r from-[#e50029] to-[#a41212] bg-clip-text text-transparent'>
                                                HandloomCart
                                            </div>
                                        </div>

                                        {/* Quality Badge */}
                                        <div className='absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-white/20'>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                                                <span className='text-xs font-bold text-gray-700'>Premium Quality</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtle Decorative Elements */}
                                    <div className='absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#e50029]/20 to-[#a41212]/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500'></div>
                                    <div className='absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#a41212]/15 to-[#e50029]/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500'></div>
                                    
                                    {/* Floating Animation Ring */}
                                    <div className='absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-500 pointer-events-none'></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={prevSlide}
                        className='absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#a41212] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group z-20'
                    >
                        <ChevronRightIcon size={24} className='group-hover:scale-110 transition-transform rotate-180' />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className='absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#a41212] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group z-20'
                    >
                        <ChevronRightIcon size={24} className='group-hover:scale-110 transition-transform' />
                    </button>

                    {/* Enhanced Carousel Indicators */}
                    <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20'>
                        {bannerSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`transition-all duration-500 rounded-full ${
                                    currentSlide === index 
                                        ? 'w-12 h-3 bg-gradient-to-r from-[#e50029] to-[#a41212] shadow-lg' 
                                        : 'w-3 h-3 bg-white/60 hover:bg-white/80 shadow-md hover:scale-125'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Feature Banners */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
                    {/* Quality Assurance */}
                    <Link href='/quality'>
                        <div className='relative group bg-gradient-to-br from-white to-[#FFF8E9] border-2 border-[#F9EDCF] rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden'>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e50029]/5 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
                            
                            <div className='relative z-10'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <Award className='text-[#e50029]' size={28} />
                                    <span className='text-sm font-bold text-[#e50029] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full'>Quality</span>
                                </div>
                                <h3 className='text-2xl font-black bg-gradient-to-r from-[#a41212] to-[#e50029] bg-clip-text text-transparent mb-3'>
                                    Premium Quality
                                </h3>
                                <p className='text-gray-600 font-medium mb-6'>Handpicked fabrics with quality assurance</p>
                                <div className='flex items-center gap-2 text-[#e50029] font-bold group-hover:gap-3 transition-all'>
                                    Learn More <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={18} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Artisan Stories */}
                    <Link href='/artisans'>
                        <div className='relative group bg-gradient-to-br from-white to-[#F9EDCF] border-2 border-[#F9EDCF] rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden'>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#a41212]/5 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
                            
                            <div className='relative z-10'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <Heart className='text-[#e50029]' size={28} />
                                    <span className='text-sm font-bold text-[#e50029] uppercase tracking-wider bg-pink-50 px-3 py-1 rounded-full'>Stories</span>
                                </div>
                                <h3 className='text-2xl font-black bg-gradient-to-r from-[#a41212] to-[#e50029] bg-clip-text text-transparent mb-3'>
                                    Artisan Stories
                                </h3>
                                <p className='text-gray-600 font-medium mb-6'>Meet the masters behind each creation</p>
                                <div className='flex items-center gap-2 text-[#e50029] font-bold group-hover:gap-3 transition-all'>
                                    Discover <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={18} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Sustainability */}
                    <Link href='/sustainability'>
                        <div className='relative group bg-gradient-to-br from-white to-[#F9EDCF] border-2 border-[#F9EDCF] rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden md:col-span-2 lg:col-span-1'>
                            <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
                            
                            <div className='relative z-10'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <TrendingUp className='text-green-600' size={28} />
                                    <span className='text-sm font-bold text-green-600 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full'>Eco-Friendly</span>
                                </div>
                                <h3 className='text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3'>
                                    Sustainable Choice
                                </h3>
                                <p className='text-gray-600 font-medium mb-6'>Environment-friendly traditional methods</p>
                                <div className='flex items-center gap-2 text-green-600 font-bold group-hover:gap-3 transition-all'>
                                    Learn Impact <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={18} />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Categories Marquee */}
            <div className='mt-8'>
                <CategoriesMarquee />
            </div>

            {/* Enhanced CSS Animations */}
            <style jsx>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
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
                
                .animate-slideInLeft {
                    animation: slideInLeft 0.8s ease-out forwards;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 0.8s ease-out forwards;
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
                
                .animation-delay-600 {
                    animation-delay: 0.6s;
                }
                
                .animation-delay-700 {
                    animation-delay: 0.7s;
                }
                
                .animation-delay-800 {
                    animation-delay: 0.8s;
                }
            `}</style>
        </div>
    )
}

export default Hero
