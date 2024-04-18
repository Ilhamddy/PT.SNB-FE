import React from 'react'
import UsersDashboard from './component/FaqsDashboard'
import Sidebar from '../component/Sidebar'
import FaqsDashboard from './component/FaqsDashboard'

const page = () => {
    return (
        <div className="pt-20 grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <FaqsDashboard />
        </div>
    )
}

export default page   