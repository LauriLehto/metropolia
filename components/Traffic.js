import React, { useEffect, useState, useRef, createRef, forwardRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import {
  Container,
  Col,
  Row,
  Table
} from 'react-bootstrap'
import TopBar from './TopBar'

import { convertSeconds } from '../lib/helpers'

function DataTable({data,slice}) {
  return (
    <Table striped bordered hover variant="dark" size="sm">
      <thead>
        <tr>
          <th style={{width:"10%"}}></th>
          <th  style={{width:"15%"}}>Aika</th>
          <th  style={{width:"60%"}}>Suunta</th>
          <th  style={{width:"25%"}}>Pysäkki</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(slice[0],slice[1]).map(d => 
          <tr key={data.indexOf(d)}>
            <td ><Image alt="transportation icon" width="30px" height="30px" src={d.type==="train" ? "/Juna cmyk-test.svg" : "/Bussi cmyk-01.svg"} /></td>
            <td>{convertSeconds(d.time)}</td>
            <td>{d.heading.toUpperCase()}</td>
            <td>{d.stop}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

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
        <Col xs="4">
          {!!stops.length && <Map mapRef={mapRef} lat={coordinates.lat} lon={coordinates.lon} stops={data.stops} />}
        </Col>
        <Col xs="4">
          {!!stopsData.length && <DataTable data={stopsData} slice={[0,15]} />}
        </Col>
        <Col xs="4">
          {!!stopsData.length && <DataTable data={stopsData} slice={[15,30]} />}
        </Col>
      </Row>
    </Container>
  )
}

export default Traffic
