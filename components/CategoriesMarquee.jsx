import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {

    return (
        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group my-8 bg-gradient-to-r from-[#FFF8E9] via-white to-[#FFF8E9] py-6 rounded-2xl border-2 border-[#F9EDCF] shadow-lg">
            {/* Left Gradient Fade */}
            <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-[#FFF8E9] via-[#FFF8E9]/50 to-transparent" />
            
            {/* Scrolling Categories */}
            <div className="flex min-w-[200%] animate-[marqueeScroll_25s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-3 sm:gap-4">
                {[...categories, ...categories, ...categories, ...categories].map((category, index) => (
                    <button 
                        key={index} 
                        className="px-5 py-2.5 bg-white border-2 border-[#F9EDCF] rounded-full text-[#a41212] text-sm sm:text-base font-semibold hover:bg-gradient-to-r hover:from-[#e50029] hover:to-[#a41212] hover:text-white hover:border-transparent hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md whitespace-nowrap"
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            {/* Right Gradient Fade */}
            <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-[#FFF8E9] via-[#FFF8E9]/50 to-transparent" />
            
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#e50029]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#a41212]/5 rounded-full blur-3xl"></div>
        </div>
    );
};

export default CategoriesMarquee;
