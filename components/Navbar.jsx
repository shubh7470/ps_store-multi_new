'use client'
import { 
    Search, ShoppingCart, Menu, X, MapPin, Bell, User, Store, Heart, ChevronDown,
    Shirt, Home, Baby, Gem, Palette, Users, Scissors, Crown,
    Package, Gift, Star, Flower2, Waves
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import logo from "../assets/logo.svg";

const Navbar = () => {
    const router = useRouter();
    const [search, setSearch] = useState('')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
    const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false)
    
    const cartCount = useSelector(state => state.cart.total)
    const wishlistCount = useSelector(state => state.wishlist?.total || 0)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    const handloomCategories = [
        { name: "Sarees", icon: Crown, href: "/category/sarees" },
        { name: "Suits & Kurtas", icon: Shirt, href: "/category/suits-kurtas" },
        { name: "Dupattas", icon: Flower2, href: "/category/dupattas" },
        { name: "Home Decor", icon: Home, href: "/category/home-decor" },
        { name: "Shawls", icon: Waves, href: "/category/shawls" },
        { name: "Fabrics", icon: Scissors, href: "/category/fabrics" },
        { name: "Men's Wear", icon: Users, href: "/category/mens-wear" },
        { name: "Kids Wear", icon: Baby, href: "/category/kids-wear" },
        { name: "Accessories", icon: Gem, href: "/category/accessories" },
        { name: "Handicrafts", icon: Palette, href: "/category/handicrafts" },
        { name: "Gift Sets", icon: Gift, href: "/category/gift-sets" },
        { name: "Premium", icon: Star, href: "/category/premium" }
    ]

    return (
        <div className="relative">
            <nav className="relative bg-[#FFF8E9] shadow-sm">
                {/* Top Bar */}
                <div className="bg-[#F9EDCF] border-b border-[#e50029]/20">
                    <div className="mx-6">
                        <div className="flex items-center justify-between max-w-7xl mx-auto py-2 text-sm text-[#a41212]">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    <span className="hidden sm:inline">Deliver to: Delhi 110001</span>
                                    <span className="sm:hidden">Delhi 110001</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="/become-seller" className="hidden md:flex items-center gap-1 hover:text-[#e50029] transition">
                                    <Store size={14} />
                                    Become a Weaver
                                </Link>
                                <Link href="/wholesale" className="hidden sm:block hover:text-[#e50029] transition">
                                    Wholesale
                                </Link>
                                <Link href="/help" className="hover:text-[#e50029] transition">
                                    Help & Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navbar */}
                <div className="mx-6">
                    <div className="flex items-center max-w-7xl mx-auto py-4">
                        
                        {/* Logo - Fixed width */}
                       <div className="flex-shrink-0 w-48">
                            <Link href="/" className="relative inline-block">
                                <Image 
                                    src={logo} 
                                    alt="PentadStyle Logo" 
                                    width={120} 
                                    height={56}
                                    className="h-12 w-auto"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Desktop Search Bar - Flexible width */}
                        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
                            <form onSubmit={handleSearch} className="flex items-center w-full">
                                <div className="relative w-full">
                                    <div className="flex items-center bg-white border-2 border-[#F9EDCF] focus-within:border-[#e50029] rounded-lg transition-colors shadow-sm">
                                        <input 
                                            className="flex-1 bg-transparent outline-none px-4 py-2.5 placeholder-slate-500 text-slate-700" 
                                            type="text" 
                                            placeholder="Search for sarees, suits, fabrics and more..." 
                                            value={search} 
                                            onChange={(e) => setSearch(e.target.value)} 
                                        />
                                        <button 
                                            type="submit"
                                            className="bg-[#e50029] hover:bg-[#ca2629] transition text-white px-5 py-2.5 rounded-r-lg"
                                        >
                                            <Search size={18} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Desktop Menu - Fixed width */}
                        <div className="hidden lg:flex items-center gap-6 text-slate-700 flex-shrink-0">
                            
                            {/* Categories Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                                    className="flex items-center gap-1 hover:text-[#e50029] transition py-2"
                                >
                                    Categories
                                    <ChevronDown size={16} className={`transition-transform ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isCategoriesDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#F9EDCF] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                                        {handloomCategories.slice(0, 8).map((category, index) => {
                                            const IconComponent = category.icon;
                                            return (
                                                <Link 
                                                    key={index}
                                                    href={category.href}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFF8E9] hover:text-[#e50029] transition border-b border-[#F9EDCF] last:border-b-0"
                                                    onClick={() => setIsCategoriesDropdownOpen(false)}
                                                >
                                                    <IconComponent size={18} />
                                                    {category.name}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            <Link href="/new-arrivals" className="hover:text-[#e50029] transition py-2">New Arrivals</Link>
                            <Link href="/sale" className="hover:text-[#e50029] transition py-2">Sale</Link>
                            
                            {/* Wishlist */}
                            <Link href="/wishlist" className="relative flex items-center gap-1 hover:text-[#e50029] transition py-2">
                                <Heart size={18} />
                                <span className="hidden xl:inline">Wishlist</span>
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 text-[10px] text-white bg-[#e50029] min-w-[16px] h-4 rounded-full flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link href="/cart" className="relative flex items-center gap-1 hover:text-[#e50029] transition py-2">
                                <ShoppingCart size={18} />
                                <span className="hidden xl:inline">Cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 text-[10px] text-white bg-[#e50029] min-w-[16px] h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Notifications */}
                            <button className="relative hover:text-[#e50029] transition py-2">
                                <Bell size={18} />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#e50029] rounded-full"></span>
                            </button>

                            {/* Account Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#e50029] hover:bg-[#ca2629] text-white rounded-full transition"
                                >
                                    <User size={16} />
                                    Login
                                    <ChevronDown size={14} className={`transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isAccountDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-[#F9EDCF] rounded-lg shadow-lg z-50">
                                        <Link href="/login" className="block px-4 py-3 hover:bg-[#FFF8E9] hover:text-[#e50029] transition border-b border-[#F9EDCF]">Login</Link>
                                        <Link href="/register" className="block px-4 py-3 hover:bg-[#FFF8E9] hover:text-[#e50029] transition border-b border-[#F9EDCF]">Sign Up</Link>
                                        <Link href="/profile" className="block px-4 py-3 hover:bg-[#FFF8E9] hover:text-[#e50029] transition border-b border-[#F9EDCF]">My Profile</Link>
                                        <Link href="/orders" className="block px-4 py-3 hover:bg-[#FFF8E9] hover:text-[#e50029] transition border-b border-[#F9EDCF]">My Orders</Link>
                                        <Link href="/become-seller" className="block px-4 py-3 hover:bg-[#FFF8E9] hover:text-[#e50029] transition" onClick={() => setIsAccountDropdownOpen(false)}>Become a Weaver</Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button & Icons */}
                        <div className="lg:hidden flex items-center gap-3 ml-auto">
                            <Link href="/search" className="p-2 hover:bg-[#F9EDCF] rounded-full transition">
                                <Search size={20} className="text-slate-600" />
                            </Link>
                            <Link href="/cart" className="relative p-2 hover:bg-[#F9EDCF] rounded-full transition">
                                <ShoppingCart size={20} className="text-slate-600" />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 text-[10px] text-white bg-[#e50029] min-w-[16px] h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 hover:bg-[#F9EDCF] rounded-full transition"
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-[#F9EDCF]">
                        <div className="mx-6 py-4 space-y-1">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="mb-4">
                                <div className="flex items-center bg-[#FFF8E9] border border-[#F9EDCF] rounded-lg">
                                    <input 
                                        className="flex-1 bg-transparent outline-none px-4 py-2.5 placeholder-slate-500 text-slate-700" 
                                        type="text" 
                                        placeholder="Search handloom products..." 
                                        value={search} 
                                        onChange={(e) => setSearch(e.target.value)} 
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-[#e50029] hover:bg-[#ca2629] transition text-white px-4 py-2.5 rounded-r-lg"
                                    >
                                        <Search size={16} />
                                    </button>
                                </div>
                            </form>
                            
                            <Link href="/" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">Home</Link>
                            <Link href="/categories" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">Categories</Link>
                            <Link href="/new-arrivals" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">New Arrivals</Link>
                            <Link href="/sale" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">Sale</Link>
                            <Link href="/wishlist" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">Wishlist</Link>
                            <Link href="/wholesale" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">Wholesale</Link>
                            <Link href="/become-seller" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">Become a Weaver</Link>
                            <hr className="my-2 border-[#F9EDCF]" />
                            <Link href="/login" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">Login</Link>
                            <Link href="/register" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">Sign Up</Link>
                            <Link href="/help" className="block py-3 text-slate-700 hover:text-[#e50029] hover:bg-[#FFF8E9] rounded-lg px-3 transition">Help & Support</Link>
                        </div>
                    </div>
                )}

                {/* Close dropdown when clicking outside */}
                {(isCategoriesDropdownOpen || isAccountDropdownOpen) && (
                    <div 
                        className="fixed inset-0 z-40"
                        onClick={() => {
                            setIsCategoriesDropdownOpen(false);
                            setIsAccountDropdownOpen(false);
                        }}
                    ></div>
                )}

                <hr className="border-[#F9EDCF]" />
            </nav>

            {/* Handloom Categories Section - Hidden on mobile when menu is open */}
            {!isMobileMenuOpen && (
                <div className="bg-white border-b border-[#F9EDCF] shadow-sm">
                    <div className="mx-6">
                        <div className="max-w-7xl mx-auto py-4">
                            <div className="flex items-center justify-center">
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 lg:gap-6">
                                    {handloomCategories.map((category, index) => {
                                        const IconComponent = category.icon;
                                        return (
                                            <Link 
                                                key={index}
                                                href={category.href}
                                                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[#FFF8E9] hover:text-[#e50029] transition group"
                                            >
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#F9EDCF] to-[#FFF8E9] group-hover:from-[#e50029] group-hover:to-[#ca2629] rounded-full flex items-center justify-center transition-all duration-300 shadow-sm">
                                                    <IconComponent size={22} className="text-[#a41212] group-hover:text-white transition-colors" />
                                                </div>
                                                <span className="text-xs text-center text-slate-600 group-hover:text-[#e50029] font-medium transition-colors leading-tight">
                                                    {category.name}
                                                </span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Handloom Regions */}
                    <div className="bg-gradient-to-r from-[#FFF8E9] to-[#F9EDCF] border-t border-[#F9EDCF]/50">
                        <div className="mx-6">
                            <div className="max-w-7xl mx-auto py-3">
                                <div className="flex items-center justify-center gap-6 text-sm text-[#a41212]">
                                    <span className="font-semibold">Featured Regions:</span>
                                    <Link href="/region/banarasi" className="hover:text-[#e50029] transition">Banarasi</Link>
                                    <Link href="/region/kanjeevaram" className="hover:text-[#e50029] transition">Kanjeevaram</Link>
                                    <Link href="/region/chanderi" className="hover:text-[#e50029] transition">Chanderi</Link>
                                    <Link href="/region/tussar" className="hover:text-[#e50029] transition">Tussar</Link>
                                    <Link href="/region/maheshwari" className="hover:text-[#e50029] transition">Maheshwari</Link>
                                    <Link href="/region/pochampally" className="hover:text-[#e50029] transition">Pochampally</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
