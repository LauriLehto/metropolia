import React, { useEffect, useState, useRef, createRef, forwardRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import axios from 'axios'
import {
  Container,
  Col,
  Row,
  Table
} from 'react-bootstrap'
import TopBar from './TopBar'

import { getStopById, getStationInfo, stopsByRadius, hslApiUrl } from '../data/hslApi'

import { convertSeconds } from '../lib/helpers'

//Karaportti location
const coordinates = {
  lat: 60.2238794, 
  lon: 24.758149
}

const Traffic = () => {
  const Map = dynamic(
    () => import('./Map'),
    { ssr: false }
  )



  

  
  const [data, setData] = useState({
    stops: [],
    stopsData: []
  })

  const { stops, stopsData } = data
 
  useEffect(() => {

    async function getTraficData(){
      const result = await fetch('/api/liikenne', {
        method:"POST",
        body:JSON.stringify(coordinates)
      })
      const resultJson = await result.json()
      setData(resultJson)
    
    }
    getTraficData()
      
  }, [setData])

  
  
  const mapRef=createRef(null)

  //console.log(hslData)
  return (
    <Container fluid>
      <TopBar />
      <Row>
        <Col xs="6" md="6">
          {stops.length && <Map mapRef={mapRef} ll={[60.2238794, 24.758149]} lat={coordinates.lat} lon={coordinates.lon} stops={data.stops} />}
        </Col>
        <Col xs="6" md="6">
          {stopsData.length &&
            <Table striped bordered hover variant="dark" size="sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Aika</th>
                  <th>Suunta</th>
                  <th>Pysäkki</th>
                </tr>
              </thead>
            <tbody>
              {stopsData.slice(0,23).map(d => 
                <tr key={stopsData.indexOf(d)}>
                  <td><Image alt="transportation icon" width="30px" height="30px" style={{height:30,width:30}} src={d.type==="train" ? "/Juna cmyk-test.svg" : "/Bussi cmyk-01.svg"} /></td>
                  <td>{convertSeconds(d.time)}</td>
                  <td>{d.heading.toUpperCase()}</td>
                  <td>{d.stop}</td>
                </tr>
              )}
            </tbody>
          </Table>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Traffic
