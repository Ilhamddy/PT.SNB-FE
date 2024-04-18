import Image from 'next/image'
import React from 'react'

const Client = () => {
    return (
        <section className='bg-based'>
            <div className='h-full bg-cover md:mx-10 sm:mx-10 mx-3 py-10'>
                <div className='md:mx-10 sm:mx-10 '>
                    <div className='text-center'>
                        <h2 className='text-white text-3xl md:text-5xl font-black my-5'>
                            Our Client
                        </h2>
                        <h3 className='text-white md:mx-10'>
                            Recognized as the leading Hospital Management Information System in Indonesia. Trusted by over 100 hospitals and clinics nationwide, SIMRS stands as the epitome of excellence in streamlining hospital operations and elevating patient care standards.
                        </h3>
                    </div>
                    <div className='grid grid-cols-1 place-items-center sm:grid-cols-3 md:grid-cols-5 my-10 gap-5'>
                        <div></div>
                        <Image width={200} height={200} className='h-48' src={'/image/pngeg.png'} alt='Partner SNB' />
                        <Image width={200} height={200} className='h-48' src={'/image/pngeg.png'} alt='Partner SNB' />
                        <Image width={200} height={200} className='h-48' src={'/image/pngeg.png'} alt='Partner SNB' />
                        <div></div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Client