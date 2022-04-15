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

const Menu = (fetched,data) => {

  return (
    <Container 
      fluid 
      style={{height: '80%', margin: 'auto'}}
      /* className="d-flex align-items-center justify-content-center flex-column" */
    >
      <TopBar/>
      <Row style={{paddingTop:"5%"}}>
        <Col xs={6} style={{fontSize:'1.2em'}}>{`Food & CO - ${foodnco.address}`}</Col>
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
            <Col  style={{padding:"3%"}}>
              <FazerRow data={data} />
            </Col>
            <Col xs ={3}  style={{padding:"3%", height:"80%"}} className="d-flex align-items-start flex-column">
              {foodnco.diets.split(', ').map(diet => <>{diet}<br/></>)}
            </Col>
          </>
          : 
          fetched ? <div>Food 'n' Co ruokalista ei ole saatavilla</div> : <Spinner animation="border" role="status" variant="dark" />
          
        }
      </Row>
      <br/>
      <footer style={{fontSize: '1.2em'}}>{foodnco.info}</footer>
    </Container> 
  )
}

export default Menu