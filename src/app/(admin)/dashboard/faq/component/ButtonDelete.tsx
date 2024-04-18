import { baseUrl } from "@/app/utils/databases";
import { Button } from "@/components/ui/button";
import useNews from "@/hooks/getNews";
import { INews } from "@/types/news";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IFaqs } from "@/types/Faq.types";
import toast from "react-hot-toast";

interface ButtonEditProps {
  data: IFaqs;

}

const ButtonDelete = ({ data }: ButtonEditProps ) => {


  const handleDelete = async (id: number) => {
    try {   
      await axios.delete(`${baseUrl}/faq/delete/${id}`);
      toast.success("delete Data Succes ");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex gap-2">
          <FaTrash className="h-4 w-4" />
           Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(data.id)} >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ButtonDelete;
