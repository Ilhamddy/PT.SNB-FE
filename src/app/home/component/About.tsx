import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { dataService } from '@/hooks/dataNavbar'
import Link from 'next/link'
import { title } from 'process'
import React from 'react'
import { FaThList } from 'react-icons/fa'
import { FaArrowUpRightDots, FaCalendarCheck, FaFileInvoiceDollar, FaFileMedical, FaHospital, FaPills, FaVials } from 'react-icons/fa6'

const About = () => {
    const dataProduct = [
        {
            data: '120',
            client: 'Lorem Ipsum',
            value: 'SIMRS',
            title: 'SIMRS (Sistem Informasi Manajemen Rumah Sakit) menetapkan standar untuk manajemen pasien, menawarkan integrasi yang mulus dari proses registrasi, penerimaan, dan proses penutupan, memastikan efisiensi tak tertandingi dan kepuasan pasien.',
            icon: FaHospital
        },
        {
            data: '90',
            client: 'Lorem Ipsum',
            value: 'Electronic Medical Records',
            title: 'Rekam Medis Elektronik kami merevolusi manajemen informasi pasien, memastikan akses yang aman dan mudah ke riwayat pasien, rencana pengobatan, dan dokumen medis.',
            icon: FaFileMedical
        },
        {
            data: '150',
            client: 'Lorem Ipsum',
            value: 'Appointment Scheduling',
            "title": "Penjadwalan Janji kami dirancang untuk menyederhanakan proses penjadwalan janji dengan platform intuitif, yang dirancang untuk mengurangi waktu tunggu, meningkatkan kepuasan pasien, dan mengoptimalkan beban kerja staf Anda.",
            icon: FaCalendarCheck
        },
        {
            data: '90',
            client: 'Lorem Ipsum',
            value: 'Pharmacy Management',
            title: "Manajemen Apotek kami menyederhanakan pengelolaan dispensasi obat, kontrol inventaris, dan manajemen resep, memastikan akurasi dan efisiensi dalam operasi apotek Anda.",
            icon: FaPills
        },
        {
            data: '150',
            client: 'Lorem Ipsum',
            value: 'Billing and Invoicing',
            title: "Penagihan dan Penagihan kami dirancang untuk mengotomatisasi proses penagihan dan penagihan dengan solusi komprehensif, yang dirancang untuk menyederhanakan operasi keuangan, mengurangi kesalahan, dan meningkatkan manajemen siklus pendapatan.",
            icon: FaFileInvoiceDollar
        },
        {
            data: '90',
            client: 'Lorem Ipsum',

            value: 'Laboratory Information System',
            title: "Sistem Informasi Laboratorium kami meningkatkan efisiensi laboratorium Anda dengan menawarkan manajemen pesanan tes yang mulus, entri hasil, dan kepatuhan dengan standar regulasi.",
            icon: FaVials
        }

    ]
    return (
        <section className='bg-third dark:bg-dope'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 gap-10'>
                        <div className='flex flex-col justify-center mx-2'>
                            <div className='text-3xl md:text-5xl font-black text-center md:text-start ' data-aos="fade-right"
                                data-aos-offset="200"
                                data-aos-delay="50"
                                data-aos-duration="1000"
                                data-aos-easing="ease-in-out"
                                data-aos-mirror="true"
                                data-aos-once="false">
                                <h1><span className='text-based1'></span>Bekerja Sama dengan PT. Solusi Nusantara Berdikari</h1>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center mx-2 md:px-5'>
                            <div className='text-justify my-5'>
                                <h5>Komitmen kami terhadap pengembangan solusi IT yang terdepan dalam industri kesehatan merupakan inti dari identitas kami. Dengan keahlian yang luas dan pengalaman yang mendalam, kami mampu menyajikan solusi yang efektif dan efisien bagi lembaga kesehatan dan organisasi terkait.</h5>
                            </div>
                            <div className='flex justify-center md:justify-start flex-row gap-5 my-5'>
                                {/* <Button className='h-16 w-[200px] sm:text-sm  md:text-md gap-5 bg-based1'><FaEject /> Learn More</Button> */}

                                <Link href='/about'>
                                    <Button className='h-12 w-[200px]  bg-based1 rounded-full sm:text-sm md:text-md gap-5'> <FaThList /> Tentang Kami</Button>

                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:py-10 md:p-2 md:h-full gap-5' >
                        {dataService.map((data) => {
                            return (
                                <Card className='transition duration-300  hover:border-white   bg-gray-100 dark:bg-dope shadow-xl md:mx-0 m-5 rounded-2xl ' key={data.title} data-aos="fade-left"
                                    data-aos-offset="200"
                                    data-aos-delay="50"
                                    data-aos-duration="1000"
                                    data-aos-easing="ease-in-out"
                                    data-aos-mirror="true"
                                    data-aos-once="false">
                                    <CardContent className='md:h-[200px]'>
                                        {/* <div className='text-4xl flex items-center gap-2 text-white bg-based my-2 p-5 rounded-xl '>{data.data}+ <span className='text-3xl'>{data.client}</span></div> */}

                                        <div className='text-md md:text-xl flex items-center my-5  gap-2'><data.icon className='text-based1' />{data.title}</div>
                                        <div className='font-thin text-justify text-[15px]'>{data.description}</div>
                                    </CardContent>
                                    <CardFooter className='grid grid-cols-1'>
                                        <Link href='/service'>
                                            <div className='flex justify-between items-center mt-2 border rounded-full p-2 text-sm'>
                                                Click Here
                                                <Button className='rounded-full '>
                                                    <FaArrowUpRightDots />
                                                </Button>
                                            </div></Link>
                                    </CardFooter>
                                </Card>
                            )
                        })}


                    </div>
                </div>
            </div>
        </section>
    )
}

export default About