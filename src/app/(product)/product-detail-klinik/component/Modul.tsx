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
            title: "Modul Loket"
        }, {
            title: "Modul Rawat Jalan"
        }, {
            title: "Modul IGD"
        }, {
            title: "Modul Rawat Inap"
        }, {
            title: "Modul Kamar Operasi(OK)"
        }, {
            title: "Modul Laboratorium"
        }, {
            title: "Modul Radiologi"
        }, {
            title: "Modul Billing Apotek"
        }, {
            title: "Modul Gudang Farmasi"
        }, {
            title: "Modul Aset"
        }, {
            title: "Modul Inventory"
        }, {
            title: "Modul Kepagawaian"
        }, {
            title: "Modul Keuangan & Akuntansi"
        }, {
            title: "Modul SIMRS"
        }, {
            title: "Modul Medical Record"
        }, {
            title: "Modul Kasir"
        }, {
            title: "Modul Asuhan Keperawatan(IGS, IRJ, IRNA)"
        }, {
            title: "Modul Antrioan Loket"
        }, {
            title: "Modul Antrian Poli"
        }, {
            title: "Modul Bridging BPJS (Vclaim)"
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
                                                    <AccordionTrigger >

                                                        <div>
                                                            <MdOutlineDoubleArrow />
                                                        </div>
                                                        {data.title}</AccordionTrigger>
                                                    <AccordionContent className='bg-third p-5 text-dope dark:text-white rounded-lg dark:bg-dope' >
                                                        {data.title}
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