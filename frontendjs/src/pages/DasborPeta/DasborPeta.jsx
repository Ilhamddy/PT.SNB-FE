import BreadCrumb from '../../Components/Common/BreadCrumb'
import { ToastContainer } from 'react-toastify'
import { HeaderDashboard } from '../DasborUtama/DasborUtama'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Row,
} from 'reactstrap'
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'
import L from 'leaflet'
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3'
import MarkerClusterGroup from 'react-leaflet-cluster'
import MarkerSVG from './marker-svgrepo-com.svg'
import './dasbor-peta.scss'

const position = [-6.182214, 106.764472]
const addressPoints = [
  {
    lat: -6.192214,
    long: 106.764472,
    intensity: 0.6,
  },
  {
    lat: -6.192214,
    long: 106.804472,
    intensity: 1,
  },
  {
    lat: -6.192214,
    long: 106.834472,
    intensity: 0.4,
  },
  {
    lat: -6.192214,
    long: 106.854472,
    intensity: 0.3,
  },
  {
    lat: -6.222214,
    long: 106.784472,
    intensity: 0.4,
  },
]

const customIcon = new L.Icon({
  iconUrl: MarkerSVG,
  iconSize: new L.Point(40, 47),
})

// NOTE: iconCreateFunction is running by leaflet, which is not support ES6 arrow func syntax
// eslint-disable-next-line
const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  })
}

const DasborPeta = () => {
  return (
    <div className="page-content page-dasbor-eis-peta">
      <BreadCrumb
        title="Dasbor Pendapatan"
        pageTitle="Dasbor EIS"
        className="bc-dasbor-eis"
      />
      <ToastContainer closeButton={false} />
      <HeaderDashboard />
      <Container fluid className="ps-3 pe-3">
        <Row className="mt-3 d-flex flex-row-reverse mb-3">
          <MapContainer
            center={position}
            zoom={11}
            style={{ height: '500px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatmapLayer
              points={addressPoints}
              longitudeExtractor={(m) => m.long}
              latitudeExtractor={(m) => m.lat}
              intensityExtractor={(m) => m.intensity}
              max={1}
              radius={35}
            />
          </MapContainer>
        </Row>
        <Row className="mt-3 d-flex flex-row-reverse mb-3">
          <MapContainer
            center={position}
            zoom={11}
            style={{ height: '500px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
              polygonOptions={{
                fillColor: '#ffffff',
                color: '#f00800',
                weight: 5,
                opacity: 1,
                fillOpacity: 0.8,
              }}
            >
              {addressPoints.map((point, key) => (
                <Marker
                  key={key}
                  position={[point.lat, point.long]}
                  icon={customIcon}
                ></Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </Row>
      </Container>
    </div>
  )
}

export default DasborPeta
