'use client'
import ProductCard from "@/components/ProductCard"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { 
    MailIcon, 
    MapPinIcon, 
    PhoneIcon, 
    GlobeIcon,
    ClockIcon,
    StarIcon,
    ShieldCheckIcon,
    TruckIcon,
    MessageCircleIcon,
    CalendarIcon,
    UsersIcon,
    PackageIcon,
    AwardIcon,
    CheckCircleIcon,
    BadgeCheckIcon
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

    return !loading ? (
        <div className="min-h-screen bg-[#FFF8E9]">
            {/* Store Hero Banner */}
            {storeInfo && (
                <div className="relative bg-white border-b border-[#F9EDCF]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            {/* Store Logo */}
                            <div className="relative">
                                <div className="p-2 bg-[#FFF8E9] border-2 border-[#F9EDCF] rounded-2xl">
                                    <Image
                                        src={storeInfo.media.logo}
                                        alt={storeInfo.name}
                                        className="w-36 h-36 object-cover border-4 border-white rounded-xl shadow-lg"
                                        width={144}
                                        height={144}
                                    />
                                </div>
                                {storeInfo.verification.isVerified && (
                                    <div className="absolute -bottom-3 -right-3 bg-white border-2 border-[#e50029] rounded-full p-2 shadow-lg">
                                        <BadgeCheckIcon className="w-8 h-8 text-[#e50029]" />
                                    </div>
                                )}
                            </div>

                            {/* Store Info */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-[#a41212]">{storeInfo.name}</h1>
                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {storeInfo.verification.verificationBadges.map((badge, index) => (
                                            <span key={index} className="bg-[#FFF8E9] border border-[#F9EDCF] text-[#a41212] px-4 py-2 rounded-full text-sm font-semibold">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <p className="text-xl lg:text-2xl text-[#a41212] mb-4 font-medium">{storeInfo.tagline}</p>
                                <p className="text-lg text-gray-600 max-w-3xl mb-8 leading-relaxed">{storeInfo.description}</p>
                                
                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="text-center bg-white border border-[#F9EDCF] rounded-xl p-4 shadow-sm">
                                        <div className="text-3xl font-bold text-[#e50029]">{storeInfo.stats.averageRating}</div>
                                        <div className="flex justify-center mb-2">{renderStars(storeInfo.stats.averageRating)}</div>
                                        <div className="text-sm text-gray-600 font-medium">{storeInfo.stats.totalReviews} Reviews</div>
                                    </div>
                                    <div className="text-center bg-white border border-[#F9EDCF] rounded-xl p-4 shadow-sm">
                                        <div className="text-3xl font-bold text-[#e50029]">{storeInfo.stats.totalProducts}+</div>
                                        <div className="text-sm text-gray-600 font-medium">Products</div>
                                    </div>
                                    <div className="text-center bg-white border border-[#F9EDCF] rounded-xl p-4 shadow-sm">
                                        <div className="text-3xl font-bold text-[#e50029]">{storeInfo.stats.totalOrders}+</div>
                                        <div className="text-sm text-gray-600 font-medium">Orders</div>
                                    </div>
                                    <div className="text-center bg-white border border-[#F9EDCF] rounded-xl p-4 shadow-sm">
                                        <div className="text-3xl font-bold text-[#e50029]">{storeInfo.stats.successfulDeliveries}%</div>
                                        <div className="text-sm text-gray-600 font-medium">Success Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="bg-white shadow-sm border-b border-[#F9EDCF] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8 overflow-x-auto">
                        {[
                            { id: 'products', label: 'Products', icon: PackageIcon },
                            { id: 'about', label: 'About Store', icon: GlobeIcon },
                            { id: 'reviews', label: 'Reviews', icon: StarIcon },
                            { id: 'policies', label: 'Policies', icon: ShieldCheckIcon },
                            { id: 'contact', label: 'Contact', icon: MessageCircleIcon }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 px-2 border-b-3 font-semibold text-sm whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-[#e50029] text-[#e50029]'
                                        : 'border-transparent text-[#a41212] hover:text-[#e50029] hover:border-[#e50029]/30'
                                }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h2 className="text-3xl font-bold text-[#a41212]">Store Products</h2>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                <select className="border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-lg px-4 py-2 text-sm bg-white text-[#a41212] outline-none">
                                    <option>All Categories</option>
                                    {storeInfo.businessInfo.specialties.map((specialty, index) => (
                                        <option key={index}>{specialty}</option>
                                    ))}
                                </select>
                                <select className="border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-lg px-4 py-2 text-sm bg-white text-[#a41212] outline-none">
                                    <option>Sort by: Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest First</option>
                                    <option>Best Rating</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}

                {/* About Store Tab */}
                {activeTab === 'about' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Store Information */}
                            <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-8">
                                <h3 className="text-2xl font-bold text-[#a41212] mb-6">About Our Store</h3>
                                <p className="text-gray-700 mb-8 leading-relaxed text-lg">{storeInfo.description}</p>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-[#FFF8E9] border border-[#F9EDCF] p-4 rounded-xl">
                                        <span className="text-sm font-semibold text-[#a41212] uppercase tracking-wide">Established</span>
                                        <p className="text-2xl font-bold text-[#e50029] mt-1">{storeInfo.businessInfo.establishedYear}</p>
                                    </div>
                                    <div className="bg-[#FFF8E9] border border-[#F9EDCF] p-4 rounded-xl">
                                        <span className="text-sm font-semibold text-[#a41212] uppercase tracking-wide">Business Type</span>
                                        <p className="text-2xl font-bold text-[#e50029] mt-1">{storeInfo.businessInfo.businessType}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Specialties */}
                            <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-8">
                                <h3 className="text-2xl font-bold text-[#a41212] mb-6">Our Specialties</h3>
                                <div className="flex flex-wrap gap-3">
                                    {storeInfo.businessInfo.specialties.map((specialty, index) => (
                                        <span key={index} className="bg-white border-2 border-[#e50029] text-[#e50029] px-4 py-2 rounded-full text-sm font-semibold">
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-8">
                                <h3 className="text-2xl font-bold text-[#a41212] mb-6 flex items-center">
                                    <ClockIcon className="w-6 h-6 mr-3 text-[#e50029]" />
                                    Business Hours
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(storeInfo.businessHours).map(([day, hours]) => (
                                        <div key={day} className="flex justify-between items-center py-2 border-b border-[#F9EDCF] last:border-b-0">
                                            <span className="capitalize font-semibold text-[#a41212]">{day}</span>
                                            <span className="text-gray-600 font-medium">{hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Contact Info */}
                            <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-6">
                                <h3 className="text-xl font-bold text-[#a41212] mb-6">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <MapPinIcon className="w-5 h-5 text-[#e50029] mr-3 mt-1" />
                                        <span className="text-sm text-gray-700 leading-relaxed">{storeInfo.address.street}, {storeInfo.address.city}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <PhoneIcon className="w-5 h-5 text-[#e50029] mr-3" />
                                        <span className="text-sm text-gray-700">{storeInfo.phone}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MailIcon className="w-5 h-5 text-[#e50029] mr-3" />
                                        <span className="text-sm text-gray-700">{storeInfo.email}</span>
                                    </div>
                                    {storeInfo.website && (
                                        <div className="flex items-center">
                                            <GlobeIcon className="w-5 h-5 text-[#e50029] mr-3" />
                                            <span className="text-sm text-gray-700">{storeInfo.website}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Store Stats */}
                            <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-6">
                                <h3 className="text-xl font-bold text-[#a41212] mb-6">Store Statistics</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Total Sales</span>
                                        <span className="font-bold text-[#e50029]">{storeInfo.stats.totalSales}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Happy Customers</span>
                                        <span className="font-bold text-[#e50029]">{storeInfo.stats.totalCustomers}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Response Time</span>
                                        <span className="font-bold text-[#e50029]">{storeInfo.stats.responseTime}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Member Since</span>
                                        <span className="font-bold text-[#e50029]">{new Date(storeInfo.stats.joinedDate).getFullYear()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-6">
                                <h3 className="text-xl font-bold text-[#a41212] mb-6">Trust & Safety</h3>
                                <div className="space-y-3">
                                    {storeInfo.verification.isIdentityVerified && (
                                        <div className="flex items-center text-green-600 border border-green-200 bg-white p-3 rounded-lg">
                                            <CheckCircleIcon className="w-5 h-5 mr-3" />
                                            <span className="text-sm font-medium">Identity Verified</span>
                                        </div>
                                    )}
                                    {storeInfo.verification.isBusinessVerified && (
                                        <div className="flex items-center text-green-600 border border-green-200 bg-white p-3 rounded-lg">
                                            <ShieldCheckIcon className="w-5 h-5 mr-3" />
                                            <span className="text-sm font-medium">Business Verified</span>
                                        </div>
                                    )}
                                    {storeInfo.verification.isPhoneVerified && (
                                        <div className="flex items-center text-green-600 border border-green-200 bg-white p-3 rounded-lg">
                                            <PhoneIcon className="w-5 h-5 mr-3" />
                                            <span className="text-sm font-medium">Phone Verified</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <h2 className="text-3xl font-bold text-[#a41212]">Customer Reviews</h2>
                            <div className="text-center md:text-right">
                                <div className="flex items-center justify-center md:justify-end mb-2">
                                    {renderStars(storeInfo.stats.averageRating)}
                                    <span className="ml-3 text-2xl font-bold text-[#e50029]">{storeInfo.stats.averageRating}</span>
                                </div>
                                <p className="text-sm text-gray-600 font-medium">{storeInfo.stats.totalReviews} total reviews</p>
                            </div>
                        </div>
                        <div className="border border-[#F9EDCF] bg-white p-6 rounded-xl">
                            <p className="text-[#a41212] text-center font-medium">Reviews section coming soon...</p>
                        </div>
                    </div>
                )}

                {/* Policies Tab */}
                {activeTab === 'policies' && (
                    <div className="grid gap-8">
                        <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-8">
                            <h3 className="text-2xl font-bold text-[#a41212] mb-6 flex items-center">
                                <TruckIcon className="w-6 h-6 mr-3 text-[#e50029]" />
                                Shipping & Delivery
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                                <div className="border border-[#F9EDCF] bg-white p-4 rounded-xl">
                                    <p className="font-semibold text-[#a41212] mb-2">Domestic Shipping</p>
                                    <p>{storeInfo.shipping.domesticShipping}</p>
                                </div>
                                <div className="border border-[#F9EDCF] bg-white p-4 rounded-xl">
                                    <p className="font-semibold text-[#a41212] mb-2">International Shipping</p>
                                    <p>{storeInfo.shipping.internationalShipping}</p>
                                </div>
                                <div className="border border-[#F9EDCF] bg-white p-4 rounded-xl">
                                    <p className="font-semibold text-[#a41212] mb-2">Free Shipping</p>
                                    <p>On orders above ₹{storeInfo.shipping.freeShippingThreshold}</p>
                                </div>
                                <div className="border border-[#F9EDCF] bg-white p-4 rounded-xl">
                                    <p className="font-semibold text-[#a41212] mb-2">COD Available</p>
                                    <p>{storeInfo.shipping.codAvailable ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-8">
                            <h3 className="text-2xl font-bold text-[#a41212] mb-6">Store Policies</h3>
                            <div className="grid gap-6 text-gray-700">
                                <div className="border border-[#F9EDCF] bg-white p-6 rounded-xl">
                                    <p className="font-semibold text-[#a41212] mb-3">Return Policy</p>
                                    <p className="leading-relaxed">{storeInfo.policies.returnPolicy}</p>
                                </div>
                                <div className="border border-[#F9EDCF] bg-white p-6 rounded-xl">
                                    <p className="font-semibold text-[#a41212] mb-3">Refund Policy</p>
                                    <p className="leading-relaxed">{storeInfo.policies.refundPolicy}</p>
                                </div>
                                <div className="border border-[#F9EDCF] bg-white p-6 rounded-xl">
                                    <p className="font-semibold text-[#a41212] mb-3">Exchange Policy</p>
                                    <p className="leading-relaxed">{storeInfo.policies.exchangePolicy}</p>
                                </div>
                                <div className="border border-[#F9EDCF] bg-white p-6 rounded-xl">
                                    <p className="font-semibold text-[#a41212] mb-3">Warranty</p>
                                    <p className="leading-relaxed">{storeInfo.policies.warrantyInfo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-8">
                            <h3 className="text-2xl font-bold text-[#a41212] mb-6">Get in Touch</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[#a41212] mb-2">Name</label>
                                    <input type="text" className="w-full border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-lg px-4 py-3 outline-none transition-colors bg-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#a41212] mb-2">Email</label>
                                    <input type="email" className="w-full border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-lg px-4 py-3 outline-none transition-colors bg-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#a41212] mb-2">Message</label>
                                    <textarea rows="5" className="w-full border-2 border-[#F9EDCF] focus:border-[#e50029] rounded-lg px-4 py-3 outline-none transition-colors resize-none bg-white"></textarea>
                                </div>
                                <button className="w-full bg-[#e50029] hover:bg-[#ca2629] text-white font-semibold py-4 px-6 rounded-lg transition-colors">
                                    Send Message
                                </button>
                            </div>
                        </div>

                        <div className="bg-white border border-[#F9EDCF] rounded-2xl shadow-sm p-8">
                            <h3 className="text-2xl font-bold text-[#a41212] mb-6">Contact Details</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <MapPinIcon className="w-6 h-6 text-[#e50029] mr-4 mt-1" />
                                    <div>
                                        <p className="font-semibold text-[#a41212] mb-1">Address</p>
                                        <p className="text-gray-700 leading-relaxed">{storeInfo.address.street}</p>
                                        <p className="text-gray-700">{storeInfo.address.city}, {storeInfo.address.state} {storeInfo.address.zipCode}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <PhoneIcon className="w-6 h-6 text-[#e50029] mr-4" />
                                    <div>
                                        <p className="font-semibold text-[#a41212] mb-1">Phone</p>
                                        <p className="text-gray-700">{storeInfo.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <MailIcon className="w-6 h-6 text-[#e50029] mr-4" />
                                    <div>
                                        <p className="font-semibold text-[#a41212] mb-1">Email</p>
                                        <p className="text-gray-700">{storeInfo.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="mt-8">
                                <h4 className="font-semibold text-[#a41212] mb-4">Follow Us</h4>
                                <div className="flex flex-wrap gap-3">
                                    {Object.entries(storeInfo.socialMedia).map(([platform, url]) => (
                                        <a key={platform} href={url} className="border border-[#F9EDCF] hover:border-[#e50029] hover:text-[#e50029] bg-white text-[#a41212] px-4 py-2 rounded-lg transition-colors font-medium">
                                            <span className="capitalize">{platform}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : <Loading />
}
