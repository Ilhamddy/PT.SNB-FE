"use client"
import { baseImage, baseUrl } from "@/app/utils/databases";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useNews from "@/hooks/getNews";
import { BoxIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import ButtonDelete from "./component/buttonDelete";
import ButtonEdit from "./component/buttonEdit";
import Image from "next/image";
import { DatePickerWithRange } from "./component/datePicker";
import { ComboboxDemo } from "./component/comboBox";
import { PaginationDemo } from "@/app/news/component/pagination";

interface INewsDelete {
  newsId: number;
}



const NewsDashboard = () => {
  const news = useNews();

  const [reloadNews, setReloadNews] = useState([]);

  const getNews = async () => {
    try {
      const response = await axios.get(`${baseUrl}/news`);
      setReloadNews(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const refreshNews = async () => {
    getNews()
  }


  




  return (
    <div className="flex flex-col">
      <Toaster />
      <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
        <Link className="lg:hidden" href="#">
          <BoxIcon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
       
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
         <ComboboxDemo />
          <DatePickerWithRange />

          <Link href={'/dashboard/create-news'}>
            <Button className="ml-auto" size="sm">
              Add News
            </Button>
          </Link>
        </div>
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Id</TableHead>

                
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {news.map((data, index) => {
              return (
                <TableBody key={index}>
                  <TableRow>
                    <TableCell>
                      {data.id}
                    </TableCell>
                    <TableCell className="font-medium md:w-[250px]">
                      {data.title}
                    </TableCell>

                    <TableCell className="">
                    <Image
                        alt="Avatar"
                        height="300"
                        src={`${baseImage}/news/${data.image}`}
                        
                        width="300"
                      />
                    </TableCell>
                    <TableCell>
                     
                      
                      {data.description}</TableCell>
                    {/* <TableCell>{data.category}</TableCell> */}
                    <TableCell className="text-right">
                      <div className="my-2">
                        <ButtonEdit data={data} getReloadNews={getNews} />
                      </div>
                      <ButtonDelete data={data} getReloadNews={refreshNews} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </div>
        <PaginationDemo/>
      </main>
    </div>
  )
}

export default NewsDashboard