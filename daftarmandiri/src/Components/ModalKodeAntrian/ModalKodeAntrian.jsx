import { Modal, ModalHeader } from 'reactstrap'
import './ModalKodeAntrian.scss'
import kodeantrianImg from './kode-antrian.png'
import InputDM from '../InputDM/InputDM'
import ButtonDM from '../ButtonDM/ButtonDM'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const ModalKodeAntrian = ({
  onClickSelanjutnya,
  ...rest
}) => {
  const navigate = useNavigate()
  const vModal = useFormik({
    initialValues: {
      kode: '',
    },
    validationSchema: Yup.object({
      kode: Yup.string()
        .required('Kode belum diisi.')
        .min(12, 'Kode Terlalu pendek - Minimal 12 karakter.')
    }),
    onSubmit: (values) => {
      onClickSelanjutnya({ value: values.kode })
    },
  })
  return (
    <Modal toggle={rest.toggle} centered={true} size="sm" {...rest}>
      <ModalHeader
        className="modal-title"
        id="staticBackdropLabel"
        toggle={rest.toggle}
      ></ModalHeader>
      <div className="modal-kode-antrian">
        <img className="gbr-antrean" src={kodeantrianImg} alt="" />
        <p className="teks-masukan-kode">
          Masukkan Kode
        </p>
        <InputDM
          className='teks-isi-masukan-kode'
          id="kode"
          name="kode"
          type="kode"
          value={vModal.values.kode}
          errorMsg={vModal.errors.kode}
          isError={
            vModal.touched.kode && vModal.errors.kode
          }
          onChange={(e) => {
            vModal.handleChange(e)
          }}
        />
        <ButtonDM
          className="btn-kode-antrian"
          onClick={() => {
            vModal.handleSubmit()
          }}
        >
          Selanjutnya
        </ButtonDM>
      </div>
    </Modal>
  )
}
export default ModalKodeAntrian