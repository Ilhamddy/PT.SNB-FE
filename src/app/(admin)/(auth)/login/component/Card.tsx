'use client'

import { baseUrl } from '@/app/utils/databases'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { dataAdvantages } from '@/hooks/dataNavbar'
import { loginAction } from '@/lib/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import axios, { AxiosError } from 'axios'
import { useFormik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup);

const validationSchema = yup.object().shape({
  usernameOrEmail: yup.string().required('name Cannot be Empty').min(6),
  password: yup
    .string()
    .required('length Password minimum  8 character')
    .min(1),
});

const CardLogin = () => {

  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.users)

 console.log('data selector' ,selector);


  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(`${baseUrl}/user/login`, {
          usernameOrEmail: values.usernameOrEmail,
          password: values.password,
        })

        console.log(data);

        dispatch(loginAction(data.data.dataValues));
        console.log(data.data);
        
        localStorage.setItem('token', data.token)
        console.log('data token', data.token);
        
        
        toast.success("Login Success", {
          duration: 4000,
        });
        router.push("/dashboard")
      } catch (error) {
        // if (error instanceof AxiosError) {
        //   const errorMsg = error.response?.data || error.message;
        //   toast.error(errorMsg);
        // }
        toast.error("Gagal Login")
      }
    }
  })
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Sign in SNB
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Toaster />
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email"
              placeholder="Enter Your mail"
              required
              name="usernameOrEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.usernameOrEmail}
            />
            {formik.errors.usernameOrEmail && formik.touched.usernameOrEmail && (
              <div className='text-yellow-500 text-xs italic'>{formik.errors.usernameOrEmail}</div>
            )}
          </div>
          <div className="grid gap-2 my-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password"
              placeholder="Enter Your Password"
              required
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div className='text-yellow-500 text-xs italic'>{formik.errors.password}</div>
            )}
          </div>

          <Button className="w-full bg-based1" type='submit'>Login</Button>
        </form>

      </CardContent>
      <CardFooter className="flex flex-col">
      <Button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 bg-white  hover:bg-based1
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-6 justify-center">
                                <Image src="https://tailus.io/sources/blocks/social/preview/images/google.svg" width={500} height={100} className="absolute left-0 w-5" alt="google logo"/>
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                            </div>
                        </Button>
        <p className="mt-2 text-xs text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link href={'/register'}>
          <span className=" text-blue-600 hover:underline">
            Sign up
          </span>
          </Link>
        </p>
       
      </CardFooter>
    </Card>
  )
}

export default CardLogin