import Image from "next/image"
import Link from "next/link"

import CardLogin from './Card'

const LoginPage = () => {
  return (
    <section>
      <div className="container   h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden -z-10 h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-50 mt-[200px] flex justify-center items-center text-lg font-medium">
            <Image src={'/image/logoSNB1putih.png'} alt="terbaru" width={500} height={500} />
          </div>
          <div className="relative z-50 mt-auto">
            <blockquote className="space-y-2">
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg">
            <CardLogin />


            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage