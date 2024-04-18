import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { dataAdvantages } from '@/hooks/dataNavbar'
import Image from "next/image"
import { FaLinkedinIn } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"

const Team = () => {
    return (
        <section className='bg-third'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 '>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 md:py-10 '>
                        <div className='text-center'>
                            <h2 className='text-based text-3xl md:text-5xl font-black my-5'>
                                Our Leadership/ Our Client

                            </h2>
                            <h3 className='text-sm'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium delectus repudiandae sed magnam magni rem explicabo laborum in?
                            </h3>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 my-10 '>
                            {dataAdvantages.slice(0, 3).map((data) => {
                                return (

                                    <div>
                                        <Card className='bg-about3 bg-center bg-cover h-[450px] rounded-xl border-none m-5'>


                                        </Card>
                                        <div className="p-5 text-center ">
                                            <p className="text-xl font-sans text-based1">{data.title}</p>
                                            <p className='text-sm'>{data.description}</p>
                                            <div className="flex gap-5 justify-center text-based1 mt-5">
                                                <FaLinkedinIn />
                                                <MdEmail />
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}


                        </div>
                        <div className="flex justify-center">
                            <Button>
                                Show More Service
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Team