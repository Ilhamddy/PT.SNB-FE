import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/app/utils/databases";

export default function CreateService() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
         await axios.post(`${baseUrl}/services/create`, {
          title: values.title,
          description: values.description,
        });
        toast.success("Add succes");
        router.push("/dashboard/services");
      } catch (error) {
        toast.error("Image not found");
      }
    },
  });
  return (
    <section className="bg-third">
      <div className="mx-3 h-full bg-cover py-20 sm:mx-10 md:mx-10">
        <div className="sm:mx-10 md:mx-10 ">
            <Card>
              <CardHeader className="flex flex-col items-center space-y-2">
                <CardTitle className="text-6xl">
                  Submit a news Services
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
          <Toaster />
          <form onSubmit={formik.handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Title</Label>
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
               
                <div className="space-y-2">
                  <Label htmlFor="message">Description</Label>
                  <Textarea
                    className="min-h-[400px]"
                    placeholder="Enter the content"
                    required
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                </div>
                <Button type="submit" className="my-10">Submit</Button>


          </form>

              </CardContent>
              <CardFooter>
            </CardFooter>
            
            </Card>
        </div>
      </div>
    </section>
  );
}
