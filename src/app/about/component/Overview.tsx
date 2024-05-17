import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Overview = () => {
    return (
        <section className='bg-'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 gap-5'>
                        <div className='bg-about2 bg-cover h-64 sm:h-[500px] md:h-full w-full my-5 md:my-0  rounded-xl'>
                        </div>
                        <div className='flex flex-col justify-center mx-2 '>
                            <div className='text-3xl md:text-5xl font-black text-center md:text-start space-y-28 mb-5'>
                                <h1>PT. Solusi <span className='text-based'>Nusantara</span> Berdikari</h1>
                            </div>
                            <p></p>
                            <div className="text-justify ">
                                <h5>
                                    Tentang Kami : Didirikan dengan penuh semangat oleh konsultan ahli profesional yang memiliki pengalaman lebih dari 30 tahun di industri kesehatan, HEALTHTECHS memfokuskan diri pada solusi untuk sektor kesehatan.

                                </h5>
                                <h5 className='my-5'>
                                    Aplikasi kami mengintegrasikan berbagai fungsi rumah sakit dengan lancar, termasuk manajemen pasien, catatan kesehatan elektronik (EHR), penagihan dan faktur, manajemen inventaris, dan banyak lagi. Integrasi ini memastikan komunikasi dan koordinasi yang lancar di berbagai departemen.
                                </h5>
                            </div>
                            <div className=' py-5 rounded-lg'>
                                <Accordion type="single" collapsible className="w-full p-5 bg-based  rounded-lg " defaultValue="item-1">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger >Visi PT. Solusi Nusantara Berdikari</AccordionTrigger>
                                        <AccordionContent className='bg-third p-5 rounded-lg dark:bg-dope' >
                                            Visi PT Solusi Nusantara Berdikari adalah menjadi mitra tepercaya dan kekuatan pendorong dalam mengubah lanskap layanan kesehatan melalui teknologi, inovasi, dan keunggulan.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Misi PT. Solusi Nusantara Berdikari</AccordionTrigger>

                                        <AccordionContent className='bg-third p-5 rounded-lg dark:bg-dope'>
                                            Misi PT Solusi Nusantara Berdikari adalah merevolusi industri perawatan kesehatan dengan menawarkan solusi mutakhir yang meningkatkan perawatan pasien, merampingkan operasi, dan meningkatkan efisiensi secara keseluruhan di institusi perawatan kesehatan.
                                        </AccordionContent>
                                    </AccordionItem>
                                    {/* <AccordionItem value="item-3">
                                        <AccordionTrigger>Goals PT. Solusi Nusantara Berdikari?</AccordionTrigger>
                                        <AccordionContent className='bg-third p-5 rounded-lg'>

                                            Overall, PT Solusi Nusantara Berdikari is dedicated to empowering healthcare institutions with advanced solutions that enable them to deliver superior patient care, optimize operations, and achieve sustainable growth in a rapidly evolving healthcare environment.
                                        </AccordionContent>
                                    </AccordionItem> */}
                                </Accordion>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </section >
    )
}

export default Overview