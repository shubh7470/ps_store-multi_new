'use client'
import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import Title from './Title'

const LatestProducts = () => {
    const displayQuantity = 12
    const products = useSelector(state => state.product.list) || []
    
    // Handloom-specific category filtering
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedRegion, setSelectedRegion] = useState('all')
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)
    const [viewMode, setViewMode] = useState('grid') // grid or list
    const [compareList, setCompareList] = useState([])
    const [hoveredIndex, setHoveredIndex] = useState(null)

    // Handloom product categories
    const handloomCategories = [
        { id: 'all', name: 'All Products', icon: '🧵' },
        { id: 'sarees', name: 'Banarasi Sarees', icon: '👘' },
        { id: 'suits', name: 'Silk Suits', icon: '👔' },
        { id: 'fabrics', name: 'Cotton Fabrics', icon: '🧶' },
        { id: 'shawls', name: 'Handwoven Shawls', icon: '🧣' },
        { id: 'dupattas', name: 'Designer Dupattas', icon: '🎀' },
    ]

    // Regional handloom traditions
    const handloomRegions = [
        { id: 'all', name: 'All Regions' },
        { id: 'banarasi', name: 'Banarasi' },
        { id: 'kanjeevaram', name: 'Kanjeevaram' },
        { id: 'chanderi', name: 'Chanderi' },
        { id: 'pochampally', name: 'Pochampally' },
        { id: 'maheshwari', name: 'Maheshwari' },
    ]


    // Enhanced product filtering
    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) return []
        
        let filtered = products.slice()
        
        // Apply category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => 
                product.category?.toLowerCase().includes(selectedCategory.toLowerCase())
            )
        }
        
        // Apply region filter
        if (selectedRegion !== 'all') {
            filtered = filtered.filter(product => 
                product.region?.toLowerCase() === selectedRegion.toLowerCase()
            )
        }
        
        // Sort by creation date (latest first)
        return filtered
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, displayQuantity)
    }, [products, selectedCategory, selectedRegion, displayQuantity])

    // Compare functionality
    const toggleCompare = (product, e) => {
        e.preventDefault()
        e.stopPropagation()
        
        setCompareList(prev => {
            const exists = prev.find(p => p.id === product.id)
            if (exists) {
                return prev.filter(p => p.id !== product.id)
            } else {
                if (prev.length >= 4) {
                    alert('You can compare up to 4 products at a time')
                    return prev
                }
                return [...prev, product]
            }
        })
    }

    const isInCompare = (productId) => {
        return compareList.some(p => p.id === productId)
    }

    return (
        <section className='w-full bg-gradient-to-b from-[#FFF8E9] via-white to-[#FFF8E9] py-20'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Header with Handloom Theme */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#e50029] text-white text-sm font-medium shadow-lg">
                            <span className="mr-2">✨</span>
                            Authentic Handloom Collection
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#a41212] mb-4">
                        Handcrafted with Heritage
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover exquisite handloom textiles woven by master artisans. Each piece celebrates India's rich weaving traditions 
                        and supports local craftsmen communities.
                    </p>
                </div>

                {/* Enhanced Filter Section with Handloom Categories */}
                <div className="mb-12">
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                        className="lg:hidden w-full flex items-center justify-between px-6 py-4 mb-6 bg-white border-2 border-[#F9EDCF] rounded-xl text-[#a41212] font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                        <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filter Handloom Products
                        </span>
                        <svg className={`w-5 h-5 transform transition-transform ${isFiltersVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Filter Container */}
                    <div className={`${isFiltersVisible ? 'block' : 'hidden'} lg:block transition-all duration-300`}>
                        {/* Category Filter */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-[#a41212] mb-4 flex items-center">
                                <span className="mr-2">🧵</span>
                                Product Categories
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                {handloomCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`
                                            relative overflow-hidden p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 border-2
                                            ${selectedCategory === category.id
                                                ? 'bg-gradient-to-br from-[#e50029] to-[#ca2629] text-white border-[#e50029] shadow-xl scale-105'
                                                : 'bg-white text-[#a41212] border-[#F9EDCF] hover:border-[#e50029] shadow-md'
                                            }
                                        `}
                                    >
                                        <div className="text-3xl mb-2">{category.icon}</div>
                                        <div className="text-sm font-semibold">{category.name}</div>
                                        {selectedCategory === category.id && (
                                            <div className="absolute top-2 right-2">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Region Filter */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-[#a41212] mb-4 flex items-center">
                                <span className="mr-2">📍</span>
                                Regional Heritage
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {handloomRegions.map((region) => (
                                    <button
                                        key={region.id}
                                        onClick={() => setSelectedRegion(region.id)}
                                        className={`
                                            px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-2
                                            ${selectedRegion === region.id
                                                ? 'bg-[#a41212] text-white border-[#a41212] shadow-lg'
                                                : 'bg-white text-[#a41212] border-[#F9EDCF] hover:border-[#a41212] hover:shadow-md'
                                            }
                                        `}
                                    >
                                        {region.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Filters Summary */}
                        {(selectedCategory !== 'all' || selectedRegion !== 'all') && (
                            <div className="flex items-center justify-between p-4 bg-[#FFF8E9] border-2 border-[#F9EDCF] rounded-xl">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-sm font-medium text-[#a41212]">Active Filters:</span>
                                    {selectedCategory !== 'all' && (
                                        <span className="px-3 py-1 bg-[#e50029] text-white text-xs font-semibold rounded-full">
                                            {handloomCategories.find(c => c.id === selectedCategory)?.name}
                                        </span>
                                    )}
                                    {selectedRegion !== 'all' && (
                                        <span className="px-3 py-1 bg-[#a41212] text-white text-xs font-semibold rounded-full">
                                            {handloomRegions.find(r => r.id === selectedRegion)?.name}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all')
                                        setSelectedRegion('all')
                                    }}
                                    className="text-sm text-[#e50029] hover:text-[#ca2629] font-semibold flex items-center transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear All
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Products Grid Section */}
                {filteredProducts.length > 0 ? (
                    <>
                        {/* Results Summary */}
                        <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-4 bg-white border-2 border-[#F9EDCF] rounded-xl shadow-sm gap-4">
                            <p className="text-[#a41212] font-medium">
                                Showing <span className="font-bold text-[#e50029] text-lg">{filteredProducts.length}</span> 
                                <span className="text-gray-600"> handloom products</span>
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Sort by:</span>
                                    <select className="px-3 py-2 border-2 border-[#F9EDCF] rounded-lg text-sm font-medium text-[#a41212] focus:outline-none focus:border-[#e50029] transition-colors">
                                        <option>Latest First</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Most Popular</option>
                                    </select>
                                </div>
                                
                                {/* View Mode Toggle */}
                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`px-3 py-2 rounded-md transition-all duration-300 ${viewMode === 'grid' ? 'bg-white shadow-md text-[#e50029]' : 'text-gray-600'}`}
                                        title="Grid View"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`px-3 py-2 rounded-md transition-all duration-300 ${viewMode === 'list' ? 'bg-white shadow-md text-[#e50029]' : 'text-gray-600'}`}
                                        title="List View"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Premium Product Grid */}
                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
                            {filteredProducts.map((product, index) => (
                                <Link 
                                    href={`/product/${product.id}`}
                                    key={product.id || index}
                                    className={`group bg-white overflow-hidden border-2 border-[#F9EDCF] hover:border-[#e50029] shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
                                        viewMode === 'grid' ? 'rounded-2xl' : 'rounded-xl flex flex-row'
                                    }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animation: 'fadeInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    {/* Product Image Container */}
                                    <div className={`relative bg-gradient-to-br from-[#FFF8E9] to-[#F9EDCF] overflow-hidden ${
                                        viewMode === 'grid' ? 'h-72' : 'w-64 h-64 flex-shrink-0'
                                    }`}>
                                        <Image
                                            src={product.images?.[0] || '/placeholder-handloom.jpg'}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                        
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                                            {product.isNew && (
                                                <span className="px-3 py-1 bg-[#e50029] text-white text-xs font-bold rounded-full shadow-lg">
                                                    NEW ARRIVAL
                                                </span>
                                            )}
                                            {product.region && (
                                                <span className="px-3 py-1 bg-[#a41212] text-white text-xs font-bold rounded-full shadow-lg ml-auto">
                                                    {product.region}
                                                </span>
                                            )}
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-10 group-hover:translate-x-0">
                                            <button 
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                }}
                                                className="p-2 bg-white hover:bg-[#e50029] text-[#a41212] hover:text-white rounded-full shadow-lg transition-colors duration-200"
                                                title="Add to Wishlist"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                }}
                                                className="p-2 bg-white hover:bg-[#e50029] text-[#a41212] hover:text-white rounded-full shadow-lg transition-colors duration-200"
                                                title="Quick View"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={(e) => toggleCompare(product, e)}
                                                className={`p-2 rounded-full shadow-lg transition-colors duration-200 ${
                                                    isInCompare(product.id) 
                                                        ? 'bg-[#e50029] text-white' 
                                                        : 'bg-white hover:bg-[#e50029] text-[#a41212] hover:text-white'
                                                }`}
                                                title="Compare"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00 2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Handmade Badge */}
                                        <div className="absolute bottom-3 left-3">
                                            <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-[#a41212] text-xs font-semibold rounded-full shadow-md">
                                                <span className="mr-1">🤲</span>
                                                Handcrafted
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className={viewMode === 'grid' ? 'p-5' : 'p-6 flex-1'}>
                                        {/* Category & Region */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-semibold text-[#e50029] uppercase tracking-wide">
                                                {product.category || 'Handloom'}
                                            </span>
                                            {product.region && (
                                                <>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="text-xs text-gray-500">{product.region}</span>
                                                </>
                                            )}
                                        </div>

                                        {/* Product Name */}
                                        <h3 className="text-lg font-bold text-[#a41212] mb-2 line-clamp-2 group-hover:text-[#e50029] transition-colors min-h-[3.5rem]">
                                            {product.name}
                                        </h3>

                                        {/* Artisan Info */}
                                        {product.artisan && (
                                            <p className="text-xs text-gray-500 mb-3 italic">
                                                By {product.artisan}
                                            </p>
                                        )}

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-600 font-medium">4.0 (128 reviews)</span>
                                        </div>

                                        {/* Price Section */}
                                        <div className="flex items-center justify-between mb-4 pt-3 border-t-2 border-[#F9EDCF]">
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-bold text-[#e50029]">₹{product.price?.toLocaleString()}</span>
                                                    {product.originalPrice && (
                                                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                                    )}
                                                </div>
                                                {product.discount && (
                                                    <span className="inline-block mt-1 text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
                                                        Save {product.discount}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button className="w-full bg-gradient-to-r from-[#e50029] to-[#ca2629] hover:from-[#ca2629] hover:to-[#a41212] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-xl flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            Add to Cart
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='text-center py-20'>
                        <div className='w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#FFF8E9] to-[#F9EDCF] rounded-full flex items-center justify-center shadow-xl'>
                            <svg className='w-16 h-16 text-[#e50029]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className='text-3xl font-bold text-[#a41212] mb-4'>
                            No Handloom Products Found
                        </h3>
                        <p className='text-gray-600 mb-8 max-w-md mx-auto text-lg'>
                            We couldn't find any products matching your criteria. Try adjusting your filters or explore all collections.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory('all')
                                setSelectedRegion('all')
                            }}
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#e50029] to-[#ca2629] hover:from-[#ca2629] hover:to-[#a41212] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Enhanced CTA Section */}
                {filteredProducts.length > 0 && (
                    <div className='mt-20'>
                        <div className="relative bg-gradient-to-r from-[#e50029] via-[#ca2629] to-[#a41212] rounded-3xl p-12 shadow-2xl overflow-hidden">
                            {/* Decorative Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
                                }}></div>
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="inline-block mb-4">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                                        <span className="mr-2">🌟</span>
                                        Support Indian Artisans
                                    </span>
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-4">
                                    Explore Our Complete Handloom Collection
                                </h3>
                                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                                    Discover thousands of handcrafted textiles, each piece telling a unique story of tradition, 
                                    skill, and heritage from master weavers across India.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href='/shop'
                                        className='inline-flex items-center px-8 py-4 bg-white text-[#e50029] font-bold rounded-xl hover:bg-[#FFF8E9] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105'
                                    >
                                        <svg className='w-6 h-6 mr-2' fill='currentColor' viewBox='0 0 24 24'>
                                            <path fillRule='evenodd' d='M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1.017l-.75 9.375A2.25 2.25 0 0 1 16.984 18H7.016a2.25 2.25 0 0 1-2.249-1.625L4.017 6H3a1 1 0 0 1 0-2h4zM9 4h6V3H9v1z' clipRule='evenodd' />
                                        </svg>
                                        Browse All Products
                                    </Link>
                                    <Link
                                        href='/artisans'
                                        className='inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#e50029] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105'
                                    >
                                        <span className="mr-2">🤝</span>
                                        Meet Our Artisans
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS Animations */}
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
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>

            {/* Comparison Floating Bar */}
            {compareList.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#a41212] to-[#e50029] text-white p-4 shadow-2xl z-50 animate-fadeInUp">
                    <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="font-semibold text-lg">Compare Products ({compareList.length}/4)</span>
                            <div className="flex gap-3 flex-wrap">
                                {compareList.map((product) => (
                                    <div key={product.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
                                        <div className="relative w-12 h-12 rounded overflow-hidden">
                                            <Image 
                                                src={product.images?.[0] || '/placeholder-handloom.jpg'}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-sm font-medium max-w-[100px] truncate">{product.name}</span>
                                        <button 
                                            onClick={(e) => toggleCompare(product, e)}
                                            className="ml-2 hover:bg-white/30 rounded-full p-1 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setCompareList([])}
                                className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg font-semibold transition-all duration-300"
                            >
                                Clear All
                            </button>
                            <button className="bg-white text-[#e50029] hover:bg-[#FFF8E9] px-8 py-2 rounded-lg font-bold transition-all duration-300 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00 2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Compare Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default LatestProducts
