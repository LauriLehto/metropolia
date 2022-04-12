import React, {useEffect, useState} from 'react'
import { 
  Container,
  Col, 
  Row,
  Spinner
} from 'react-bootstrap'

import SodexoRow from '../components/SodexoRow'
import sodexo from '../data/sodexo'



const Menu = ({data, fetched}) => {

  const checkDataReceived = () => {
    fetched ? <div>Ei tietoja saatavilla</div> : <Spinner animation="border" role="status" variant="light" />
  }

  if(data.meta){
    console.log(data.meta.ref_url)

  }
  
  return (
    <Container fluid>
      <Row className="d-flex align-items-center justify-content-center">
        { Object.keys(data).length ?
          <Col>
            { Object.keys(data.courses).map(c => {
              return <SodexoRow key={data.courses[c].title_fi} meal={data.courses[c]} />
              
            })}
          </Col>
          : 
          checkDataReceived()
        }
      </Row>
    </Container> 
  )
}

export default Menu