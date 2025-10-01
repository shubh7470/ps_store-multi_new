'use client'
import React from 'react'
import toast from 'react-hot-toast';

export default function Banner() {
    const [isOpen, setIsOpen] = React.useState(true);

    const handleClaim = () => {
        setIsOpen(false);
        // Copy the coupon code to the clipboard
        navigator.clipboard.writeText('HANDLOOM20').then(() => {
            toast.success('Coupon "HANDLOOM20" copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            toast.error('Could not copy coupon.');
        });
    };

    // Return null if the banner is closed
    if (!isOpen) {
        return null;
    }

    return (
        <div className="w-full px-6 py-2 font-medium text-sm text-white text-center bg-gradient-to-r from-[#e50029] via-[#ca2629] to-[#a41212]">
            <div className='flex items-center justify-between max-w-7xl mx-auto'>
                <p className='text-xs sm:text-sm'>
                    <span className='font-bold hidden sm:inline'>Welcome!</span> Enjoy 20% OFF your first handloom purchase. Use code: <span className='font-bold'>HANDLOOM20</span>
                </p>
                <div className="flex items-center space-x-4 sm:space-x-6">
                    <button 
                        onClick={handleClaim} 
                        type="button" 
                        className="font-semibold text-[#a41212] bg-[#FFF8E9] hover:bg-white px-4 sm:px-6 py-1.5 rounded-full transition-colors duration-300 max-sm:hidden"
                    >
                        Copy Code
                    </button>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        type="button" 
                        className="font-normal text-white py-2 rounded-full hover:bg-black/10 p-1 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="1.48486" x="0" width="17.498" height="2.1" rx="1.05" transform="rotate(-45 0 1.48486)" fill="#fff" />
                            <rect x="1.48535" y="13.9141" width="17.498" height="2.1" rx="1.05" transform="rotate(-135 1.48535 13.9141)" fill="#fff" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
