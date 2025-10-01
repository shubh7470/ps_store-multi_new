'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'

    return (
        <div className='bg-gradient-to-b from-[#FFF8E9] to-white pt-10 pb-4'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto px-6'>
                {/* Main Hero Section */}
                <div className='relative flex-1 flex flex-col bg-white border border-[#F9EDCF] rounded-3xl shadow-sm group overflow-hidden'>
                    <div className='p-8 sm:p-16 z-10'>
                        {/* News Banner */}
                        <div className='inline-flex items-center gap-3 bg-[#F9EDCF] text-[#a41212] pr-4 p-1 rounded-full text-xs sm:text-sm w-max cursor-pointer'>
                            <span className='bg-[#e50029] px-3 py-1 rounded-full text-white text-xs font-semibold'>
                                NEW
                            </span>
                            Free Shipping on First Order!
                            <ChevronRightIcon className='group-hover:translate-x-1 transition-transform' size={16} />
                        </div>
                        
                        {/* Main Title */}
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl leading-tight my-4 font-bold bg-gradient-to-r from-[#a41212] to-[#e50029] bg-clip-text text-transparent max-w-sm sm:max-w-md'>
                            Woven Stories, Modern Designs.
                        </h1>
                        <p className='text-slate-600 max-w-md'>
                            Discover authentic, handcrafted textiles from India's finest artisans. Each piece is a blend of tradition and timeless elegance.
                        </p>

                        {/* Starting Price */}
                        <div className='text-[#a41212] font-medium mt-6'>
                            <p className='text-sm'>Starts from</p>
                            <p className='text-3xl font-bold'>{currency}499</p>
                        </div>
                        
                        {/* CTA Button */}
                        <button className='bg-gradient-to-r from-[#e50029] to-[#ca2629] text-white font-semibold py-3 px-8 sm:py-4 sm:px-12 mt-8 rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300'>
                            Explore Collection
                        </button>
                    </div>

                    {/* Model Image */}
                    <Image 
                        width={800}
                        height={800}
                        className='sm:absolute bottom-0 right-0 md:-right-10 w-full sm:max-w-md lg:max-w-lg object-contain group-hover:scale-105 transition-transform duration-500' 
                        src={assets.hero_model_img} 
                        alt="Model wearing handloom saree" 
                        priority
                    />
                </div>

                {/* Side Banners */}
                <div className='flex flex-col gap-8 w-full xl:max-w-sm'>
                    {/* Best Sellers */}
                    <div className='flex-1 flex items-center justify-between w-full bg-white border border-[#F9EDCF] rounded-3xl p-6 group shadow-sm'>
                        <div>
                            <h3 className='text-3xl font-bold bg-gradient-to-r from-[#a41212] to-[#e50029] bg-clip-text text-transparent max-w-40'>
                                Best Sellers
                            </h3>
                            <p className='flex items-center gap-1.5 mt-4 text-[#a41212] font-medium'>
                                View more <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={18} />
                            </p>
                        </div>
                        <Image width={140} height={140} className='w-32 rounded-lg' src={assets.hero_product_img1} alt="Handloom Product 1" />
                    </div>

                    {/* New Arrivals */}
                    <div className='flex-1 flex items-center justify-between w-full bg-white border border-[#F9EDCF] rounded-3xl p-6 group shadow-sm'>
                        <div>
                            <h3 className='text-3xl font-bold bg-gradient-to-r from-[#a41212] to-[#e50029] bg-clip-text text-transparent max-w-40'>
                                New Arrivals
                            </h3>
                            <p className='flex items-center gap-1.5 mt-4 text-[#a41212] font-medium'>
                                View more <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={18} />
                            </p>
                        </div>
                        <Image width={140} height={140} className='w-32 rounded-lg' src={assets.hero_product_img2} alt="Handloom Product 2" />
                    </div>
                </div>
            </div>

            {/* Categories Marquee */}
            <div className='mt-16'>
                <CategoriesMarquee />
            </div>
        </div>
    )
}

export default Hero
