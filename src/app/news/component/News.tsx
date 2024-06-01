'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { FaThList } from 'react-icons/fa'
import { FaEject } from 'react-icons/fa6'

const News = () => {


    return (
        <section className='bg-news bg-cover bg-bottom'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 pt-24 md:py-24'>

                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 '>
                        <div className='flex flex-col justify-center mx-2'>
                            <div className='text-5xl md:text-7xl font-black text-center md:text-start space-y-28 mb-5 text-based'>
                                {/* <h1>PT. Solusi <span className='text-based'>Nusantara</span> Berdikari</h1> */}
                                <h1>News SNB</h1>
                            </div>
                            <p></p>
                            <div className='text-justify text-white'>

                                <h5>Kami berdedikasi untuk merevolusi industri perawatan kesehatan. Platform kami dirancang untuk merampingkan operasi rumah sakit, meningkatkan perawatan pasien, dan mengoptimalkan efisiensi secara keseluruhan di dalam institusi perawatan kesehatan.</h5>
                            </div>
                            {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-20 my-'>
                                <Button className='h-16 sm:text-sm  md:text-md gap-5 bg-based'><FaEject /> Learn More</Button>
                                <Button className='h-16  sm:text-sm md:text-md gap-5'> <FaThList /> See Our Product</Button>
                            </div> */}
                        </div>
                        <div className=' bg-cover h-64 sm:h-[500px] md:h-[500px] my-5  md:my-0 mx-2 rounded-xl'>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default News