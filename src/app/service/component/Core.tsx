import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { dataAdvantages, dataService } from '@/hooks/dataNavbar'
import { FaArrowUpRightDots } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'


const Core = () => {

    return (
        <section className=' dark:bg-white bg-hero-pattern' id='detail'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 '>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10  dark:text-dope '>
                        <div className='text-2xl md:text-4xl font-black text-center md:text-start '>
                            <h1>Kami Berkolaborasi di Berbagai Industri Kesehatan</h1>
                        </div>
                        <div className='text-sm text-justify mx-2'>PT Solusi Nusantara Berdikari menyediakan beragam layanan terkait solusi teknologi informasi untuk industri kesehatan. Berikut adalah beberapa layanan utama yang ditawarkan oleh perusahaan: </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 '>
                        {dataService.map((data) => {
                            return (
                                <Card className='m-5  grid grid-cols-1 justify-center text-justify rounded-2xl' data-aos="fade-left"
                                    data-aos-offset="200"
                                    data-aos-delay="50"
                                    data-aos-duration="1000"
                                    data-aos-easing="ease-in-out"
                                    data-aos-mirror="true"
                                    data-aos-once="false">
                                    <CardHeader>
                                        <CardDescription>
                                            <data.icon size={60} color='orange' />
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='text-xl font-black '>
                                        <p>{data.title}</p>
                                    </CardContent>
                                    <CardFooter className='grid grid-cols-1'>
                                        <p className='text-sm'>{data.description}</p>
                                        <div className='flex justify-between items-center mt-2 border rounded-full p-2 text-sm'>
                                            Click Here
                                            <Button className='rounded-full '>
                                                <FaArrowUpRightDots />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Core