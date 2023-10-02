import { Modal } from 'reactstrap'
import './ModalSelectDM.scss'

const ModalSelectDM = ({
  onSelect,
  value,
  option,
  dataName,
  optionAll,
  ...rest
}) => {
  return (
    <Modal centered={true} size="sm" {...rest}>
      <div className="modal-select-dm">
        <p className="judul-select">Pilih {dataName}</p>
        <div className="opsi-select">
          {optionAll && (
            <p
              className={`opsi ${value === '' ? 'active' : ''}`}
              onClick={() => {
                onSelect({ value: '', label: optionAll })
                rest.toggle()
              }}
            >
              {optionAll}
            </p>
          )}
          {option.map((item, index) => (
            <p
              className={`opsi ${value === item.value ? 'active' : ''}`}
              key={index}
              value={item.value}
              onClick={() => {
                onSelect(item)
                rest.toggle()
              }}
            >
              {item.label}
            </p>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default ModalSelectDM
