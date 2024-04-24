'use client'


import useGetNewsById from "@/hooks/getNewsByid";
import { baseImage } from "@/app/utils/databases";
import Image from "next/image";
import { format } from "date-fns";

interface INews {
    id: number,
    title: string,
    image: string,
    description: string,
    createdAt: Date,
}

const NewsDetail = () => {

    const getNewsById: any = useGetNewsById();
    console.log(getNewsById);



    return (
        <section className="bg-third">
            <div className="mx-3 h-full bg-cover py-10 sm:mx-10 md:mx-10">
                <div className="sm:mx-10 md:mx-10">
                    <div className="my-10 grid grid-cols-1 gap-5 text-center sm:grid-cols-1 md:mx-10 md:grid-cols-1">
                        <div>
                            <Image
                                className="my-5 h-64 w-full rounded-xl sm:h-[500px] md:my-0 md:h-[750px]"
                                height={1500}
                                width={1500}
                                quality={100}
                                alt="Kemenkes SNB"
                                src={`${baseImage}/news/${getNewsById.image}`}
                            />
                        </div>

                        <div className="flex flex-col justify-center">
                            <h1 className="my-5 text-justify text-based1 text-6xl">
                                {getNewsById.title} {/* Access title property from getNewsById */}
                            </h1>
                            <h1 className="my-5 text-justify text-black">
                                {getNewsById.description}
                            </h1>

                        </div>
                        <p className="text-end">
                            {getNewsById.createdAt ? format(new Date(getNewsById.createdAt), 'MMMM dd, yyyy') : 'Date not available'}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default NewsDetail;