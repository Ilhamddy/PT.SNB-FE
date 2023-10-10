import { useState } from 'react'
import KontainerPage from '../../Components/KontainerPage/KontainerPage'
import FormPasienBaru from '../Login/FormPasienBaru'

const EditAkunPage = () => {
  const [step, setStep] = useState(0)
  return (
    <KontainerPage top="120px">
      <FormPasienBaru step={step} setStep={setStep} />
    </KontainerPage>
  )
}

export default EditAkunPage
