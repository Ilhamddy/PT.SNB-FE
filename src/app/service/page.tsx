'use client'
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from 'react'
import Contactall from '../components/contactall'
import Core from './component/Core'
import Question from './component/Question'
import Services from './component/Services'
const page = () => {
    useEffect(() => {
        AOS.init(
            {
                once: true,
                duration: 1800,
            }
        );
        AOS.refresh();
    }, []);

    return (
        <main>
            <Services />
            <Core />
            {/* <Detail /> */}
            {/* <Team /> */}
            <Question />
            <Contactall />
        </main>
    )
}

export default page