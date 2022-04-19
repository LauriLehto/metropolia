import React, {useEffect, useRef, useState} from 'react'
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

  const fieldRef = React.useRef(null);
  React.useEffect(() => {
    if (fieldRef.current) {
      setTimeout(function(){
      fieldRef.current.scrollIntoView({
        behavior: "smooth",
      });
    },10000)
    }
  }, []);


  //console.log(data)
  return (
    <Container fluid 
    className="fazer"
    >
      <TopBar/>
      {/* Restaurant open and closed information */}
      <Row>
        <Col xs={4} style={{textAlign:"center"}}>{`Food & CO - ${foodnco.address}`}</Col>
        <Col style={{flex:1}}></Col>
        { !!data.fi && data.fi.MenusForDays[0].LunchTime ? 
          <>
            <Col xs={1}>
              <Row>{foodnco.lunch.fi}</Row>
              <Row>{foodnco.lunch.en}</Row>
            </Col>
            <Col xs={2}> klo. {data.fi.MenusForDays[0].LunchTime}</Col>
          </>
          : 
          <Col xs={3} style={{textAlign:"center"}}>Ravintola suljettu tänään</Col>
        }
        <Col xs={2}>
          <Row>{foodnco.open.fi}</Row>
          <Row>{foodnco.open.en}</Row>
        </Col>
        <Col sx={2}> klo. {foodnco.open.time}</Col>
      </Row>
      {/* Lunch menu items */}
      <hr  />

      <Row style={{minHeight: "60vh"}}>
        { !!data.fi && !!data.fi.MenusForDays[0].SetMenus[0] ?
          <>
            <Col>
              <FazerRow data={data} />
            </Col>
            {/* Dieatry information */}
            <Col xs={3} className="d-flex align-items-start flex-column justify-content-center p-10">
              {foodnco.diets.split(', ').map(diet => <Row style={{margin:"10px"}} key={diet}>{diet}</Row>)}
            </Col>
          </>
          : 
          fetched ? 
            <div style={{padding:"50px", textAlign: "center"}}>{"Food 'n' Co ruokalista ei ole saatavilla"}</div> 
            : 
            <Spinner animation="border" role="status" variant="dark" />
        }
      </Row>    
      <footer className="field" ref={fieldRef}>
        {data.fi && data.fi.Footer}
      </footer>
    </Container> 
  )
}

export default Menu