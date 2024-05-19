import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaCheck, FaCheckDouble } from 'react-icons/fa6'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'


const Modul = () => {

    const dataList = [
        {
            title: "Penghematan waktu pelayanan kepada pasien"
        }, {
            title: "Penghematan Biaya"
        }, {
            title: "Menghindari duplikasi pekerjaan"
        }, {
            title: "Data medis dan keuangan yang lengkap dan akurat"
        }, {
            title: "Laporan yang sesuai dengan standar Departemen Kesehatan"
        }

    ]


    const dataModul = [
        {
            title: "Modul Loket"
        }, {
            title: "Modul Loket"
        }, {
            title: "Modul Loket"
        }, {
            title: "Modul Loket"
        }, {
            title: "Modul Loket"
        }, {
            title: "Modul Loket"
        }, {
            title: "Modul Loket"
        }, {
            title: "Modul Loket"
        }, {
            title: "Modul Loket"
        }, {
            title: "Modul Loket"
        }
    ]

    const dataModul2 = [
        {
            title: "Modul Loket",
            description: "Modul Registrasi dalam SIMRS adalah bagian yang mengurus proses pendaftaran pasien di rumah sakit. Ini mencakup pengumpulan informasi pribadi pasien, pembuatan rekam medis awal, pemberian nomor registrasi, dan penjadwalan janji temu awal dengan dokter."
        }, {
            title: "Modul Rawat Jalan",
            description:"Modul ini membantu rumah sakit mengatur pendaftaran, jadwal konsultasi, rekam medis, dan berbagai layanan medis lainnya yang diberikan kepada pasien yang tidak memerlukan rawat inap."
        }, {
            title: "Modul IGD",
            description:"Modul IGD (Instalasi Gawat Darurat) dalam SIMRS mengelola semua proses yang terkait dengan penanganan pasien gawat darurat. Ini mencakup penerimaan pasien, triase, pemeriksaan awal, penanganan darurat, perawatan sementara, koordinasi dengan unit-unit medis lainnya, dan pembuatan laporan."

        }, {
            title: "Modul Rawat Inap",
            description:"Modul Rawat Inap dalam SIMRS mengurus semua aspek perawatan pasien yang membutuhkan rawat inap di rumah sakit. Ini meliputi pendaftaran pasien rawat inap, penjadwalan kamar dan tempat tidur, pemantauan kondisi pasien, pencatatan tindakan medis dan perawatan, pengeluaran pasien dari rawat inap, serta penagihan dan pembayaran. Modul ini juga dapat mencakup manajemen stok obat dan bahan medis, koordinasi dengan tim medis lainnya, serta pembuatan laporan tentang pasien rawat inap dan kinerja unit rawat inap."

        }, {
            title: "Modul Kamar Operasi(OK)",
            description:"Modul Kamar Operasi (OK) dalam SIMRS mengelola penjadwalan ruang operasi, pencatatan informasi pra-operasi, pemantauan kondisi pasien selama operasi, pencatatan tindakan medis dan instrumen yang digunakan, serta pembuatan laporan tentang operasi yang dilakukan."

        }, {
            title: "Modul Laboratorium",
            description:"Modul Laboratorium dalam SIMRS mengelola pendaftaran pasien untuk pemeriksaan laboratorium, pengambilan dan pengolahan sampel, pelaksanaan uji laboratorium, pencatatan hasil pemeriksaan, penyusunan laporan, dan integrasi dengan rekam medis pasien."

        }, {
            title: "Modul Radiologi",
            description:"Modul Radiologi dalam SIMRS mengelola penjadwalan pemeriksaan radiologi, pencatatan informasi pasien dan spesifikasi pemeriksaan, pengolahan gambar radiologi, analisis hasil oleh radiolog atau dokter, serta penyusunan laporan dan penyimpanan gambar untuk referensi di masa depan."

        }, {
            title: "Modul Billing Apotek",
            description:"Modul Peresepan Obat dalam SIMRS mengelola penulisan, verifikasi, dan pemrosesan resep obat oleh dokter serta penyampaian obat kepada pasien. Fiturnya mencakup penulisan resep elektronik, pengecekan interaksi obat, pemilihan obat sesuai diagnosis, dan pencatatan riwayat penggunaan obat pasien. Tujuannya adalah memastikan pasien menerima obat yang sesuai dengan kebutuhan medis mereka, meningkatkan keselamatan, dan efisiensi dalam perawatan."

        }, {
            title: "Modul Gudang Farmasi",
            description:"Modul Gudang Farmasi dalam SIMRS mengatur manajemen stok obat dan persediaan farmasi di rumah sakit. Ini mencakup pemesanan obat dari pemasok, penyimpanan obat dalam gudang farmasi, pengeluaran obat untuk pasien, serta pemantauan dan pengelolaan persediaan obat secara keseluruhan. Fitur-fitur utama Modul Gudang Farmasi SIMRS termasuk manajemen stok obat, penjadwalan pemesanan obat, pemantauan tanggal kedaluwarsa obat, pengeluaran obat sesuai permintaan dari unit-unit medis, dan pencatatan masuk-keluar stok obat."

        }, {
            title: "Modul Gudang Logistik",
            description:"Modul Gudang Logistik dalam SIMRS bertanggung jawab atas manajemen dan pengelolaan persediaan logistik di rumah sakit, yang meliputi barang-barang non-obat seperti alat medis, peralatan medis, dan perlengkapan medis lainnya. Ini mencakup proses pemesanan, penyimpanan, distribusi, dan penggunaan barang-barang tersebut oleh berbagai departemen di rumah sakit. Fiturfitur utama Modul Gudang Logistik SIMRS termasuk manajemen stok logistik, penjadwalan pemesanan, pemantauan tanggal kadaluarsa barang, pengeluaran barang sesuai permintaan dari unit-unit medis, serta pencatatan masuk-keluar stok logistik."

        }, {
            title: "Modul Kepagawaian",
            description:"Modul Kepegawaian dalam SIMRS mengelola informasi dan proses terkait dengan tenaga kerja di rumah sakit. Ini mencakup pengelolaan data karyawan, rekam jejak pekerja, penjadwalan jadwal kerja, manajemen kinerja, pelatihan, dan administrasi personalia. Fitur-fitur utama Modul Kepegawaian SIMRS termasuk pendaftaran karyawan baru, pencatatan data pribadi dan kualifikasi, manajemen jadwal kerja, evaluasi kinerja, pelaporan absensi, serta pelatihan dan pengembangan karyawan."

        }, {
            title: "Modul Keuangan & Akuntansi",
            description:"Modul Keuangan & Akuntansi dalam SIMRS mengelola semua aspek keuangan dan akuntansi rumah sakit. Ini mencakup pemantauan dan pelaporan pendapatan, biaya, dan aset, serta pencatatan transaksi keuangan dan akuntansi secara menyeluruh. Fitur-fitur utama Modul Keuangan & Akuntansi SIMRS termasuk pemantauan arus kas, pembuatan laporan keuangan seperti laporan laba rugi dan neraca, manajemen pembayaran dan tagihan,"

        }, {
            title: "Modul SIMRS",
            description:"manajemen pengguna dan hak akses, pemeliharaan data, serta pemantauan kinerja dan keamanan sistem secara keseluruhan. Fitur-fitur utama Modul Sysadmin SIMRS termasuk manMajemen pengguna dan grup pengguna, pengaturan hak akses, pemeliharaan database, penjadwalan backup data, serta pemantauan aktivitas sistem dan keamanan."

        }, {
            title: "Modul Rekam Medis Elektronik",
            description:"Modul Rekam Medis Elektronik (RME) dalam SIMRS adalah inti dari sistem, yang mengelola dan menyimpan informasi medis pasien secara digital. Ini mencakup riwayat kesehatan pasien, hasil pemeriksaan, diagnosis, pengobatan, dan informasi lainnya yang relevan dengan perawatan pasien. Fitur-fitur utama dari Modul RME SIMRS termasuk pencatatan dan penyimpanan data medis secara lengkap dan akurat, pemantauan kondisi pasien dari waktu ke waktu, aksesibilitas yang mudah bagi tim medis, serta penciptaan laporan dan analisis untuk tujuan klinis dan administratif."

        }, {
            title: "Modul Kasir",
            description:"Modul Kasir dalam SIMRS bertanggung jawab atas manajemen transaksi keuangan yang terkait dengan layanan medis di rumah sakit. Ini mencakup pembayaran oleh pasien untuk layanan medis, pengelolaan tagihan, pemrosesan pembayaran asuransi, dan pencatatan transaksi keuangan secara keseluruhan. Fitur-fitur utama Modul Kasir SIMRS termasuk penerimaan pembayaran tunai, kartu kredit, atau transfer bank, penanganan pembayaran asuransi, penerbitan tagihan kepada pasien atau pihak ketiga, serta pencatatan dan pelaporan transaksi keuangan."

        }, {
            title: "Modul Antrioan Loket",
            description:"Viewer antrean dalam SIMRS adalah alat yang memungkinkan staf rumah sakit untuk melihat dan mengelola antrean pasien. Antrean dapat mencakup berbagai layanan, seperti pendaftaran pasien, pemeriksaan dokter, pemeriksaan laboratorium, atau pemeriksaan radiologi, dan antrean"

        }, {
            title: "Bridging Aplikasi SIMRS",
            description:"Bridging aplikasi SIMRS adalah komponen yang memungkinkan integrasi atau koneksi antara sistem informasi medis rumah sakit (SIMRS) dengan sistem atau aplikasi eksternal lainnya. Seperti integrasi dengan BPJS Kecehatan (Vclaim/Pcare), Satusehat Kemenkes, dan lain-lain."

        }
    ]
    return (
        <section className='bg-zinc-900'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 '>
                    {/* <div className="grid">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 text-based1">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-xl font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4"></th>
                                                <th scope="col" className="px-6 py-4  rounded-md ">STANDART</th>
                                                <th scope="col" className="px-6 py-4  rounded-md ">ENTERPRISE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Register</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">DOctor</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Policlinic</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">ICU</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>  <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Inpatient</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>  <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Laboratorium</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>  <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Radiology</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>  <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Medical Rehabilitation</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Hemodialysis</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Nutrient</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Pharmacy</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4">Cashier</td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                                <td className="whitespace-nowrap px-6 py-4"><FaCheck /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> */}


                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 md:py-10  '>
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-2xl md:text-3xl font-medium  mb-4 md:mb-6 text-based1">Software SN Berdikari (Healthcare Hospital)</h1>
                            <p className="text-white">
                                Healthcare dapat memberikan layanan solusi terbaik untuk kebutuhan Software Rumah Sakit
                            </p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-4 justify-center mt-10 items-center text-white'>
                            <div className='mx-5'>
                                <h3 className='text-2xl'>
                                    Modul SNB
                                </h3>
                                <div className='text-sm text-justify'>
                                    Tujuan yang diharapkan dapat tercapai secara bertahap dengan diterapkannya Healthcare Hospital adalah :
                                </div>
                                <div className='text-sm text-justify my-5'>
                                    <ul>
                                        {dataList.map((data, index) => {
                                            return (
                                                <li className='flex items-center gap-2 my-5'>
                                                    <div>
                                                        <FaCheckDouble size={'24px'} />
                                                    </div>
                                                    <div>{data.title}</div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className='col-span-3 rounded bg-based h-full'>
                                <div className='h-24 text-5xl flex w-full justify-center items-end'>
                                    <h3>All Modul</h3>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 my-8'>
                                    {dataModul2.map((data, index) => {
                                        return (
                                            <Accordion type="single" collapsible className="h- p-2 bg-dope h- rounded-lg mx-5 my-2 gap-2  ">
                                                <AccordionItem value="item-1">
                                                <AccordionTrigger  className='text-md font-bold'>


                                                        <div>
                                                            <MdOutlineDoubleArrow />
                                                        </div>
                                                        {data.title}</AccordionTrigger>
                                                    <AccordionContent className='bg-third p-5 text-dope dark:text-white rounded-lg dark:bg-dope' >
                                                        {data.description}
                                                    </AccordionContent>
                                                </AccordionItem>


                                            </Accordion>
                                        )
                                    })}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Modul