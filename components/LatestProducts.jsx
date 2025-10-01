'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const LatestProducts = () => {
    const displayQuantity = 8
    const products = useSelector(state => state.product.list) || []

    // Enhanced product filtering and sorting
    const latestProducts = Array.isArray(products) 
        ? products
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, displayQuantity)
        : []

    return (
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24'>
            <Title 
                title='Our Latest Arrivals' 
                description='Discover the newest additions to our handloom collection with premium quality fabrics.'
                href='/shop' 
            />
            
            {/* Enhanced Responsive Grid */}
            <div className='mt-12'>
                {latestProducts.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
                        {latestProducts.map((product, index) => (
                            <ProductCard 
                                key={product.id || index} 
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-12'>
                        <div className='w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
                            <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                            </svg>
                        </div>
                        <h3 className='text-lg font-medium text-gray-900 mb-2'>No Products Available</h3>
                        <p className='text-gray-500'>Check back soon for our latest arrivals.</p>
                    </div>
                )}
            </div>
            
            {/* View All Products CTA */}
            {latestProducts.length > 0 && (
                <div className='text-center mt-12'>
                    <a
                        href='/shop'
                        className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-200'
                    >
                        View All Products
                        <svg className='ml-2 -mr-1 w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd' />
                        </svg>
                    </a>
                </div>
            )}
        </section>
    )
}

export default LatestProducts
