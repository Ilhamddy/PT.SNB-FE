'use client'
import { Metadata } from "next";
import LoginPage from "./component/Login";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AuthenticationPage() {
  const userId = useAppSelector((state) => state.users);


  console.log(userId);

  const router = useRouter();
  useEffect(() => {
    if (userId?.id) {
      router.push('/dashboard');
    }
  });

  return (
    <main>
      <LoginPage />
    </main>
  );
}
