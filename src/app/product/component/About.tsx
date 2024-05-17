import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { title } from 'process'
import React from 'react'
import { FaThList } from 'react-icons/fa'

const About = () => {
    const dataProduct = [
        {
            value: '120 Rumah Sakit',
            title: "Kami melayani lebih dari 120 rumah sakit di seluruh Indonesia dengan solusi terkemuka kami, SIMRS oleh PT Solusi Nusantara Berdikari. Platform ini dirancang khusus untuk memenuhi kebutuhan unik setiap rumah sakit, membantu mereka mengelola informasi pasien, rekam medis, janji temu, dan proses keuangan dengan efisien. Dengan SIMRS, rumah sakit dapat meningkatkan produktivitas, meningkatkan kualitas layanan, dan memberikan perawatan yang lebih baik kepada pasien mereka. Kami berkomitmen untuk mendukung dan berkolaborasi dengan rumah sakit di seluruh Indonesia untuk memajukan layanan kesehatan negara."
        }
        , {
            value: '250 Klinik',
            title: 'Kami bangga melayani lebih dari 250 klinik di seluruh Indonesia dengan platform inovatif kami, E-Klinik. Melalui solusi kami, klinik-klinik ini dapat mengoptimalkan operasional mereka dengan sistem pendaftaran dan manajemen pasien yang terintegrasi secara digital. E-Klinik memungkinkan pasien untuk melakukan pendaftaran dan membuat janji temu secara online, mengakses rekam medis elektronik, dan bahkan melakukan konsultasi medis jarak jauh. Dengan fokus pada efisiensi, aksesibilitas, dan kualitas layanan, kami berkomitmen untuk terus mendukung klinik-klinik di Indonesia dalam memberikan perawatan kesehatan yang berkualitas dan menyeluruh kepada masyarakat'
        },
        {
            value: '340 Puskesmas ',
            title: 'Kami telah bekerja sama dengan lebih dari 300 Pusat Kesehatan Masyarakat (Puskesmas) di seluruh Indonesia untuk memberikan solusi teknologi terdepan dalam meningkatkan akses dan kualitas layanan kesehatan. Melalui platform kami, Puskesmas dapat mengelola data pasien, jadwal layanan, dan inventaris secara efisien. Kami memahami pentingnya pelayanan yang cepat dan akurat di tingkat masyarakat, oleh karena itu kami telah mengembangkan alat yang memungkinkan pendaftaran online, akses cepat ke rekam medis, dan layanan konsultasi jarak jauh.'
        }]
    return (
        <section className='bg-based dark:bg-dope'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 md:py-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 gap-10'>
                        <div className='flex flex-col justify-center mx-2'>
                            <div className='text-2xl md:text-3xl font-black text-center md:text-start '>
                                <h1><span className='text-third'>Dengan berbagai layanan yang disediakan, </span>PT Solusi Nusantara Berdikari bertujuan untuk menjadi mitra terpercaya</h1>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center mx-2 md:px-5'>
                            <div className='text-justify my-5'>
                                <h5>Kami berdedikasi untuk merevolusi industri perawatan kesehatan. Platform kami dirancang untuk merampingkan operasi rumah sakit, meningkatkan perawatan pasien, dan mengoptimalkan efisiensi secara keseluruhan di dalam institusi perawatan kesehatan.</h5>
                            </div>
                            <div className='flex flex-row gap-5 my-5'>
                                {/* <Button className='h-16 w-[200px] sm:text-sm  md:text-md gap-5 bg-based1'><FaEject /> Learn More</Button> */}
                                <a href="#product">

                                    <Button className='h-12  rounded-full sm:text-sm md:text-md gap-5'> <FaThList /> Produk Kami</Button>

                                </a>                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md:py-10 md:h-full gap-5'>
                        {/* {dataProduct.map((data) => {
                            return (
                                <Card className=' p-5 bg-transparent bg-gray-100 dark:bg-dope transition-all duration-200' key={data.value}>
                                    <div className='text-3xl'>{data.value}</div>
                                    <div className='font-thin text-justify my-5 text-sm '><span className='font-black'> </span> {data.title}</div>
                                </Card>
                            )
                        })} */}


                    </div>
                </div>
            </div>
        </section>
    )
}

export default About