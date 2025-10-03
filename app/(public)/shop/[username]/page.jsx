'use client'
import ProductCard from "@/components/ProductCard"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { 
    MapPinIcon, 
    ClockIcon,
    StarIcon,
    ShieldCheckIcon,
    TruckIcon,
    MessageCircleIcon,
    PackageIcon,
    AwardIcon,
    CheckCircleIcon,
    BadgeCheckIcon,
    FilterIcon,
    GridIcon,
    ListIcon,
    SearchIcon,
    TagIcon,
    CalendarIcon,
    TrendingUpIcon
} from "lucide-react"
import Loading from "@/components/Loading"
import Image from "next/image"
import { dummyStoreData, productDummyData } from "@/assets/assets"

export default function StoreShop() {
    const { username } = useParams()
    const [products, setProducts] = useState([])
    const [storeInfo, setStoreInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('products')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [viewMode, setViewMode] = useState('grid')
    const [sortBy, setSortBy] = useState('featured')

    const fetchStoreData = async () => {
        setStoreInfo(dummyStoreData)
        setProducts(productDummyData)
        setLoading(false)
    }

    useEffect(() => {
        fetchStoreData()
    }, [])

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <StarIcon
                key={index}
                className={`w-4 h-4 ${
                    index < Math.floor(rating) 
                        ? 'text-[#e50029] fill-current' 
                        : 'text-gray-300'
                }`}
            />
        ))
    }

    // Handloom-specific categories
    const handloomCategories = [
        'all',
        'Banarasi Sarees', 
        'Silk Fabrics', 
        'Cotton Handloom', 
        'Kanjeevaram', 
        'Chanderi', 
        'Pochampally', 
        'Handwoven Shawls',
        'Traditional Dupattas'
    ]
    
    // Filter products by category
    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => product.category === selectedCategory)

    return !loading ? (
        <div className="min-h-screen bg-[#FFF8E9]">
            {/* Clean Store Hero Banner */}
            {storeInfo && (
                <div className="relative bg-white border-b border-[#F9EDCF]">
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            {/* Large Clean Store Logo */}
                            <div className="relative group">
                                <div className="p-2 bg-white border-2 border-[#F9EDCF] rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <div className="w-40 h-40 bg-gradient-to-br from-[#e50029] to-[#a41212] rounded-2xl flex items-center justify-center text-white text-5xl font-black">
                                        HL
                                    </div>
                                </div>
                                {storeInfo.verification.isVerified && (
                                    <div className="absolute -bottom-2 -right-2 bg-white border-2 border-[#e50029] rounded-full p-2 shadow-lg">
                                        <BadgeCheckIcon className="w-7 h-7 text-[#e50029]" />
                                    </div>
                                )}
                            </div>

                            {/* Smaller Store Info Text */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
                                    <h1 className="text-3xl lg:text-4xl font-black text-[#a41212]">{storeInfo.name}</h1>
                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {storeInfo.verification.verificationBadges.map((badge, index) => (
                                            <span key={index} className="bg-gradient-to-r from-[#e50029] to-[#a41212] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <p className="text-lg lg:text-xl text-[#e50029] mb-3 font-bold">{storeInfo.tagline}</p>
                                <p className="text-sm text-gray-600 max-w-3xl mb-6 leading-relaxed">{storeInfo.description}</p>
                                
                                {/* Compact Quick Stats */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { value: storeInfo.stats.averageRating, label: 'Rating', extra: renderStars(storeInfo.stats.averageRating), icon: StarIcon },
                                        { value: `${storeInfo.stats.totalProducts}+`, label: 'Products', icon: PackageIcon },
                                        { value: `${storeInfo.stats.totalOrders}+`, label: 'Orders', icon: TrendingUpIcon },
                                        { value: `${storeInfo.stats.successfulDeliveries}%`, label: 'Success Rate', icon: AwardIcon }
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-white border border-[#F9EDCF] rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
                                            <div className="flex items-center justify-center mb-2">
                                                <stat.icon className="w-6 h-6 text-[#e50029] group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div className="text-xl font-black text-[#e50029] mb-1">{stat.value}</div>
                                            {stat.extra && <div className="flex justify-center mb-1">{stat.extra}</div>}
                                            <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Enhanced Navigation Tabs */}
            <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-[#F9EDCF] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-1 overflow-x-auto scrollbar-hide">
                        {[
                            { id: 'products', label: 'Products', icon: PackageIcon },
                            { id: 'about', label: 'About', icon: AwardIcon },
                            { id: 'reviews', label: 'Reviews', icon: StarIcon },
                            { id: 'policies', label: 'Policies', icon: ShieldCheckIcon },
                            { id: 'contact', label: 'Contact', icon: MessageCircleIcon }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-2 px-6 py-4 mx-1 rounded-t-2xl font-bold text-sm 
                                    whitespace-nowrap transition-all duration-300 relative group min-w-fit
                                    ${activeTab === tab.id
                                        ? 'bg-[#e50029] text-white shadow-lg transform -translate-y-1'
                                        : 'text-[#a41212] hover:text-[#e50029] hover:bg-[#FFF8E9]'
                                    }
                                `}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Enhanced Products Tab */}
                {activeTab === 'products' && (
                    <div>
                        {/* Product Header with Search & Filters */}
                        <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl p-8 mb-8 shadow-lg">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
                                <div>
                                    <h2 className="text-4xl font-black text-[#a41212] mb-2">Handloom Collection</h2>
                                    <p className="text-lg text-gray-600">Discover authentic handwoven textiles</p>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#e50029] text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#FFF8E9]'}`}
                                    >
                                        <GridIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#e50029] text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#FFF8E9]'}`}
                                    >
                                        <ListIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Handloom Category Filters */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {handloomCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                                            selectedCategory === category
                                                ? 'bg-gradient-to-r from-[#e50029] to-[#a41212] text-white shadow-lg scale-105'
                                                : 'bg-white border-2 border-[#F9EDCF] text-[#a41212] hover:border-[#e50029] hover:text-[#e50029]'
                                        }`}
                                    >
                                        {category === 'all' ? 'All Products' : category}
                                        <span className="ml-2 bg-white/20 text-xs px-2 py-0.5 rounded-full">
                                            {category === 'all' ? products.length : Math.floor(Math.random() * 20) + 5}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Search and Sort */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search handloom products..."
                                        className="w-full pl-12 pr-4 py-3 border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-xl outline-none transition-colors"
                                    />
                                </div>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-6 py-3 border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-xl bg-white text-[#a41212] outline-none font-semibold"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="newest">Newest First</option>
                                    <option value="rating">Best Rating</option>
                                </select>
                            </div>
                        </div>

                        {/* Enhanced Product Grid */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {filteredProducts.map((product, index) => (
                                    <div 
                                        key={product.id} 
                                        className="group relative bg-white border-2 border-[#F9EDCF] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            animation: 'fadeInUp 0.6s ease-out forwards'
                                        }}
                                    >
                                        {/* Large Product Image */}
                                        <div className="relative h-80 bg-[#F9EDCF] overflow-hidden">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                            
                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-[#e50029] text-white px-3 py-1 rounded-full text-xs font-bold">
                                                    Handloom
                                                </span>
                                            </div>

                                            {/* Quick Actions */}
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button className="bg-white hover:bg-[#e50029] hover:text-white text-[#a41212] p-2 rounded-full shadow-lg transition-colors duration-200 mb-2">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Enhanced Product Info */}
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-[#a41212] mb-2 line-clamp-2 group-hover:text-[#e50029] transition-colors">
                                                {product.name}
                                            </h3>
                                            
                                            {/* Rating */}
                                            <div className="flex items-center mb-3">
                                                <div className="flex">{renderStars(4.5)}</div>
                                                <span className="text-xs text-gray-500 ml-2">(4.5)</span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <span className="text-2xl font-bold text-[#e50029]">₹{product.price}</span>
                                                    <span className="text-sm text-gray-500 line-through ml-2">₹{(product.price * 1.3).toFixed(0)}</span>
                                                </div>
                                                <div className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                                                    23% OFF
                                                </div>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <button className="w-full bg-gradient-to-r from-[#e50029] to-[#a41212] hover:from-[#a41212] hover:to-[#e50029] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* List View */
                            <div className="space-y-6">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="bg-white border-2 border-[#F9EDCF] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <div className="flex gap-6">
                                            <div className="w-32 h-32 bg-[#F9EDCF] rounded-xl overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    width={128}
                                                    height={128}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-[#a41212] mb-2">{product.name}</h3>
                                                <div className="flex items-center mb-2">
                                                    <div className="flex mr-2">{renderStars(4.5)}</div>
                                                    <span className="text-sm text-gray-500">(4.5)</span>
                                                </div>
                                                <p className="text-gray-600 mb-4">High-quality handloom product crafted by skilled artisans...</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-2xl font-bold text-[#e50029]">₹{product.price}</span>
                                                        <span className="text-green-600 font-semibold">23% OFF</span>
                                                    </div>
                                                    <button className="bg-[#e50029] hover:bg-[#a41212] text-white font-bold px-6 py-2 rounded-lg transition-colors">
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Load More Button */}
                        <div className="text-center mt-12">
                            <button className="bg-white border-2 border-[#e50029] text-[#e50029] hover:bg-[#e50029] hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                                Load More Products
                            </button>
                        </div>
                    </div>
                )}

                {/* About Store Tab - Updated to handle missing contact info */}
                {activeTab === 'about' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Store Information */}
                            <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-8">
                                <h3 className="text-3xl font-black text-[#a41212] mb-6">About Our Store</h3>
                                <p className="text-gray-700 mb-8 leading-relaxed text-lg">{storeInfo.description}</p>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-[#FFF8E9] to-[#F9EDCF] border border-[#e50029] p-6 rounded-xl">
                                        <CalendarIcon className="w-8 h-8 text-[#e50029] mb-3" />
                                        <span className="text-sm font-bold text-[#a41212] uppercase tracking-wide block">Established</span>
                                        <p className="text-3xl font-black text-[#e50029] mt-1">{storeInfo.businessInfo.establishedYear}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#FFF8E9] to-[#F9EDCF] border border-[#e50029] p-6 rounded-xl">
                                        <TagIcon className="w-8 h-8 text-[#e50029] mb-3" />
                                        <span className="text-sm font-bold text-[#a41212] uppercase tracking-wide block">Business Type</span>
                                        <p className="text-xl font-black text-[#e50029] mt-1">{storeInfo.businessInfo.businessType}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Specialties */}
                            <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-8">
                                <h3 className="text-3xl font-black text-[#a41212] mb-6">Our Specialties</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {storeInfo.businessInfo.specialties.map((specialty, index) => (
                                        <div key={index} className="bg-gradient-to-r from-[#e50029] to-[#a41212] text-white p-4 rounded-xl font-bold text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            {specialty}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-8">
                                <h3 className="text-3xl font-black text-[#a41212] mb-6 flex items-center">
                                    <ClockIcon className="w-8 h-8 mr-4 text-[#e50029]" />
                                    Business Hours
                                </h3>
                                <div className="space-y-4">
                                    {Object.entries(storeInfo.businessHours).map(([day, hours]) => (
                                        <div key={day} className="flex justify-between items-center py-3 px-4 bg-[#FFF8E9] rounded-lg">
                                            <span className="capitalize font-bold text-[#a41212] text-lg">{day}</span>
                                            <span className="text-[#e50029] font-bold">{hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Location Info (Updated to handle missing contact details) */}
                            <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-black text-[#a41212] mb-6">Store Location</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <MapPinIcon className="w-6 h-6 text-[#e50029] mr-3 mt-1" />
                                        <div>
                                            <p className="font-bold text-[#a41212] mb-1">Location</p>
                                            <p className="text-gray-700">
                                                {storeInfo.address.city}, {storeInfo.address.state}
                                            </p>
                                            <p className="text-gray-700">{storeInfo.address.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Store Stats */}
                            <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-black text-[#a41212] mb-6">Store Statistics</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Total Sales', value: storeInfo.stats.totalSales },
                                        { label: 'Happy Customers', value: storeInfo.stats.totalCustomers },
                                        { label: 'Response Time', value: storeInfo.stats.responseTime },
                                        { label: 'Member Since', value: new Date(storeInfo.stats.joinedDate).getFullYear() }
                                    ].map((stat, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-[#FFF8E9] rounded-lg">
                                            <span className="text-sm font-bold text-gray-600">{stat.label}</span>
                                            <span className="font-black text-[#e50029] text-lg">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-black text-[#a41212] mb-6">Trust & Verification</h3>
                                <div className="space-y-3">
                                    {[
                                        { check: storeInfo.verification.isIdentityVerified, label: 'Identity Verified', icon: CheckCircleIcon },
                                        { check: storeInfo.verification.isBusinessVerified, label: 'Business Verified', icon: ShieldCheckIcon },
                                        { check: storeInfo.verification.isPhoneVerified, label: 'Phone Verified', icon: CheckCircleIcon }
                                    ].map((item, index) => (
                                        item.check && (
                                            <div key={index} className="flex items-center text-green-600 bg-green-50 border-2 border-green-200 p-4 rounded-xl">
                                                <item.icon className="w-6 h-6 mr-3" />
                                                <span className="font-bold">{item.label}</span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other tabs remain similar but with enhanced styling */}
                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-8">
                        <div className="text-center">
                            <StarIcon className="w-16 h-16 text-[#e50029] mx-auto mb-4" />
                            <h2 className="text-3xl font-black text-[#a41212] mb-4">Customer Reviews</h2>
                            <div className="flex items-center justify-center mb-4">
                                {renderStars(storeInfo.stats.averageRating)}
                                <span className="ml-3 text-3xl font-black text-[#e50029]">{storeInfo.stats.averageRating}</span>
                            </div>
                            <p className="text-lg text-gray-600 font-semibold mb-8">{storeInfo.stats.totalReviews} total reviews</p>
                            <div className="bg-[#FFF8E9] border-2 border-[#F9EDCF] p-8 rounded-xl">
                                <p className="text-[#a41212] font-bold text-lg">Reviews section coming soon...</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Policies Tab */}
                {activeTab === 'policies' && (
                    <div className="space-y-8">
                        <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-8">
                            <h3 className="text-3xl font-black text-[#a41212] mb-8 flex items-center">
                                <TruckIcon className="w-8 h-8 mr-4 text-[#e50029]" />
                                Shipping & Delivery
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: 'Domestic Shipping', value: storeInfo.shipping.domesticShipping },
                                    { title: 'International Shipping', value: storeInfo.shipping.internationalShipping },
                                    { title: 'Free Shipping', value: `On orders above ₹${storeInfo.shipping.freeShippingThreshold}` },
                                    { title: 'COD Available', value: storeInfo.shipping.codAvailable ? 'Yes' : 'No' }
                                ].map((item, index) => (
                                    <div key={index} className="bg-gradient-to-br from-[#FFF8E9] to-[#F9EDCF] border-2 border-[#e50029] p-6 rounded-xl">
                                        <p className="font-black text-[#a41212] mb-2 text-lg">{item.title}</p>
                                        <p className="text-[#e50029] font-bold">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-8">
                            <h3 className="text-3xl font-black text-[#a41212] mb-8">Store Policies</h3>
                            <div className="grid gap-6">
                                {Object.entries(storeInfo.policies).map(([key, value]) => (
                                    <div key={key} className="bg-[#FFF8E9] border-2 border-[#F9EDCF] p-6 rounded-xl">
                                        <p className="font-black text-[#a41212] mb-3 text-lg capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                        <p className="text-gray-700 leading-relaxed">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Tab - Updated to handle missing contact info */}
                {activeTab === 'contact' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-8">
                            <h3 className="text-3xl font-black text-[#a41212] mb-6">Send Message</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-black text-[#a41212] mb-2">Name</label>
                                    <input type="text" className="w-full border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-xl px-4 py-3 outline-none transition-colors bg-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-[#a41212] mb-2">Email</label>
                                    <input type="email" className="w-full border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-xl px-4 py-3 outline-none transition-colors bg-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-[#a41212] mb-2">Message</label>
                                    <textarea rows="5" className="w-full border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-xl px-4 py-3 outline-none transition-colors resize-none bg-white"></textarea>
                                </div>
                                <button className="w-full bg-gradient-to-r from-[#e50029] to-[#a41212] text-white font-black py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                                    Send Message
                                </button>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-[#F9EDCF] rounded-2xl shadow-lg p-8">
                            <h3 className="text-3xl font-black text-[#a41212] mb-6">Store Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <MapPinIcon className="w-8 h-8 text-[#e50029] mr-4 mt-1" />
                                    <div>
                                        <p className="font-black text-[#a41212] mb-2">Location</p>
                                        <p className="text-gray-700 leading-relaxed">{storeInfo.address.city}</p>
                                        <p className="text-gray-700">{storeInfo.address.state}, {storeInfo.address.country}</p>
                                    </div>
                                </div>
                                
                                <div className="bg-[#FFF8E9] border-2 border-[#F9EDCF] p-6 rounded-xl">
                                    <p className="text-[#a41212] font-bold text-center">
                                        For inquiries, please use the contact form or visit us at our location.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Animation Styles */}
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
                
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    ) : <Loading />
}
