'use client'
import { baseUrl } from '@/app/utils/databases';
import axios from 'axios';
import { useEffect, useState } from 'react';


const About = () => {

    return (
        <section className='bg-aboutpro dark:bg-about bg-cover bg-center'>
            <div className='h-screen bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10  pt-24 md:pt-64 text-white'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 md:py-10  '>
                        <div className='flex flex-col justify-center mx-2'>
                            <div className='md:text-justify text-center'>
                                <h5>Kami berdedikasi untuk merevolusi industri kesehatan.</h5>
                            </div>
                            <div className='text-6xl my-5  md:text-8xl font-black text-center md:text-start space-y-28 mb-5'>
                                {/* <h1>PT. Solusi <span className='text-based'>Nusantara</span> Berdikari</h1> */}
                                <div>
                                    <h1>Solusi <span className='text-based'>Innovatif</span> </h1>
                                    <h1> healthcare.</h1>
                                    {/* {news.map((data, index) => {
                                        return (
                                            <div key={data}>
                                                <h1>{data.title}</h1>
                                            </div>
                                        )
                                    })} */}
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

export default About