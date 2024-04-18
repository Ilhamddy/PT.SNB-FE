"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/app/utils/databases";
import toast, { Toaster } from "react-hot-toast";
import * as yup from 'yup';
import YupPassword from 'yup-password';
import Image from "next/image";
YupPassword(yup);

const validationSchema = yup.object().shape({
  name: yup.string().required('First Name is required'),
  contact: yup.string().required('Contact is required'),
  address: yup.string().required('Address is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 8 characters'),
});

const CardRegister = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
      password: "",

    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(`${baseUrl}/user/create-user`, {
          name: values.name,
          email: values.email,
          contact: values.contact,
          address: values.address,
          password: values.password,
        });
        toast.success("Add User succes");
        router.push("/login");
      } catch (error) {
       toast.error("Registrasi gagal")
      // if (error instanceof AxiosError) {
      //   const errorMsg = error.response?.data || error.message;
      //   toast.error(errorMsg);
      // }
      }
    },
  });
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Register In SNB</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Toaster />
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-2 my-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text"
              placeholder="Enter Your Name"
              required
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name} />
            {formik.errors.name && formik.touched.name && (
              <div>
                <p className='text-yellow-500 text-xs italic'>  {formik.errors.name}</p>
              </div>
            )}
          </div>
          <div className="grid gap-2 my-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email"
              placeholder="Enter Your Email"
              required
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}

            />
            {formik.errors.email && formik.touched.email && (
              <div>
                <p className='text-yellow-500 text-xs italic'>  {formik.errors.email}</p>
              </div>
            )}
          </div>
          <div className="grid gap-2 my-2">
            <Label htmlFor="contact">Contact</Label>
            <Input id="contact" type="number"
              placeholder="Enter Your Contact"
              required
              name="contact"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
            />
            {formik.errors.contact && formik.touched.contact && (
              <div>
                <p className='text-yellow-500 text-xs italic'>  {formik.errors.contact}</p>
              </div>
            )}
          </div>
          <div className="grid gap-2 my-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" type="text"
              placeholder="Enter Your Address"
              required
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.errors.address && formik.touched.address && (
              <div>
                <p className='text-yellow-500 text-xs italic'>  {formik.errors.address}</p>
              </div>
            )}
          </div>
          <div className="grid gap-2 my-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password"
              placeholder="Enter the Password"
              required
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div>
                <p className='text-yellow-500 text-xs italic'>  {formik.errors.password}</p>
              </div>
            )}
          </div>
          {/* <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
              </div> */}
          <Button className="w-full bg-based1" type="submit">Register</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 bg-white  hover:bg-based1
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-6 justify-center">
                                <Image src="https://tailus.io/sources/blocks/social/preview/images/google.svg" width={500} height={100} className="absolute left-0 w-5" alt="google logo"/>
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Register with Google</span>
                            </div>
                        </Button>
        <p className="mt-2 text-center text-xs text-gray-700">
          {" "}
          Do have account?{" "}
          <Link href={"/login"}>
            <span className=" text-blue-600 hover:underline">Sign In</span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default CardRegister;
