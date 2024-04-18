import React from 'react'
import UsersDashboard from './component/UserDashboard'
import Sidebar from '../component/Sidebar'

const page = () => {
    return (
        <div className="pt-20 grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <UsersDashboard />
        </div>
    )
}

export default page   