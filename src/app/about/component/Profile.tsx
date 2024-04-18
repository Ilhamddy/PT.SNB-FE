import Image from 'next/image'
import React from 'react'

const Profile = () => {


    return (
        <section className='bg-'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 gap-5'>

                        <div className='flex flex-col justify-center mx-2 '>
                            <div className='text-2xl md:text-4xl font-black text-center md:text-start space-y-28 mb-5'>
                                <h1>Tingkatkan Pengalaman anda dengan <span className='text-based'>PT Solusi Nusantara </span> Berdikari</h1>
                            </div>
                            <p></p>
                            <div className="text-justify ">
                                <h5>
                                Projek Kami : Heatlhcare Technology Solution (HEALTHTECHS) merupakan solusi terkini untuk seluruh Fasilitas Pelayanan Kesehatan (RS / Puskesmas / Klinik / TPMD), dirancang untuk mengoptimalkan mutu pelayanan medis melalui modul-modul yang terintegrasi. Integrasi tidak hanya mencakup antar instalasi internal di fasilitas kesehatan, tetapi juga mencakup keterhubungan dengan entitas di luar fasilitas, seperti BPJS Kesehatan, Kementerian Kesehatan Republik Indonesia, dan instansi lainnya. Tujuan utama dari solusi ini adalah meningkatkan efisiensi dan efektivitas pelayanan kesehatan dengan menyelaraskan berbagai elemen yang terlibat dalam proses pelayanan medis.

      </h5>
                            </div>

                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-1  my-5 md:my-0  rounded-xl gap-5'>

                            <Image src={'/image/ProductPro.jpg'} width={500} height={500} alt='halo' className='h-64 sm:h-[250px] md:h-full w-full rounded-2xl' />


                        </div>


                    </div>

                </div>
            </div>
        </section >
    )
}

export default Profile