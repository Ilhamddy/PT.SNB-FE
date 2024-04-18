import Contactall from '@/app/components/contactall'
import Detail from './component/Detail'
import Modul from './component/Modul'
import Price from './component/Price'

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
