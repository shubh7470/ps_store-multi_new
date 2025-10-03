'use client'
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

const BestSelling = () => {
    const displayQuantity = 8
    const products = useSelector(state => state.product.list) || []
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [viewMode, setViewMode] = useState('grid') // grid or list
    const [selectedFilter, setSelectedFilter] = useState('all') // all, sarees, fabrics, etc.
    const [compareList, setCompareList] = useState([]) // Products to compare

    // Filter options for best sellers
    const filterOptions = [
        { id: 'all', name: 'All Best Sellers', icon: '🌟' },
        { id: 'sarees', name: 'Top Sarees', icon: '👘' },
        { id: 'fabrics', name: 'Premium Fabrics', icon: '🧶' },
        { id: 'suits', name: 'Trending Suits', icon: '👔' },
        { id: 'shawls', name: 'Premium Shawls', icon: '🧣' },
        { id: 'dupattas', name: 'Designer Dupattas', icon: '🎀' },
    ]

    // Toggle product in compare list
    const toggleCompare = (product, e) => {
        e.preventDefault()
        e.stopPropagation()
        
        setCompareList(prev => {
            const exists = prev.find(p => p.id === product.id)
            if (exists) {
                return prev.filter(p => p.id !== product.id)
            } else if (prev.length < 4) {
                return [...prev, product]
            }
            return prev
        })
    }

    // Check if product is in compare list
    const isInCompare = (productId) => compareList.some(p => p.id === productId)

    // Sort products by rating and get best sellers
    const bestSellingProducts = useMemo(() => {
        if (!Array.isArray(products)) return []
        
        let filtered = products.slice()
        
        // Apply category filter
        if (selectedFilter !== 'all') {
            filtered = filtered.filter(product => 
                product.category?.toLowerCase().includes(selectedFilter.toLowerCase())
            )
        }
        
        return filtered
            .sort((a, b) => (b.rating?.length || 0) - (a.rating?.length || 0))
            .slice(0, displayQuantity)
    }, [products, displayQuantity, selectedFilter])

    return (
        <section className='w-full bg-gradient-to-b from-white via-[#FFF8E9] to-white py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Enhanced Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold shadow-lg">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Best Sellers Collection
                        </span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e50029] to-[#a41212] mb-4">
                        Customer Favorites
                    </h2>
                    
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Discover our most loved handloom products, handpicked by our community of satisfied customers
                    </p>

                    {/* Stats Bar */}
                    <div className="flex flex-wrap justify-center gap-8 mt-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#e50029]">{bestSellingProducts.length}+</div>
                            <div className="text-sm text-gray-600 font-medium">Top Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#e50029]">10K+</div>
                            <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#e50029]">4.8★</div>
                            <div className="text-sm text-gray-600 font-medium">Average Rating</div>
                        </div>
                    </div>
                </div>

                {/* Filter & View Mode Controls */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white border-2 border-[#F9EDCF] rounded-xl shadow-sm">
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setSelectedFilter(filter.id)}
                                    className={`
                                        px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2
                                        ${selectedFilter === filter.id
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }
                                    `}
                                >
                                    <span>{filter.icon}</span>
                                    {filter.name}
                                </button>
                            ))}
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

                {/* Premium Products Grid */}
                {bestSellingProducts.length > 0 ? (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
                        {bestSellingProducts.map((product, index) => (
                            <Link
                                href={`/product/${product.id}`}
                                key={product.id || index}
                                className="group relative"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div 
                                    className={`relative bg-white overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-2 border-[#F9EDCF] hover:border-[#e50029] ${
                                        viewMode === 'grid' ? 'rounded-2xl' : 'rounded-xl flex flex-row'
                                    }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animation: 'fadeInScale 0.6s ease-out forwards'
                                    }}
                                >
                                    {/* Bestseller Badge */}
                                    {index < 3 && (
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-md opacity-75"></div>
                                                <div className="relative px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-xl flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    #{index + 1} BESTSELLER
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Product Image */}
                                    <div className={`relative bg-gradient-to-br from-[#FFF8E9] to-[#F9EDCF] overflow-hidden ${
                                        viewMode === 'grid' ? 'h-72' : 'w-64 h-64'
                                    }`}>
                                        <Image
                                            src={product.images?.[0] || '/placeholder-product.jpg'}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                        
                                        {/* Gradient Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        {/* Hover Actions */}
                                        <div className={`absolute inset-x-0 bottom-0 p-4 transform transition-all duration-500 ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                                            <div className="flex gap-2">
                                                <button className="flex-1 bg-white hover:bg-[#e50029] text-[#a41212] hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                    Quick Add
                                                </button>
                                                <button className="bg-white hover:bg-[#e50029] text-[#a41212] hover:text-white p-3 rounded-xl transition-all duration-300 shadow-lg">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={(e) => toggleCompare(product, e)}
                                                    className={`p-3 rounded-xl transition-all duration-300 shadow-lg ${
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
                                        </div>

                                        {/* Discount Badge */}
                                        {product.discount && (
                                            <div className="absolute top-4 right-4 z-10">
                                                <div className="bg-[#e50029] text-white px-3 py-2 rounded-xl font-bold text-sm shadow-xl">
                                                    {product.discount}% OFF
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        {/* Category */}
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-[#e50029] uppercase tracking-wider">
                                                {product.category || 'Handloom'}
                                            </span>
                                            {product.isNew && (
                                                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full">
                                                    NEW
                                                </span>
                                            )}
                                        </div>

                                        {/* Product Name */}
                                        <h3 className="text-lg font-bold text-[#a41212] mb-3 line-clamp-2 group-hover:text-[#e50029] transition-colors min-h-[3.5rem]">
                                            {product.name}
                                        </h3>

                                        {/* Rating & Reviews */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg 
                                                        key={i} 
                                                        className={`w-4 h-4 ${i < 4 ? 'text-amber-400' : 'text-gray-300'}`} 
                                                        fill="currentColor" 
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600 font-medium">
                                                ({product.rating?.length || 0} reviews)
                                            </span>
                                        </div>

                                        {/* Price Section */}
                                        <div className="flex items-center justify-between pt-4 border-t-2 border-[#F9EDCF]">
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-bold text-[#e50029]">
                                                        ₹{product.price?.toLocaleString()}
                                                    </span>
                                                    {product.originalPrice && (
                                                        <span className="text-sm text-gray-400 line-through">
                                                            ₹{product.originalPrice.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-green-600 font-semibold">
                                                    In Stock
                                                </span>
                                            </div>
                                        </div>

                                        {/* Sold Counter */}
                                        <div className="mt-4 p-3 bg-gradient-to-r from-[#FFF8E9] to-[#F9EDCF] rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-semibold text-[#a41212]">
                                                    🔥 {product.rating?.length || Math.floor(Math.random() * 500) + 100}+ sold
                                                </span>
                                                <div className="flex -space-x-2">
                                                    {[...Array(3)].map((_, i) => (
                                                        <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#FFF8E9] to-[#F9EDCF] rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-16 h-16 text-[#e50029]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-[#a41212] mb-2">No Products Available</h3>
                        <p className="text-gray-600">Check back soon for our best-selling products!</p>
                    </div>
                )}

                {/* View All CTA */}
                {bestSellingProducts.length > 0 && (
                    <div className="mt-16 text-center">
                        <Link
                            href='/shop'
                            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#e50029] via-[#ca2629] to-[#a41212] hover:from-[#ca2629] hover:via-[#a41212] hover:to-[#8a0f0f] text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                        >
                            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            Explore All Best Sellers
                            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
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
                                                src={product.image}
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

export default BestSelling