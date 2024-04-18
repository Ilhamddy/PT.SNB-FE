import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaThList } from 'react-icons/fa'
import { FaEject } from 'react-icons/fa6'

const Services = () => {
    return (
        <section className='bg-third bg-cover dark:bg-dope'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-24 md:py-10'>
                <div className='md:mx-10 sm:mx-10 md:py-12'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 '>
                        <div className='flex flex-col justify-center mx-2'
                            data-aos="fade-up"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false">
                            <div className='text-5xl md:text-7xl font-black text-center md:text-start '>
                                <h1><span className='text-based1'>Membuka Propedrity </span>, Pilihlah Pengalaman Profesional </h1>
                            </div>
                            <p></p>
                            {/* <div className='text-justify'>
                                <h5>We are dedicated to revolutionizing the healthcare industry Our platform is designed to streamline hospital operations, enhance patient care, and optimize overall efficiency within healthcare institutions.</h5>
                            </div> */}
                        </div>
                        <div className='flex flex-col justify-center mx-2 md:px-5'>
                            <div className='text-justify my-5'>
                                <h5>Komitmen kami terhadap pengembangan solusi IT yang terdepan dalam industri kesehatan merupakan inti dari identitas kami. Dengan keahlian yang luas dan pengalaman yang mendalam, kami mampu menyajikan solusi yang efektif dan efisien bagi lembaga kesehatan dan organisasi terkait.</h5>
                            </div>
                            <div className='grid place-content-center md:flex flex-row gap-5 my-5'>
                                <Link href={'#detail'}>
                                    <Button className='h-16 w-[200px] sm:text-sm  md:text-md gap-5 bg-based1'><FaEject /> Tentang kami</Button>
                                </Link>

                                <Link href={'/product'}>
                                    <Button className='h-16 w-[200px] sm:text-sm md:text-md gap-5'> <FaThList /> Produk Kami</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 py-5 h-[900px] md:h-[400px]'>
                        <div className='col-span-3 bg-about2 bg-cover bg-center justify-center mx-2 rounded-xl '>
                        </div>
                        <div className='flex flex-col mx-2 my-5 md:my-0 '>
                            <div className=' h-full bg-about bg-cover bg-center rounded-xl'>
                                {/* <Image width={1000} height={700} alt='service snb' quality={100} src={'/image/bgabout.jpg'} className='object-cover' /> */}
                            </div>
                            <div className='p-2 text-justify text-sm'>Kami bangga menjadi mitra strategis bagi lembaga kesehatan di seluruh Nusantara, membantu mereka menavigasi perubahan teknologi dan mendukung misi mereka untuk memberikan pelayanan kesehatan yang berkualitas tinggi kepada masyarakat.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Services