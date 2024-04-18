"use client";
import { baseUrl } from "@/app/utils/databases";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaImage } from "react-icons/fa6";

const CreateNews = () => {

  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image : "",
    },
    onSubmit: async (values, image: any)  => {
      try {

        const formData = new FormData(); // Create FormData object
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('image', image); // Append the image file


        await axios.post(`${baseUrl}/news/create-news`,formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
          }
        });
        toast.success("Add succes");
        router.push("/dashboard");
      } catch (error) {
        
          toast.error("Image not found");
        
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]); // Update the image state with the selected file
      console.log(event.target.files[0]);
    }
  };
  //   useEffect(() => {
  //     createPostNews();
  //   }, []);

  return (
    <section className="bg-third">
      <div className="mx-3 h-full bg-cover py-10 sm:mx-10 md:mx-10">
        <div className="pt-24 sm:mx-10  md:mx-10">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-5xl">Submit a news post</CardTitle>
              <CardDescription className="text-xl">
                Submit your news post for review by our editorial team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Toaster />

              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    placeholder="Enter the title"
                    required
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" placeholder="Select the date" type="date" />
                </div> */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    className="min-h-[200px]"
                    placeholder="Enter the content"
                    required
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                </div>
                    {/* File Upload */}
        {/* <div className="my-6">
          <Label htmlFor="fileUpload" value="Upload Images" />
          <filein
            id="fileUpload"
            name="files"
            multiple
            onChange={handleFileChange}
            className="mt-1"
          />              
        </div> */}
                <CardContent className="flex items-center gap-4 py-4">
        <div className="flex flex-col gap-1.5">
          <Label
            className="border border-gray-200 bg-white rounded-md cursor-pointer w-24 h-8 flex items-center justify-center"
            htmlFor="picture"
          >  Choose
            <Input accept="image/*" className="sr-only" id="picture" type="file"  name="image" 
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.image}/>
          </Label>
          <div>Can't find the right file? Make sure it's a .jpg, .jpeg, or .png and not larger than 1MB.</div>
        </div>
      </CardContent>

                  <Button type="submit" className="my-10">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CreateNews;


