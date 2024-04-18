
const Service = () => {
    return (
        <section className="bg-based dark:bg-based" id="detail">
            <div className="mx-3 h-full bg-cover py-10 sm:mx-10 md:mx-10">
                {/* class detail service */}
                <div className="my-10 md:mx-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
                    <div className="mx-4 flex flex-col justify-center text-white dark:text-dope">
                        <div className="mb-5 space-y-28 text-start text-3xl md:text-5xl font-black  my-5 ">
                            <h1>
                                <span > Healtcares </span> - SNB{" "}
                            </h1>
                        </div>
                        <p></p>
                        <div className="text-justify">
                            <h5>
                                Di PT Solusi Nusantara Berdikari, kami memahami kompleksitas serta tantangan yang dihadapi oleh lembaga kesehatan modern. Oleh karena itu, kami berdedikasi untuk menyediakan solusi yang dapat mengoptimalkan operasi, meningkatkan efisiensi, dan memberikan pelayanan yang berkualitas tinggi kepada pasien.


                            </h5>
                        </div>
                        <div className="text-justify my-5">
                            <h5>
                                Keunggulan kami terletak pada pendekatan yang holistik dalam mengembangkan solusi IT. Dari konsultasi awal hingga implementasi dan dukungan purna jual, kami mengintegrasikan pemahaman mendalam tentang kebutuhan klien dengan keahlian teknis yang tinggi untuk memberikan solusi yang sesuai dengan kebutuhan unik setiap organisasi.


                            </h5>{" "}
                        </div>
                        <div className="grid grid-cols-1 gap-5 px-5 md:mt-20 md:grid-cols-2 ">
                            {/* <Button className='h-16 sm:text-sm  md:text-md gap-5 bg-based'><FontAwesomeIcon icon={faEject} /> Learn More</Button> */}
                            {/* <Button className='h-16  sm:text-sm md:text-md gap-5'> <FontAwesomeIcon icon={faList} /> See Our Product</Button> */}
                        </div>
                    </div>
                    <div className="mx-2 h-64 rounded-3xl shadow-2xl bg-about bg-center bg-cover sm:h-[500px] md:h-[500px]"></div>

                </div>
            </div>
        </section>
    );
};

export default Service;
