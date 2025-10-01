import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {

    return (
        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group my-10 sm:my-20 bg-[#FFF8E9] py-4">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#FFF8E9] to-transparent" />
            <div className="flex min-w-[200%] animate-[marqueeScroll_20s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4">
                {[...categories, ...categories, ...categories, ...categories].map((category, index) => (
                    <button 
                        key={index} 
                        className="px-6 py-2 bg-white border border-[#F9EDCF] rounded-full text-[#a41212] text-sm sm:text-base font-medium hover:bg-[#e50029] hover:text-white hover:border-transparent active:scale-95 transition-all duration-300 shadow-sm whitespace-nowrap"
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#FFF8E9] to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;
