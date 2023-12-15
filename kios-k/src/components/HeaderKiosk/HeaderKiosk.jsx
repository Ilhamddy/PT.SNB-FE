import gbrHealthTechs from './gbr-healthtechs.svg'
import gbrPuskesmas from './gbr-puskesmas.svg'
import './HeaderKiosk.scss'

const HeaderKiosk = () => {
  return (
    <div className="header-kiosk p-0">
      <div className="all-logo-healthtechs">
        <img src={gbrHealthTechs} alt="" className="gbr-health-techs" />
        <img src={gbrPuskesmas} alt="" className="gbr-puskesmas" />
      </div>
    </div>
  )
}

export default HeaderKiosk
