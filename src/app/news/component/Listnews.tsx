import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";

import { AnyRecord } from "dns";
import { INews } from "@/types/news";
import useNews from "@/hooks/getNews";
import { baseImage, baseUrl } from "@/app/utils/databases";
import { PaginationDemo } from "./pagination";
const Listnews = () => {
  const getNews = useNews();
  // console.log(getNews[0].image);

  return (
    <div className="mx-3 h-full bg-cover py-10 sm:mx-10 md:mx-10">
      <div className="sm:mx-10 md:mx-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 md:py-10 ">
          <div className="mx-2 my-5 flex flex-col md:flex-row md:justify-between">
            <div className="mb-5 space-y-28 text-center text-3xl font-black md:text-start md:text-5xl">
              <h1>News SNB</h1>
            </div>
            <p></p>
            <Button className="h-12 text-justify">
              <h5>We are dedicated to revolutionizing.</h5>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 md:py-10 ">
            {getNews.map((news: INews, index: number) => {
              return (
                <Link href={`/news/${news.id}`}>
                  <Card>
                    <div
                      className="flex flex-col justify-between p-5 md:h-[500px]"
                      key={index}
                    >
                      <Image
                        src={`${baseImage}/news/${news.image}`}
                        alt={""}
                        width={500}
                        height={400}
                        className="rounded-xl text-center text-3xl md:h-[300px]  md:text-start md:text-5xl"
                      />
                      <p></p>
                      <div>
                        <h2 className="my-2 text-2xl">{news.title}.</h2>
                      </div>
                      <div className=" ">
                        <h5 className="line-clamp-1 h-12 truncate text-justify text-[10px]">
                          {news.description}
                        </h5>
                      </div>
                      <div className="flex justify-end text-[9px]">
                        {format(new Date(news?.createdAt), "MMMM dd, yyyy")}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
        {/* <PaginationDemo /> */}
      </div>
    </div>
  );
};

export default Listnews;
