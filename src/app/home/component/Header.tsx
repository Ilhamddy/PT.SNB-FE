'use client'
import { Button } from '@/components/ui/button'
import { FaThList } from 'react-icons/fa'
import { FaEject } from 'react-icons/fa6'
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from 'react'
import Link from 'next/link';

const Header = () => {
    useEffect(() => {
        AOS.init(
            {
                once: true,
                duration: 1800,
            }
        );
        AOS.refresh();
    }, []);
    return (
        <header className='bg-about dark:bg-aboutpro bg-cover bg-center ' >
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3  py-28'>
                <div className='md:mx-10 sm:mx-10  '>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 '>
                        <div className='flex flex-col justify-center mx-2 text-white' data-aos="fade-left"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false">
                            <div className='text-3xl md:text-6xl font-black text-center md:text-start space-y-28 mb-5  dark:text-dope '>
                                <h1>PT. Solusi <span className='text-based '>Nusantara</span> Berdikari</h1>
                            </div>
                            <p></p>
                            <div className='text-justify dark:text-dope'>
                                <h5>PT Solusi Nusantara Berdikari adalah pelopor dalam penyediaan solusi teknologi informasi yang berfokus pada industri kesehatan. Didirikan dengan semangat yang tak tergoyahkan oleh sekelompok konsultan ahli profesional yang telah mengakar dalam industri kesehatan selama lebih dari 30 tahun, kami menjelma sebagai kekuatan terkemuka dalam membawa inovasi teknologi ke ranah kesehatan.</h5>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 px-5 mt-20 my-'>
                                <Link href='#detail'>
                                    <Button className=' w-full h-16 sm:text-sm  md:text-md gap-5 bg-based1'><FaEject /> Tentang kami</Button>
                                </Link>
                                <Link href="/product">
                                    <Button className='h-16 w-full  sm:text-sm md:text-md gap-5'> <FaThList /> Produk Kami</Button>
                                </Link>
                            </div>
                        </div>
                        <div className='bg- bg-cover h-0 sm:h-[500px] md:h-[500px] my-5  md:my-0 mx-2 rounded-xl ' data-aos="fade-up"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false"
                        >
                        </div>
                    </div>

                </div>
            </div>
        </header >
    )
}

export default Header