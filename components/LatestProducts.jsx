'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const LatestProducts = () => {
    const displayQuantity = 4
    // Safely access the product list, defaulting to an empty array
    const products = useSelector(state => state.product.list) || []

    // Ensure products is an array before attempting to sort and slice
    const latestProducts = Array.isArray(products) 
        ? products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, displayQuantity)
        : [];

    return (
        <div className='max-w-7xl mx-auto px-6 my-16 sm:my-24'>
            <Title 
                title='Our Latest Arrivals' 
                description={`Discover the newest additions to our handloom collection.`} 
                href='/shop' 
            />
            <div className='mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8'>
                {latestProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default LatestProducts
