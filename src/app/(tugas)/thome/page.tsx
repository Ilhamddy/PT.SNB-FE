import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'
import { FaHome, FaThList } from 'react-icons/fa'
import { FaUser, FaWallet } from 'react-icons/fa6'
import { HiCloudDownload } from 'react-icons/hi'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const page = () => {
    return (
        <header className='bg-hero-pattern bg-cover ' >
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-20'>
                <div className='md:mx-10 sm:mx-10  '>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 '>
                        <div className='flex flex-col justify-center mx-2'>
                            <div className='text-3xl md:text-5xl font-black text-center md:text-start space-y-28 mb-5 '>
                                <h1>Welcome in Ilhamddy <span className='text-based'>Corp</span> IT Consultant</h1>
                            </div>
                            <p></p>
                            <div className='text-3xl md:text-5xl font-black text-center md:text-start space-y-28 mb-5 '>
                                Ilham Maulana
                            </div>
                            <div className='text-3xl md:text-5xl font-black text-center md:text-start space-y-28 mb-5 '>
                                21201254
                            </div>


                            <Card className='bg-about2 bg-cover h-[400px] px-5 gap-10 text-yellow-400'>
                                {/* <div className='text-center'>
                                    Welcome in My Apps
                                </div>
                                <div className='my-5'>
                                    Your Name : Ilham Maulana
                                </div>
                                <div className='my-5'>
                                    Your Class : IT ONLINE 2021
                                </div>
                                <div className='my-5'>
                                    Your NIM : 21201254
                                </div> */}
                            </Card>


                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center w-full'>

                                <Button className='h-16  sm:text-sm md:text-md gap-5 text-center'>
                                    <div className='grid place-items-center '><FaHome /> Welcome</div>
                                    <div className='grid place-items-center '><FaThList /> Indonesia</div>
                                    <div className='grid place-items-center text-based1'><FaUser /> Author </div>
                                </Button>
                            </div>
                        </div>
                        {/* <div className='bg-myimage bg-cover h-64 sm:h-[500px] md:h-[500px] my-5  md:my-0 mx-2 rounded-xl ' data-aos="fade-up"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false"
                        >
                        </div> */}
                    </div>

                </div>
            </div>
        </header >
    )
}

export default page