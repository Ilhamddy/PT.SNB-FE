import React from 'react'
import UsersDashboard from './component/ServicesDashboard'
import Sidebar from '../component/Sidebar'
import ServicesDashboard from './component/ServicesDashboard'

const page = () => {
    return (
        <div className="pt-20 grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <ServicesDashboard />
        </div>
    )
}

export default page   