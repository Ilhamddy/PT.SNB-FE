'use client'
import React, { useEffect } from 'react'
import UsersDashboard from './component/UserDashboard'
import Sidebar from '../component/Sidebar'
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

const page = () => {

  const userId = useAppSelector((state) => state.users);


    const router = useRouter();
    useEffect(() => {
      if (userId.id === 0) {
        router.push('/');
      }
    }, [userId]);
  
  

    return (
        <div className="pt-20 grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <UsersDashboard />
        </div>
    )
}

export default page   