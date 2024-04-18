'use client'
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaTrash, FaUser } from "react-icons/fa6";
import Link from "next/link";
import { BoxIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/app/utils/databases";
import { IFaqs } from "@/types/Faq.types";
import ButtonDelete from "./ButtonDelete";
import { Toaster } from "react-hot-toast";
import ButtonEdit from "./ButtonEdit";




const FaqsDashboard = () => {
  const [dataFaqs, setDataFaqs] = useState<IFaqs[]>([]);

  const getDataFaqs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/faq/`)
      setDataFaqs(response.data.data)
      console.log('data faq',response.data.data);

    } catch (error) {
      console.log('data error');

    }
  }

  useEffect(() => {
    getDataFaqs()
  }, [])
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
          <h1 className="text-lg font-semibold md:text-2xl">FAQ</h1>
          <Link href={'/dashboard/create-faqs'}>
            <Button className="ml-auto" size="sm">
              Add Faqs
            </Button>
          </Link>
        </div>
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {dataFaqs.map((data, index) => {
              return (
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {data.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {data.title}
                    </TableCell>
                    <TableCell>{data.description}</TableCell>
                 
                    <TableCell className="text-right">
                      <div className="my-2">
                        <ButtonEdit data={data} />
                      </div>
                      <ButtonDelete data={data} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </div>
      </main>
    </div>
  )
}

export default FaqsDashboard