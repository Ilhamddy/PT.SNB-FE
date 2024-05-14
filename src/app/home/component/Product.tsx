import Link from 'next/link'
import React from 'react'

const Product = () => {
    return (
        <section className='bg-third dark:bg-dope'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 '>
                    <div className='text-center'>
                        <h2 className='text-based text-3xl md:text-5xl font-black my-5'>
                            Healthcare landscape through technology.

                        </h2>
                        <h3>
                            Perusahaan ini juga menyediakan dukungan implementasi untuk memastikan integrasi yang efisien dari solusi-solusinya.
                        </h3>
                    </div>
                    <div className='grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 my-10'>
                        <Link href={'product-detail'}>
                            <div className='mx-2 bg- rounded-lg md:p-10' data-aos="fade-right"
                                data-aos-offset="200"
                                data-aos-delay="50"
                                data-aos-duration="1000"
                                data-aos-easing="ease-in-out"
                                data-aos-mirror="true"
                                data-aos-once="false">
                                <div className='bg-product1 bg-cover bg-center h-64 sm:h-[500px] md:h-[500px] my-5  md:my-0 rounded-xl'></div>
                                <h3 className='text-center font-black text-xl md:text-2xl my-5 '>SIMRS (Sistem Informasi Manajemen Rumah Sakit)</h3>
                                <h4 className='text-justify  p-5'>SIMRS dari PT Solusi Nusantara Berdikari adalah Sistem Informasi Manajemen Rumah Sakit yang komprehensif yang dirancang untuk merampingkan operasi rumah sakit dan meningkatkan perawatan pasien. Dengan SIMRS, institusi kesehatan dapat secara efektif mengelola informasi pasien, rekam medis, janji temu, penagihan, dan banyak lagi, semua dalam satu platform yang terintegrasi.</h4>

                            </div>

                        </Link>

                        <Link href={'product-detail'}>

                            <div className='mx-2 bg- rounded-lg md:p-10' data-aos="fade-left"
                                data-aos-offset="200"
                                data-aos-delay="50"
                                data-aos-duration="1000"
                                data-aos-easing="ease-in-out"
                                data-aos-mirror="true"
                                data-aos-once="false">

                                <div className='bg-product2 bg-cover h-64 bg-center sm:h-[500px] md:h-[500px] my-5  md:my-0  rounded-xl'></div>
                                <h3 className='text-center font-black text-xl md:text-2xl my-5 '>SIM-Klinik (Sistem Informasi Manajemen Klinik):</h3>
                                <h4 className='text-justify  p-5'>SIM-Klinik dari PT Solusi Nusantara Berdikari adalah solusi rekam medis elektronik (EMR) yang mudah digunakan dan dirancang untuk klinik rawat jalan dan praktik medis. Platform intuitif ini memberdayakan penyedia layanan kesehatan untuk mendigitalkan catatan pasien, merampingkan tugas-tugas administratif, dan memberikan perawatan yang dipersonalisasi secara efisien.</h4>

                            </div>
                        </Link>


                    </div>
                </div>
            </div>
        </section >
    )
}

export default Product