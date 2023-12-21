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
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3'
import MarkerClusterGroup from 'react-leaflet-cluster'
import MarkerSVG from './marker-svgrepo-com.svg'
import './dasbor-peta.scss'
import contoh from './contoh.json'
import { provinsi } from './provinsi'

import { polygon, point } from '@turf/turf'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { geoContains } from 'd3-geo'
import { useEffect, useRef, useState } from 'react'
import { getDasborPeta } from '../../store/eis/action'
import { useFormik } from 'formik'
import KontainerFlatpickr from '../../Components/KontainerFlatpickr/KontainerFlatpickr'
import { createControlComponent } from '@react-leaflet/core'

const pasien = {
  nama: 'Bekasi',
  penyakitTeratas: 'Diare berat',
  totalPasien: '567',
}
const position = [-6.182214, 106.764472]

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

const createControlLayer = () => {
  const controlInstance = new L.control({ position: 'bottomright' })
  let div = null
  controlInstance.onAdd = function (map) {
    div = L.DomUtil.create('div', 'info-total-pasien-div')
    this._div = div // create a div with a class "info"
    this.update()
    return this._div
  }
  controlInstance.update = function (props) {
    this._div.innerHTML = props
      ? '<h4>Total Pasien</h4>' +
        ('<b>' +
          (props?.name || props?.Propinsi) +
          '</b><br />' +
          props?.totalpasien +
          ' pasien')
      : 'Hover ke Daerah'
  }

  return {
    fn: (props) => {
      // Set up an instance of the control:

      return controlInstance
    },
    isiL: controlInstance,
  }
}

const custom = createControlLayer()

const DasborPeta = () => {
  const dispatch = useDispatch()
  const addressPoints = useSelector(
    (state) => state.Eis.getDasborPeta.data.addressPoints || []
  )
  const [dateStart] = useState(() => {
    let d = new Date()
    d.setMonth(d.getMonth() - 3)
    return d.toISOString()
  })
  const [dateToday] = useState(() => new Date().toISOString())
  const vFilter = useFormik({
    initialValues: {
      tanggalmulai: dateStart,
      tanggalselesai: dateToday,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(getDasborPeta(values))
    },
  })

  // Pass the control instance to the React-Leaflet createControlComponent hook:
  const CustomControl = createControlComponent(custom.fn)

  const newContoh = { ...contoh }
  newContoh.features = [...newContoh.features]
  provinsi.features.forEach((prov) => newContoh.features.push(prov))
  const refJSON = useRef(null)
  function resetHighlight(e) {
    // setWilayah(initialWilayah)
    custom.isiL.update()
    refJSON.current.resetStyle(e.target)
  }
  function highlightFeature(e, feature) {
    let layer = e.target
    custom.isiL.update(layer.feature.properties)
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
    })

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
    newData.properties.totalpasien = 0

    addressPoints.forEach((p) => {
      const isContained = geoContains(data, [p.long, p.lat])
      if (isContained) {
        newData.properties.totalpasien =
          newData.properties.totalpasien + p.totalpasien
      }
      return p
    })

    return newData
  })
  const maxTotal = getMax(newContoh.features, 'properties', 'totalpasien')
  newContoh.features = newContoh.features.map((data) => {
    const newData = { ...data }
    newData.properties.density = newData.properties.totalpasien / maxTotal
    return newData
  })

  function getColor(d) {
    return d > 0.9
      ? '#800026'
      : d > 0.7
      ? '#BD0026'
      : d > 0.5
      ? '#E31A1C'
      : d > 0.35
      ? '#FC4E2A'
      : d > 0.2
      ? '#FD8D3C'
      : d > 0.1
      ? '#FEB24C'
      : d >= 0
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

  useEffect(() => {
    dispatch(getDasborPeta(vFilter.initialValues))
  }, [dispatch, vFilter.initialValues])
  return (
    <div className="page-content page-dasbor-eis-peta">
      <BreadCrumb
        title="Dasbor Pendapatan"
        pageTitle="Dasbor EIS"
        className="bc-dasbor-eis"
      />
      <HeaderDashboard />
      <Container fluid className="ps-3 pe-3 mt-3">
        <Row className="mt-3 d-flex flex-row-reverse mb-3">
          <Col lg={'auto'}>
            <Button
              color="info"
              onClick={() => {
                vFilter.handleSubmit()
              }}
            >
              Filter
            </Button>
          </Col>
          <Col lg={4}>
            <KontainerFlatpickr
              isError={vFilter.touched?.tanggal && !!vFilter.errors?.tanggal}
              id="tanggal"
              options={{
                mode: 'range',
              }}
              value={[
                vFilter.values.tanggalmulai,
                vFilter.values.tanggalselesai,
              ]}
              onChange={([newDate, newDate2]) => {
                vFilter.setFieldValue(
                  'tanggalmulai',
                  newDate?.toISOString() || ''
                )
                vFilter.setFieldValue(
                  'tanggalselesai',
                  newDate2?.toISOString() || ''
                )
              }}
            />
            {vFilter.touched?.tanggal && !!vFilter.errors.tanggal && (
              <FormFeedback type="invalid">
                <div>{vFilter.errors.tanggal}</div>
              </FormFeedback>
            )}
          </Col>
        </Row>
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
              <CustomControl />
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
        {/* <Card className="p-3">
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
        </Card> */}
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
                        <table style={{ width: '200px' }}>
                          <tbody>
                            <tr style={{ marginBottom: '5px' }}>
                              <td>Nama</td>
                              <td>
                                <p style={{ margin: 0 }}>
                                  {point.namakabupaten}
                                </p>
                              </td>
                            </tr>
                            <tr style={{ marginBottom: '5px' }}>
                              <td>Total Pasien</td>
                              <td>
                                <p style={{ margin: 0 }}>{point.totalpasien}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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

function getMax(arr, prop, prop2) {
  var max
  for (var i = 0; i < arr.length; i++) {
    if (
      max == null ||
      parseInt(arr[i][prop][prop2]) > parseInt(max[prop][prop2])
    )
      max = arr[i]
  }
  return max[prop][prop2]
}

export default DasborPeta
