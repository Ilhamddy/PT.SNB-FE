import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'
import { FaThList } from 'react-icons/fa'
import { FaEject } from 'react-icons/fa6'
import { HiCloudDownload } from 'react-icons/hi'

const Contact = () => {
    return (
        <section className='bg-yellow-300 dark:bg-dope'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10  py-10'>
                <div className='md:mx-10 sm:mx-10'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 md:py-10  dark:bg-dope rounded-xl'>
                        <div className="p-5  rounded-xl">
                            <div className="mx-auto max-w-screen-xl md:px-4 py-8 lg:py-16 dark:text-white">
                                <h2 className="tracking-tighttext-white mb-4 text-center  text-4xl font-extrabold  uppercase ">
                                   Hubungi Kami
                                </h2>
                                <p className="mb-8 text-justify md:text-center font-light  lg:mb-16 ">
                                    PT. Solusi Nusantara Berdikari menyambut baik pertanyaan, umpan balik, dan saran Anda. Sebagai penyedia terkemuka di industri kami, kami berkomitmen untuk memberikan layanan dan dukungan terbaik kepada Anda. Jika Anda memiliki pertanyaan tentang layanan kami, membutuhkan bantuan, atau ingin terhubung dengan tim kami, kami siap membantu Anda. Silakan isi formulir di bawah ini, dan salah satu perwakilan kami akan menghubungi Anda sesegera mungkin. Kami tunggu kabar dari Anda!
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 ">
                                    <Card className='col-span-2 bg-white border-none  p-5 '>
                                        <form action="https://formsubmit.co/sales@snberdikari.co.id" method="POST" className=" mb-4 space-y-8">
                                            {/* First Name */}
                                            <div className="m-2">
                                                <label
                                                    // for="email"
                                                    className="mb-2 block text-sm font-medium dark:text-dope"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-dope dark:placeholder-gray-400 dark:shadow-sm-light"
                                                    placeholder="Your Name"
                                                    required
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div className="m-2">
                                                <label
                                                    // for="email"
                                                    className="mb-2 block text-sm font-medium"
                                                >
                                                    Your Phone
                                                </label>
                                                <input
                                                    type="number"
                                                    id="number"
                                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                                                    placeholder="Phone Number"
                                                    required
                                                />
                                            </div>

                                            {/* Email */}
                                            <div className="m-2">
                                                <label
                                                    // for="email"
                                                    className="mb-2 block text-sm font-medium"
                                                >
                                                    Your email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light"
                                                    placeholder="Email"
                                                    required
                                                />
                                            </div>


                                            {/* your message */}
                                            <div className="sm:col-span-2">
                                                <label
                                                    // for="message"
                                                    className="mb-2 block text-sm font-medium"
                                                >
                                                    Your message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    // rows="6"
                                                    className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                                    placeholder="Leave a comment..."
                                                ></textarea>
                                            </div>
                                            <div className="">
                                                <Button color="gray" type='submit'>
                                                    <HiCloudDownload />
                                                    Send
                                                </Button>
                                            </div>
                                        </form>
                                    </Card>
                                    <div className=" p-5 dark:text-white text-dope">
                                        <div className=" mb-2 block space-y-8 text-2xl font-medium ">
                                            Points of contact
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-1">
                                            <div className="m-1 rounded-md ">
                                                <div className="text-md my-2 mb-2 block space-y-8 font-bold ">
                                                    Contact Us
                                                </div>
                                                <div className="font-italic my-2 mb-2 block space-y-4 text-sm">
                                                    Sales@snberdikari.co.id
                                                </div>
                                                <div className="font-italic my-2 mb-2 block space-y-4 text-sm ">
                                                +62 818-530-038
                                                </div>
                                                <Button className="text-md my-2 mb-2 block space-y-8 font-bold ">
                                                    <a href="https://wa.me/+62818530038">
                                                    Whatsapp
                                                   </a>
                                                </Button>
                                            </div>
                                            <div className="m-1 rounded-md py-5">
                                                <div className="text-md my-2 mb-2 block space-y-8 font-bold ">
                                                    Address Company
                                                </div>
                                                <div className="font-italic my-2 mb-2 block space-y-4 text-sm ">
                                                    Jl. Jenderal Sudirman kav. 54-55, Menara Mandiri Tower 2, 19th floor, DKI Jakarta, Jakarta Selatan 12190, ID
                                                </div>

                                            </div>

                                            {/* <button onClick={handleClick}>abel</button> */}
                                        </div>
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

export default Contact