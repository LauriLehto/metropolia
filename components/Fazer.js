import React, {useEffect, useState} from 'react'
import { 
  Container,
  Col, 
  Row,
  Spinner,
} from 'react-bootstrap'

import TopBar from './TopBar'
import FazerRow from './FazerRow'
import foodnco from '../data/foodnco'

const Menu = ({fetched,data}) => {
  console.log(data)

  return (
    <Container 
      fluid 
      style={{height: '80%', margin: 'auto'}}
      /* className="d-flex align-items-center justify-content-center flex-column" */
    >
      <TopBar/>
      <Row>
        <Col xs={6} style={{fontSize:'1.2em', margin: "20 0"}}>{`Food & CO - ${foodnco.address}`}</Col>
        <Col xs={2}>
          <Row>{foodnco.open.fi}</Row>
          <Row>{foodnco.open.en}</Row>
        </Col>
        <Col sx={2}> klo. {foodnco.open.time}</Col>
        <Col sx={2}>
          <Row>{foodnco.lunch.fi}</Row>
          <Row>{foodnco.lunch.en}</Row>
        </Col>
        <Col sx={2}> klo. {foodnco.lunch.time}</Col>
      </Row>
      <Row 
        >
        { data.courses ?
          <>
            <Col>
              <FazerRow data={data} />
            </Col>
            <Col xs={3} className="d-flex align-items-start flex-column">
              {foodnco.diets.split(', ').map(diet => <>{diet}<br/></>)}
            </Col>
          </>
          : 
          fetched ? <div style={{padding:"50px"}}>{"Food 'n' Co ruokalista ei ole saatavilla"}</div> : <Spinner animation="border" role="status" variant="dark" />
        }
      </Row>
      <footer>
        {data.fi && data.fi.Footer}
      </footer>
    </Container> 
  )
}

export default Menu