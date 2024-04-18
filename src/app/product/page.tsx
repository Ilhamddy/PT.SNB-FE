import React from 'react'
import Product from './component/Product'
import Apps from './component/Apps'
import About from './component/About'
import Contactall from '../components/contactall'

const Productpage = () => {
    return (
        <main>
            <Product />
            <About />
            <Apps />
            <Contactall />

        </main>
    )
}

export default Productpage