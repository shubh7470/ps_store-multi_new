import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {
    return (
        <div className='px-6 my-20 max-w-6xl mx-auto'>
            <Title 
                visibleButton={false} 
                title='Why Choose HandloomCart?' 
                description="We are committed to authenticity, quality, and the celebration of craftsmanship, ensuring every piece tells a story of tradition and dedication." 
            />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 mt-16'>
                {ourSpecsData.map((spec, index) => (
                    <div 
                        key={index} 
                        className='relative h-48 px-6 flex flex-col items-center justify-center w-full text-center border-2 border-[#F9EDCF] bg-[#FFF8E9] rounded-xl group hover:shadow-lg hover:-translate-y-2 transition-all duration-300'
                    >
                        <div 
                            className='absolute -top-6 text-white w-12 h-12 flex items-center justify-center rounded-full group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-[#e50029] to-[#ca2629] shadow-md'
                        >
                            <spec.icon size={24} />
                        </div>
                        <h3 className='text-[#a41212] font-semibold text-lg mt-4'>{spec.title}</h3>
                        <p className='text-sm text-slate-600 mt-2'>{spec.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OurSpecs
