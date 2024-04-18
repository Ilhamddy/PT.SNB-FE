import { Button } from '@/components/ui/button'
import React from 'react'
import { FaThList } from 'react-icons/fa'
import { FaEject } from 'react-icons/fa6'

const Product = () => {
    return (
        <section className='bg-product bg-center bg-cover' >
            <div className='h-screen bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 py-10 md:py-24 pt-24 md:pt-64'>

                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 md:py-10  '>
                        <div className='flex flex-col justify-center mx-2 text-white'>
                            <div className='md:text-end text-center'>
                                <h5>Kami berdedikasi untuk merevolusi industri kesehatan.</h5>

                            </div>
                            <div className='text-6xl my-5  md:text-8xl font-black text-center md:text-end space-y-28 mb-5'>
                                <div>
                                    <h1>SNB  <span className='text-based'>Solusi</span> </h1>
                                    <h1> Healthcare Anda.</h1>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 px-5 mt-20 my-'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Product