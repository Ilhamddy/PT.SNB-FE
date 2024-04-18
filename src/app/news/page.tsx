'use client'
import useNews from '@/hooks/getNews'
import Contactall from '../components/contactall'
import Listnews from './component/Listnews'
import News from './component/News'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../utils/databases'
import { useParams } from 'next/navigation'

const page = () => {
    return (
        <main>
            <News />
            <Listnews />
            {/* <Question /> */}
            <Contactall />
        </main>
    )
}

export default page