import './InputGroupDM.scss'

export const InputGroupDM = ({ label, children }) => {
  return (
    <div className="input-group-dm">
      <label className="label-dm">{label}</label>
      {children}
    </div>
  )
}

export default InputGroupDM
