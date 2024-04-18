import { Button } from '@/components/ui/button'
import React from 'react'

const Detail = () => {
    return (
        <section className='bg-about bg-cover bg-center'>
            <div className='h-screen bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 '>
                    <div className='md:mx-10 sm:mx-10  pt-24 md:pt-64 text-white'>
                        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 md:py-10  '>
                            <div className='flex flex-col justify-center mx-2'>
                                <div className='md:text-justify text-center'>
                                    <h5>We are dedicated to revolutionizing the healthcare industry.</h5>
                                </div>
                                <div className='text-4xl my-5  md:text-7xl font-black text-center md:text-start  mb-5'>
                                    {/* <h1>PT. Solusi <span className='text-based'>Nusantara</span> Berdikari</h1> */}
                                    <div>
                                        <h1>Elektronik Klinik </h1>
                                        <h1><span className='text-based'>E-Klinik</span> </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    )
}

export default Detail