'use client'


import useGetNewsById from "@/hooks/getNewsByid";
import { baseImage } from "@/app/utils/databases";
import Image from "next/image";
import { format } from "date-fns";
import useNews from "@/hooks/getNews";
import { Link } from "lucide-react";
import { Card } from "@/components/ui/card";
import HTMLReactParser from "html-react-parser";

interface INews {
    id: number,
    title: string,
    source: string,
    image: string,
    description: string,
    createdAt: Date,
}

const NewsDetail = () => {

    const getNewsById: any = useGetNewsById();
    console.log(getNewsById);

    const getNews = useNews();


    return (
        <section className="bg-third">
            <div className="mx-3 h-full bg-cover py-10 sm:mx-10 md:mx-10">
                <div className="sm:mx-10 md:mx-10 grid grid-cols-7">
                    <div className="my-10 grid grid-cols-1 gap-5 text-center sm:grid-cols-1 md:mx-10 md:grid-cols-1 col-span-5">
                        <div className="flex justify-center">
                            {/*<Image
                                className="my-5 h-64 w-[1000px]  rounded-xl sm:h-[500px] md:my-0 md:h-[550px]"
                                height={1500}
                                width={1500}
                                quality={100}
                                alt="Kemenkes SNB"
                                src={`${baseImage}/news/${getNewsById.image}`}
                            />*/}
                        </div>

                        <div className="grid grid-cols-1 ">
                            <h1 className="my-5 text-justify text-dope font-bold text-4xl">
                                {getNewsById.title} {/* Access title property from getNewsById */}
                            </h1>
    {HTMLReactParser(getNewsById.description || "")}

                        </div>
                        <p className="text-end flex justify-between">
                        <div  className="text-[10px]">Source: {getNewsById.source} </div>

                            {getNewsById.createdAt ? format(new Date(getNewsById.createdAt), 'MMMM dd, yyyy') : 'Date not available'}
                        </p>
                    </div>
                    <div className="col-span-2 my-10">
                        <div className="grid grid-cols-1 ">
                            {getNews.length === 0 ? (
                                <div>Loading...</div> // Display loading indicator or message
                            ) : (
                                getNews.map((news: INews, index: number) => (
                                    <Card className="my-2" key={index}>
                                        {/* <Link href={`/news/${news.id}`} key={index}> */}

                                        <div className="flex  justify-between p-5 gap-5">
                                            {/*<Image
                                                src={`${baseImage}/news/${news.image}`}
                                                alt=""
                                                width={100}
                                                height={200}
                                                quality={100}
                                                className="rounded-xl text-center text-3xl  md:text-start md:text-5xl"
                                            />*/}
                                            <div className="grid">
                                                <div>
                                                    <h2 className="my-1 text-xl">{news.title}.</h2>
                                                </div>

                                                <div className="flex justify-between text-[9px]">
                                                    <div>
                                                    {format(new Date(news?.createdAt), 'MMMM dd, yyyy')}
                                                        
</div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* </Link> */}

                                    </Card>

                                ))
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </section >
    );
};

export default NewsDetail;
