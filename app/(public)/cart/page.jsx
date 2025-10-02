'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Trash2Icon, ShoppingBagIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';
    
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);

    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        setTotalPrice(0);
        const cartArray = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                cartArray.push({
                    ...product,
                    quantity: value,
                });
                setTotalPrice(prev => prev + product.price * value);
            }
        }
        setCartArray(cartArray);
    }

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({ productId }))
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    return cartArray.length > 0 ? (
        <div className="min-h-screen bg-[#FFF8E9] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="mb-8">
                    <PageTitle heading="Shopping Cart" text="Review your selected items" linkText="Continue Shopping" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl border border-[#F9EDCF] shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="bg-[#F9EDCF] px-6 py-4 border-b border-[#F9EDCF]">
                                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-[#a41212] uppercase tracking-wide">
                                    <div className="col-span-6 sm:col-span-5">Product</div>
                                    <div className="col-span-3 sm:col-span-2 text-center">Quantity</div>
                                    <div className="col-span-2 sm:col-span-2 text-center">Price</div>
                                    <div className="col-span-1 sm:col-span-3 text-center">Total</div>
                                    <div className="hidden sm:block sm:col-span-0"></div>
                                </div>
                            </div>

                            {/* Cart Items */}
                            <div className="divide-y divide-[#F9EDCF]">
                                {cartArray.map((item, index) => (
                                    <div key={index} className="p-6">
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            {/* Product Info */}
                                            <div className="col-span-6 sm:col-span-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#F9EDCF] rounded-xl overflow-hidden flex-shrink-0">
                                                        <Image 
                                                            src={item.images[0]} 
                                                            className="w-full h-full object-cover" 
                                                            alt={item.name}
                                                            width={80} 
                                                            height={80} 
                                                        />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-semibold text-[#a41212] text-sm sm:text-base line-clamp-2">
                                                            {item.name}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                                                        <p className="text-sm font-medium text-[#e50029] mt-1">
                                                            {currency}{item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quantity */}
                                            <div className="col-span-3 sm:col-span-2 flex justify-center">
                                                <Counter productId={item.id} />
                                            </div>

                                            {/* Unit Price */}
                                            <div className="col-span-2 sm:col-span-2 text-center">
                                                <p className="font-semibold text-[#a41212] text-sm sm:text-base">
                                                    {currency}{item.price}
                                                </p>
                                            </div>

                                            {/* Total Price */}
                                            <div className="col-span-1 sm:col-span-2 text-center">
                                                <p className="font-bold text-[#e50029] text-sm sm:text-lg">
                                                    {currency}{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>

                                            {/* Delete Button */}
                                            <div className="col-span-12 sm:col-span-1 flex justify-center sm:justify-end mt-4 sm:mt-0">
                                                <button 
                                                    onClick={() => handleDeleteItemFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-200 group"
                                                    title="Remove item"
                                                >
                                                    <Trash2Icon size={18} className="group-hover:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="bg-[#F9EDCF] px-6 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <p className="text-sm text-[#a41212]">
                                        {cartArray.length} item{cartArray.length > 1 ? 's' : ''} in your cart
                                    </p>
                                    <Link 
                                        href="/shop" 
                                        className="inline-flex items-center gap-2 text-[#e50029] hover:text-[#ca2629] font-medium text-sm transition-colors"
                                    >
                                        Continue Shopping
                                        <ArrowRightIcon size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <OrderSummary totalPrice={totalPrice} items={cartArray} />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen bg-[#FFF8E9] flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-[#F9EDCF] rounded-full flex items-center justify-center">
                    <ShoppingBagIcon size={40} className="text-[#a41212]" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#a41212] mb-4">
                    Your Cart is Empty
                </h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Looks like you haven't added any handloom products to your cart yet. 
                    Discover our beautiful collection of authentic handwoven textiles.
                </p>
                <Link 
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-[#e50029] hover:bg-[#ca2629] text-white font-semibold px-8 py-3 rounded-full transition-colors"
                >
                    <ShoppingBagIcon size={20} />
                    Start Shopping
                </Link>
            </div>
        </div>
    )
}
