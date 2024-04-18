import React from 'react'
import Detail from './component/Detail'
import Price from './component/Price'

import Modul from './component/Modul'
import Contactall from '@/app/components/contactall'

const page = () => {
  return (
    <main>
      <Detail />
      <Price />
      <Modul />
      <Contactall />
    </main>
  )
}

export default page