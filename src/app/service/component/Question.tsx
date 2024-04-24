import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Question = () => {
    const anyQuestion = [

        {
            value: 'item-2',
            title: "Apa itu aplikasi sistem manajemen rumah sakit (SIMRS)?              ",
            description: "Aplikasi sistem manajemen rumah sakit adalah perangkat lunak yang dirancang khusus untuk membantu mengelola operasi sehari-hari dalam sebuah rumah sakit. Ini mencakup manajemen pasien, rekam medis elektronik, manajemen inventaris, keuangan, dan berbagai aspek lain dari administrasi rumah sakit. "
        },
        {
            value: 'item-3',
            title: "Apa manfaat menggunakan aplikasi sistem manajemen rumah sakit?            ",
            description: " Menggunakan aplikasi sistem manajemen rumah sakit dapat meningkatkan efisiensi operasional, meningkatkan pelayanan pasien, mengoptimalkan manajemen inventaris, mengurangi kesalahan dalam rekam medis, serta membantu dalam pemantauan dan pelaporan kinerja rumah sakit.            "
        },
        {
            value: 'item-4',
            title: "Bagaimana aplikasi ini membantu dalam manajemen pasien?",
            description: "Aplikasi sistem manajemen rumah sakit memungkinkan pengelolaan jadwal pasien, registrasi pasien, pemantauan status pasien, dan koordinasi perawatan di antara departemen dan staf medis. Hal ini membantu meningkatkan efisiensi dalam penerimaan, perawatan, dan pemulangan pasien.            "
        },
        {
            value: 'item-5',
            title: "Apakah aplikasi ini aman untuk digunakan dalam menangani informasi medis sensitif?            ",
            description: "Ya, keamanan informasi medis adalah prioritas utama dalam pengembangan aplikasi sistem manajemen rumah sakit. Biasanya, aplikasi dilengkapi dengan fitur keamanan yang kuat, termasuk kontrol akses, enkripsi data, dan audit log untuk melindungi informasi sensitif pasien.            "
        },
        {
            value: 'item-6',
            title: "Bagaimana integrasi dengan sistem eksternal seperti BPJS Kesehatan dilakukan?",
            description: "Integrasi dengan sistem eksternal seperti BPJS Kesehatan dilakukan melalui teknologi bridging atau antarmuka khusus yang memungkinkan pertukaran data antara sistem rumah sakit dan sistem BPJS Kesehatan. Hal ini memungkinkan klaim, verifikasi kepesertaan, dan administrasi lainnya dilakukan dengan lebih efisien.            "
        },

    ]
    const anyQuestion2 = [

        {
            value: 'item-7',
            title: "Apakah aplikasi ini dapat disesuaikan dengan kebutuhan spesifik rumah sakit?            ",
            description: "Ya, kebanyakan aplikasi sistem manajemen rumah sakit dapat disesuaikan dengan kebutuhan spesifik rumah sakit. Pengguna dapat menyesuaikan berbagai fitur dan modul sesuai dengan kebutuhan operasional mereka.            "
        },
        {
            value: 'item-8',
            title: "Bagaimana proses pelatihan staf untuk menggunakan aplikasi ini dilakukan?            ",
            description: "Biasanya, penyedia aplikasi sistem manajemen rumah sakit menyediakan pelatihan kepada staf rumah sakit untuk menggunakan aplikasi tersebut. Pelatihan dapat berupa sesi pelatihan langsung, panduan pengguna, atau tutorial daring, disesuaikan dengan kebutuhan dan preferensi rumah sakit."
        },
        {
            value: 'item-9',
            title: "Bagaimana dukungan teknis untuk aplikasi ini tersedia?            ",
            description: " Penyedia aplikasi biasanya menyediakan dukungan teknis dalam bentuk layanan bantuan, pusat pengetahuan, atau kontak langsung dengan tim dukungan teknis. Hal ini membantu pengguna dalam menyelesaikan masalah teknis atau pertanyaan terkait penggunaan aplikasi.            "
        },
        {
            value: 'item-10',
            title: " Apakah aplikasi ini dapat diakses secara mobile atau dari jarak jauh?            ",
            description: "Banyak aplikasi sistem manajemen rumah sakit menyediakan akses melalui perangkat mobile atau jarak jauh. Ini memungkinkan staf rumah sakit untuk mengakses informasi dan menjalankan tugas administratif dari mana saja, meningkatkan fleksibilitas dan keterjangkauan.            "
        },
        {
            value: 'item-11',
            title: " Apakah aplikasi ini membutuhkan infrastruktur teknologi khusus untuk dijalankan            ?            ",
            description: "BAplikasi ini dapat dijalankan di berbagai infrastruktur teknologi, baik lokal (on-premise) maupun berbasis cloud. Namun, kebutuhan infrastruktur teknologi khusus dapat bervariasi tergantung pada skala dan fitur aplikasi yang digunakan.            "
        }
    ]
    return (
        <section className='bg-hero-pattern dark:bg-white'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 '>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 place-item gap-5 '>
                        <div className='text-center flex justify-center flex-col dark:text-dope'>
                            <h2 className=' text-3xl md:text-5xl font-black my-5'>
                                Frequatly Asked Question

                            </h2>
                            <h3 className='text-sm text-justify'>
                                <p className='my-5'>
                                    PT Solusi Nusantara Berdikari adalah pelopor dalam menyediakan solusi perawatan kesehatan mutakhir yang dirancang untuk meningkatkan institusi perawatan kesehatan di seluruh Indonesia. Dengan komitmen yang teguh terhadap inovasi, keunggulan, dan kepuasan pelanggan, kami memberdayakan rumah sakit, klinik, dan praktik medis dengan solusi perangkat lunak komprehensif yang dirancang untuk merampingkan operasi, meningkatkan perawatan pasien, dan mendorong efisiensi.
                                </p>

                                <p>
                                    Untuk pertanyaan yang lebih rinci atau pertanyaan spesifik yang tidak tercakup dalam FAQ kami, jangan ragu untuk menghubungi tim dukungan kami. Kami siap membantu Anda dengan masalah atau informasi tambahan yang Anda perlukan. Hubungi kami melalui saluran resmi kami atau kunjungi halaman Hubungi Kami untuk opsi lainnya.
                                </p>

                            </h3>

                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:py-10 place-item gap-5  text-sm'>
                        <div >
                            {anyQuestion.map((data) => {
                                return (
                                    <>
                                        <Accordion type="single" collapsible className="w-full ">
                                            <AccordionItem value={data.value} >
                                                <AccordionTrigger className='text-md text-white bg-dope p-5 rounded'>{data.title}</AccordionTrigger>
                                                <AccordionContent className='bg-white dark:text-dope p-5'>
                                                    {data.description}
                                                </AccordionContent>
                                            </AccordionItem>

                                        </Accordion>
                                    </>
                                )
                            })}
                        </div>
                        <div>
                            {anyQuestion2.map((data) => {
                                return (
                                    <>
                                        <Accordion type="single" collapsible className="w-full ">
                                            <AccordionItem value={data.value} >
                                                <AccordionTrigger className='text-md text-white bg-dope p-5 rounded'>{data.title}</AccordionTrigger>

                                                <AccordionContent className='bg-white dark:text-dope p-5'>

                                                    {data.description}
                                                </AccordionContent>
                                            </AccordionItem>

                                        </Accordion>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Question