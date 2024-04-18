import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MdArticle } from 'react-icons/md'
import { FaAddressCard, FaAffiliatetheme, FaAnchor, FaBarcode } from 'react-icons/fa6'
import { title } from 'process'


const Advantages = () => {

    const dataAdvantages = [
        {
            title: '  Integrated system terbaru',
            icon: FaAnchor,
            description: 'The company values collaboration, continuous improvement, and a customer-centric approach in delivering high-quality solutions to its clients.',
        },
        {
            title: '  Integrated system terbaru',

            icon: FaAddressCard,
            description: 'The company values collaboration, continuous improvement, and a customer-centric approach in delivering high-quality solutions to its clients.',
        },
        {
            title: '  Integrated system terbaru',

            icon: FaAffiliatetheme,
            description: 'The company values collaboration, continuous improvement, and a customer-centric approach in delivering high-quality solutions to its clients.',
        }
    ]
    return (
        <section className='bg-based'>
            <div className=' md:h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 '>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  md:h-[350px]'>
                        <div className='flex flex-col justify-center m-5'>
                            <h3 className='text-3xl md:text-5xl font-black text-white'>Why Chose Use?</h3>
                            <h4 className='text-white my-5'>PT Solusi Nusantara Berdikari offers consulting services to help healthcare institutions assess their needs</h4>

                        </div>
                        <Card className='m-5 flex flex-col justify-center text-justify'>
                            <CardHeader>
                                <CardDescription>
                                    <MdArticle size={60} color='orange' />
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='text-xl font-black '>
                                <p>Integrated Hospital Information Systems</p>
                            </CardContent>
                            <CardFooter>
                                <p className='text-sm'>The company values collaboration, continuous improvement, and a customer-centric approach in delivering high-quality solutions to its clients.</p>
                            </CardFooter>
                        </Card>
                        <Card className='m-5 flex flex-col justify-center text-justify'>
                            <CardHeader>
                                <CardDescription>
                                    <MdArticle size={60} color='orange' />
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='text-xl font-black '>
                                <p>Integrated Hospital Information Systems</p>
                            </CardContent>
                            <CardFooter>
                                <p className='text-sm'>The company values collaboration, continuous improvement, and a customer-centric approach in delivering high-quality solutions to its clients.</p>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  my-5 md:h-[350px]'>
                        {dataAdvantages.map((data) => {
                            return (
                                <Card className='m-5 flex flex-col justify-center text-justify'>
                                    <CardHeader>
                                        <CardDescription>
                                            <data.icon size={60} color='orange' />
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className='text-xl font-black '>
                                        <p>{data.title}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <p className='text-sm'>{data.description}</p>
                                    </CardFooter>

                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Advantages