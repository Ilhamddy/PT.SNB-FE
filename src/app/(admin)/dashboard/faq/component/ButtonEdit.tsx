import { baseUrl } from "@/app/utils/databases";
import { INews } from "@/types/news";
import axios, { AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { IServices } from "@/types/Services.types";

interface ButtonEditProps {
  data: IServices;
//   getReloadNews:() => void; // Add this line
}

const ButtonEdit = ({ data}: ButtonEditProps) => {

  const formik = useFormik({
    initialValues: {
      title: data.title,
      description: data.description,
    },
    onSubmit: async (values: { title: string; description: string }) => {
      try {
        await axios.patch(`${baseUrl}/faq/update/${data.id}`, {
          title: values.title,
          description: values.description,
        });
        toast.success("Update News Successfully");
        // getReloadNews();

      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          toast.error(errorMsg);
        }
      }
    },
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex gap-2">
          <FaEdit className="h-4 w-4" />
          Edit
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Faq</DialogTitle>
            <DialogDescription>
              Make changes to your Faq here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  id="name"
                  placeholder="Enter the title"
                  className="col-span-3"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4  ">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="username"
                  placeholder="Enter the Description"
                  className="col-span-3 h-[300px]"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ButtonEdit;
