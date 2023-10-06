import { useNavigate } from 'react-router-dom'
import ButtonDM from '../../Components/ButtonDM/ButtonDM'
import './PasienBaruSelesai.scss'
import { useSelector } from 'react-redux'

const PasienBaruSelesai = ({ handleToHome }) => {
  const navigate = useNavigate()
  const { norm } = useSelector((selector) => ({
    norm: selector.UserPasien.signupUser?.data?.username,
  }))
  console.log(norm)
  return (
    <div className="kontainer-konten pasien-baru-selesai-konten">
      <p className="teks-pasien-baru">
        Pendaftaran pasien baru berhasil dilakukan, berikut data pasien baru
        anda
      </p>
      <p className="teks-rm">No. RM : {norm}</p>
      <p className="teks-rm">Password : 16 digit NIK anda</p>
      <p className="teks-gunakan-data">
        Gunakan data diatas untuk mengakses data kunjungan anda melalui login
        “Pasien Lama”. Selanjutnya, untuk akses data pasien pasca berkunjung,
        ikuti arahan petugas kami.
      </p>
      <ButtonDM
        onClick={() => {
          handleToHome()
        }}
      >
        Selesai
      </ButtonDM>
    </div>
  )
}

export default PasienBaruSelesai
