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
  GeoJSON,
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
import contoh from './contoh.json'
import { provinsi } from './provinsi'

import { polygon, point } from '@turf/turf'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { geoContains } from 'd3-geo'
import { useRef, useState } from 'react'

const pasien = {
  nama: 'Bekasi',
  penyakitTeratas: 'Diare berat',
  totalPasien: '567',
}
const position = [-6.182214, 106.764472]
const addressPoints = [
  {
    listPasien: [pasien],
    lat: -6.192214,
    long: 106.764472,
    intensity: 0.6,
  },
  {
    listPasien: [pasien],
    lat: -6.192214,
    long: 106.804472,
    intensity: 1,
  },
  {
    listPasien: [pasien],
    lat: -6.192214,
    long: 106.834472,
    intensity: 0.4,
  },
  {
    listPasien: [pasien],
    lat: -6.192214,
    long: 106.854472,
    intensity: 0.3,
  },
  {
    listPasien: [pasien],
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
const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  })
}

const initialWilayah = {
  wilayah: '',
  densitas: '',
}

const DasborPeta = () => {
  const newContoh = { ...contoh }
  newContoh.features = [...newContoh.features]
  provinsi.features.forEach((prov) => newContoh.features.push(prov))
  const [wilayah, setWilayah] = useState(initialWilayah)
  const refJSON = useRef(null)
  function resetHighlight(e) {
    // setWilayah(initialWilayah)
    refJSON.current.resetStyle(e.target)
  }
  function highlightFeature(e, feature) {
    let layer = e.target

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
    })

    // setWilayah({
    //   ...initialWilayah,
    //   wilayah: feature.properties?.name || feature.properties?.propinsi,
    //   densitas: feature.properties.density,
    // })

    layer.bringToFront()
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: (e) => highlightFeature(e, feature),
      mouseout: resetHighlight,
      // click: zoomToFeature,
    })
  }
  newContoh.features = newContoh.features.map((data) => {
    const newData = { ...data }
    newData.properties.density = 0
    addressPoints.forEach((p) => {
      // const pt = point([p.long, p.lat])

      // const poly = polygon([newData.geometry.coordinates[0]])

      const isContained = geoContains(data, [p.long, p.lat])
      if (isContained) {
        newData.properties.density = newData.properties.density + 1
      }
      return p
    })
    return newData
  })
  function getColor(d) {
    return d > 7
      ? '#800026'
      : d > 6
      ? '#BD0026'
      : d > 5
      ? '#E31A1C'
      : d > 4
      ? '#FC4E2A'
      : d > 3
      ? '#FD8D3C'
      : d > 2
      ? '#FEB24C'
      : d > 1
      ? '#FED976'
      : '#FFEDA0'
  }
  function style(feature) {
    return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    }
  }
  console.log(newContoh)
  return (
    <div className="page-content page-dasbor-eis-peta">
      <BreadCrumb
        title="Dasbor Pendapatan"
        pageTitle="Dasbor EIS"
        className="bc-dasbor-eis"
      />
      <ToastContainer closeButton={false} />
      <HeaderDashboard />
      <Container fluid className="ps-3 pe-3 mt-3">
        <Card className="p-3">
          <Row className="mb-3">
            <Col lg={12}>
              <h4>Peta Wilayah</h4>
            </Col>
          </Row>
          <Row className="mt-3 d-flex flex-row-reverse mb-3">
            <MapContainer
              center={position}
              zoom={10}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoJSON
                ref={refJSON}
                onEachFeature={onEachFeature}
                style={style}
                key="1"
                data={newContoh}
              />
            </MapContainer>
          </Row>
        </Card>
        <Card className="p-3">
          <Row className="mb-3">
            <Col lg={12}>
              <h4>Peta Heatmap</h4>
            </Col>
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
        </Card>
        <Card className="p-3">
          <Row className="mb-3">
            <Col lg={12}>
              <h4>Peta Point</h4>
            </Col>
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
                    eventHandlers={{
                      mouseover: (event) => event.target.openPopup(),
                    }}
                  >
                    <Popup>
                      <div>
                        {point.listPasien.map((data, index) => (
                          <table key={index} style={{ width: '200px' }}>
                            <tbody>
                              <tr style={{ marginBottom: '5px' }}>
                                <td>Nama</td>
                                <td>
                                  <p style={{ margin: 0 }}>{data.nama}</p>
                                </td>
                              </tr>
                              <tr style={{ marginBottom: '5px' }}>
                                <td>Total Pasien</td>
                                <td>
                                  <p style={{ margin: 0 }}>
                                    {data.totalPasien}
                                  </p>
                                </td>
                              </tr>
                              <tr style={{ marginBottom: '5px' }}>
                                <td>Penyakit Teratas</td>
                                <td>
                                  <p style={{ margin: 0 }}>
                                    {data.penyakitTeratas}
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        ))}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </Row>
        </Card>
      </Container>
    </div>
  )
}

export default DasborPeta
